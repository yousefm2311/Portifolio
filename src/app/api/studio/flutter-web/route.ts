import { NextResponse } from 'next/server';
import { z } from 'zod';
import { enforceAdmin, enforceRateLimit } from '@/lib/api-helpers';
import { uploadFlutterWebZip } from '@/lib/flutter-web';

export const runtime = 'nodejs';

const schema = z.object({
  slug: z.string().min(2)
});

const MAX_SIZE_MB = 500;

export async function POST(req: Request) {
  const limited = enforceRateLimit(req, 'studio');
  if (limited) return limited;

  const session = await enforceAdmin(req);
  if (session instanceof NextResponse) return session;

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const slug = (formData.get('slug') as string | null) ?? '';

  const parsed = schema.safeParse({ slug });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 });
  }

  const isZip =
    file.type.includes('zip') ||
    file.type === 'application/octet-stream' ||
    file.name.toLowerCase().endsWith('.zip');

  if (!isZip) {
    return NextResponse.json({ error: 'Only ZIP files are supported' }, { status: 400 });
  }

  try {
    const { embedUrl, folderName } = await uploadFlutterWebZip(file, parsed.data.slug);

    return NextResponse.json({ embedUrl, folderName });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? 'Failed to upload Flutter Web build' },
      { status: 400 }
    );
  }
}
