import { AppDTO, MediaDTO } from './types';

const toId = (value: unknown) => {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value && '_id' in value) {
    return (value as { _id: string })._id?.toString();
  }
  return undefined;
};

export function normalizeMedia(input: any): MediaDTO | undefined {
  if (!input) return undefined;
  if (typeof input === 'string') {
    return undefined;
  }
  if (typeof input === 'object' && !('url' in input)) {
    return undefined;
  }
  if (!input.url) return undefined;
  return {
    _id: input._id?.toString() ?? input.id ?? '',
    type: input.type,
    provider: input.provider,
    providerId: input.providerId,
    url: input.url,
    thumbnailUrl: input.thumbnailUrl,
    originalName: input.originalName,
    normalizedName: input.normalizedName,
    mimeType: input.mimeType,
    width: input.width,
    height: input.height,
    duration: input.duration,
    size: input.size,
    alt: input.alt
  };
}

export function normalizeApp(doc: any): AppDTO {
  const icon = normalizeMedia(doc.media?.iconId);
  const cover = normalizeMedia(doc.media?.coverId);
  const gallery = (doc.media?.galleryIds ?? [])
    .map((item: any) => normalizeMedia(item))
    .filter(Boolean) as MediaDTO[];
  const demoVideo = normalizeMedia(doc.demo?.videoId);
  const content = doc.content ?? {};

  return {
    _id: doc._id?.toString() ?? doc.id,
    title: doc.title,
    titleEn: doc.titleEn,
    slug: doc.slug,
    shortDesc: doc.shortDesc,
    description: doc.description,
    category: doc.category,
    tags: doc.tags ?? [],
    roleVariants: (doc.roleVariants ?? []).map((rv: any) => ({
      key: rv.key,
      label: rv.label,
      previewMediaId: toId(rv.previewMediaId)
    })),
    techStack: doc.techStack ?? [],
    features: doc.features ?? [],
    kpis: doc.kpis ?? [],
    links: doc.links ?? {},
    demo: {
      type: doc.demo?.type ?? 'none',
      embedUrl: doc.demo?.embedUrl,
      videoId: toId(doc.demo?.videoId),
      video: demoVideo,
      interactiveHotspots: doc.demo?.interactiveHotspots ?? []
    },
    media: {
      icon,
      cover,
      gallery
    },
    mediaDisplay: doc.mediaDisplay ?? { cover: 'full', gallery: 'phone' },
    caseStudy: doc.caseStudy ?? {
      problem: '',
      solution: '',
      architecture: '',
      challenges: '',
      results: ''
    },
    content: {
      shortDesc: {
        ar: content.shortDesc?.ar ?? doc.shortDesc ?? '',
        en: content.shortDesc?.en ?? ''
      },
      description: {
        ar: content.description?.ar ?? doc.description ?? '',
        en: content.description?.en ?? ''
      },
      caseStudy: {
        problem: {
          ar: content.caseStudy?.problem?.ar ?? doc.caseStudy?.problem ?? '',
          en: content.caseStudy?.problem?.en ?? ''
        },
        solution: {
          ar: content.caseStudy?.solution?.ar ?? doc.caseStudy?.solution ?? '',
          en: content.caseStudy?.solution?.en ?? ''
        },
        architecture: {
          ar: content.caseStudy?.architecture?.ar ?? doc.caseStudy?.architecture ?? '',
          en: content.caseStudy?.architecture?.en ?? ''
        },
        challenges: {
          ar: content.caseStudy?.challenges?.ar ?? doc.caseStudy?.challenges ?? '',
          en: content.caseStudy?.challenges?.en ?? ''
        },
        results: {
          ar: content.caseStudy?.results?.ar ?? doc.caseStudy?.results ?? '',
          en: content.caseStudy?.results?.en ?? ''
        }
      },
      features: (content.features ?? doc.features ?? []).map((feature: any) => ({
        title: {
          ar: feature.title?.ar ?? feature.title ?? '',
          en: feature.title?.en ?? ''
        },
        details: {
          ar: feature.details?.ar ?? feature.details ?? '',
          en: feature.details?.en ?? ''
        }
      }))
    },
    status: doc.status ?? 'draft',
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : undefined,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString()
  };
}
