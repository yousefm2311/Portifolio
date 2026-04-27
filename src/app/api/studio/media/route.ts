import { NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { connectToDatabase } from '@/lib/db';
import { Media } from '@/models/Media';
import { cloudinary } from '@/lib/cloudinary';
import { enforceAdmin, enforceRateLimit } from '@/lib/api-helpers';
import { AuditLog } from '@/models/AuditLog';
import { getOssClient, getOssPublicBaseUrl, uploadToOSS } from '@/lib/oss';
import { ensureMp4H264 } from '@/lib/video-transcode';

export const runtime = 'nodejs';

const MAX_SIZE_MB = 500;
const allowedTypes = ['image/', 'video/', 'application/pdf'];
const allowedExtensions = new Set([
  'avif',
  'gif',
  'jpeg',
  'jpg',
  'm4v',
  'mov',
  'mp4',
  'pdf',
  'png',
  'webm',
  'webp'
]);

function normalizeFileName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function getExtension(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? '';
}

function inferContentType(file: File) {
  if (file.type) return file.type;

  const ext = getExtension(file.name);
  if (['avif', 'gif', 'jpeg', 'jpg', 'png', 'webp'].includes(ext)) {
    return ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
  }
  if (['m4v', 'mov', 'mp4', 'webm'].includes(ext)) {
    if (ext === 'mov') return 'video/quicktime';
    if (ext === 'm4v') return 'video/x-m4v';
    return `video/${ext}`;
  }
  if (ext === 'pdf') return 'application/pdf';
  return 'application/octet-stream';
}

function resolveMediaType(contentType: string) {
  if (contentType.startsWith('image/')) return 'image';
  if (contentType.startsWith('video/')) return 'video';
  if (contentType === 'application/pdf') return 'file';
  return null;
}

function isAllowedFile(file: File, contentType: string) {
  const ext = getExtension(file.name);
  return allowedTypes.some((type) => contentType.startsWith(type)) || allowedExtensions.has(ext);
}

function cloudinaryResourceType(type: 'image' | 'video' | 'file') {
  if (type === 'video') return 'video';
  if (type === 'file') return 'raw';
  return 'image';
}

function uploadBufferToCloudinary(
  buffer: Buffer,
  type: 'image' | 'video' | 'file'
) {
  return new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio-showcase',
        resource_type: cloudinaryResourceType(type)
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
}

export async function GET(req: Request) {
  const limited = enforceRateLimit(req, 'studio');
  if (limited) return limited;

  const session = await enforceAdmin(req);
  if (session instanceof NextResponse) return session;

  await connectToDatabase();
  const items = await Media.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, 'studio');
  if (limited) return limited;

  const session = await enforceAdmin(req);
  if (session instanceof NextResponse) return session;

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const alt = (formData.get('alt') as string | null) ?? undefined;

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 });
  }

  const originalName = file.name?.trim() || 'upload';
  const normalizedName = normalizeFileName(originalName);
  const originalContentType = inferContentType(file);
  const initialMediaType = resolveMediaType(originalContentType);

  if (!isAllowedFile(file, originalContentType) || !initialMediaType) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  await connectToDatabase();

  if (initialMediaType === 'image') {
    const existing = (await Media.findOne({ type: 'image', normalizedName }).lean()) as any;
    if (existing) {
      return NextResponse.json(
        {
          error: `Image "${originalName}" already exists`,
          existingMediaId: existing._id?.toString()
        },
        { status: 409 }
      );
    }
  }

  let buffer: Buffer = Buffer.from(await file.arrayBuffer());
  let contentType = originalContentType;
  let filename = originalName;

  if (initialMediaType === 'video') {
    try {
      const converted = await ensureMp4H264(buffer, originalName);
      buffer = converted.buffer;
      contentType = converted.contentType;
      filename = converted.filename;
    } catch (error: any) {
      return NextResponse.json(
        { error: error?.message ?? 'Failed to convert video' },
        { status: 400 }
      );
    }
  }

  let mediaPayload: any = null;
  const mediaType = resolveMediaType(contentType) ?? initialMediaType;

  if (getOssClient() && getOssPublicBaseUrl()) {
    const ext = filename.split('.').pop()?.toLowerCase() ?? 'bin';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const key = `media/${fileName}`;
    const url = await uploadToOSS({
      key,
      body: buffer,
      contentType,
      cacheControl: contentType === 'application/pdf' ? 'public, max-age=3600' : undefined,
      contentDisposition: contentType === 'application/pdf' ? 'inline' : 'inline',
      filename
    });

    mediaPayload = {
      type: mediaType,
      provider: 'oss',
      providerId: key,
      url,
      thumbnailUrl: url,
      originalName,
      normalizedName,
      mimeType: contentType,
      size: buffer.length,
      alt
    };
  } else {
    const result = await uploadBufferToCloudinary(buffer, mediaType);

    mediaPayload = {
      type: mediaType,
      provider: 'cloudinary',
      providerId: result.public_id,
      url: result.secure_url,
      thumbnailUrl: result.secure_url,
      originalName,
      normalizedName,
      mimeType: contentType,
      width: result.width,
      height: result.height,
      duration: result.duration,
      size: result.bytes,
      alt
    };
  }

  const media = await Media.create(mediaPayload);

  await AuditLog.create({
    action: 'create',
    entity: 'media',
    entityId: media._id.toString(),
    byEmail: session.user?.email ?? 'unknown',
    meta: { url: media.url }
  });

  return NextResponse.json({ media });
}
