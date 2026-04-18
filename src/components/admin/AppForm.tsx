'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDTO, LocalizedFeature, LocalizedText } from '@/lib/types';
import { Input, Textarea, Select } from '@/components/ui/Inputs';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { GalleryUploader, MediaUploader } from '@/components/admin/MediaUploader';
import FlutterWebUploader from '@/components/admin/FlutterWebUploader';
import { useLocale } from '@/components/LocaleProvider';

const tabs = [
  { id: 'basic', label: 'Basic Info' },
  { id: 'media', label: 'Media' },
  { id: 'demo', label: 'Demo' },
  { id: 'case', label: 'Case Study' },
  { id: 'extras', label: 'Links + KPIs + Features' }
] as const;

const createLocalizedText = (ar = '', en = ''): LocalizedText => ({ ar, en });

const createLocalizedFeature = (): LocalizedFeature => ({
  title: createLocalizedText(),
  details: createLocalizedText()
});

const createDefaultState = (): AppDTO => ({
  _id: '',
  title: '',
  titleEn: '',
  slug: '',
  shortDesc: '',
  description: '',
  category: 'Flutter',
  tags: [],
  roleVariants: [],
  techStack: [],
  features: [],
  kpis: [],
  links: {},
  demo: {
    type: 'video',
    embedUrl: '',
    videoId: '',
    interactiveHotspots: []
  },
  media: {
    icon: undefined,
    cover: undefined,
    gallery: []
  },
  mediaDisplay: {
    cover: 'full',
    gallery: 'phone'
  },
  caseStudy: {
    problem: '',
    solution: '',
    architecture: '',
    challenges: '',
    results: ''
  },
  content: {
    shortDesc: createLocalizedText(),
    description: createLocalizedText(),
    caseStudy: {
      problem: createLocalizedText(),
      solution: createLocalizedText(),
      architecture: createLocalizedText(),
      challenges: createLocalizedText(),
      results: createLocalizedText()
    },
    features: []
  },
  status: 'draft',
  createdAt: '',
  updatedAt: ''
});

const toFormState = (initial?: AppDTO | null): AppDTO => {
  if (!initial) return createDefaultState();

  const fallback = createDefaultState();
  const baseFeatures = initial.features ?? [];
  const localizedFeatures =
    initial.content?.features?.length === baseFeatures.length
      ? initial.content.features
      : baseFeatures.map((feature, index) => ({
          title: createLocalizedText(
            initial.content?.features?.[index]?.title?.ar ?? feature.title,
            initial.content?.features?.[index]?.title?.en ?? ''
          ),
          details: createLocalizedText(
            initial.content?.features?.[index]?.details?.ar ?? feature.details,
            initial.content?.features?.[index]?.details?.en ?? ''
          )
        }));

  return {
    ...fallback,
    ...initial,
    media: {
      ...fallback.media,
      ...initial.media
    },
    mediaDisplay: {
      ...fallback.mediaDisplay,
      ...initial.mediaDisplay
    },
    demo: {
      ...fallback.demo,
      ...initial.demo
    },
    content: {
      shortDesc: createLocalizedText(
        initial.content?.shortDesc?.ar ?? initial.shortDesc ?? '',
        initial.content?.shortDesc?.en ?? ''
      ),
      description: createLocalizedText(
        initial.content?.description?.ar ?? initial.description ?? '',
        initial.content?.description?.en ?? ''
      ),
      caseStudy: {
        problem: createLocalizedText(
          initial.content?.caseStudy?.problem?.ar ?? initial.caseStudy.problem,
          initial.content?.caseStudy?.problem?.en ?? ''
        ),
        solution: createLocalizedText(
          initial.content?.caseStudy?.solution?.ar ?? initial.caseStudy.solution,
          initial.content?.caseStudy?.solution?.en ?? ''
        ),
        architecture: createLocalizedText(
          initial.content?.caseStudy?.architecture?.ar ?? initial.caseStudy.architecture,
          initial.content?.caseStudy?.architecture?.en ?? ''
        ),
        challenges: createLocalizedText(
          initial.content?.caseStudy?.challenges?.ar ?? initial.caseStudy.challenges,
          initial.content?.caseStudy?.challenges?.en ?? ''
        ),
        results: createLocalizedText(
          initial.content?.caseStudy?.results?.ar ?? initial.caseStudy.results,
          initial.content?.caseStudy?.results?.en ?? ''
        )
      },
      features: localizedFeatures
    }
  };
};

export default function AppForm({
  initial,
  mode
}: {
  initial?: AppDTO | null;
  mode: 'create' | 'edit';
}) {
  const { locale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab');
  const resolvedTab = tabs.some((item) => item.id === tabParam)
    ? (tabParam as (typeof tabs)[number]['id'])
    : 'basic';

  const [tab, setTab] = useState<(typeof tabs)[number]['id']>(resolvedTab);
  const [form, setForm] = useState<AppDTO>(() => toFormState(initial));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverDetails, setServerDetails] = useState<Record<string, string[]>>({});
  const [missing, setMissing] = useState<string[]>([]);

  useEffect(() => {
    setForm(toFormState(initial));
  }, [initial]);

  useEffect(() => {
    if (tabParam && tabs.some((item) => item.id === tabParam)) {
      setTab(tabParam as (typeof tabs)[number]['id']);
    }
  }, [tabParam]);

  const getMissingRequired = () => {
    const missingFields: string[] = [];
    if (!form.title?.trim()) missingFields.push('Title (Arabic)');
    if (!form.slug?.trim()) missingFields.push('Slug');
    if (!form.shortDesc?.trim()) missingFields.push('Short description (Arabic)');
    if (!form.description?.trim()) missingFields.push('Description (Arabic)');
    if (!form.category) missingFields.push('Category');
    if (form.demo.type === 'flutter_web') {
      if (!form.demo.embedUrl?.trim()) missingFields.push('Embed URL (Flutter Web)');
    } else if (form.demo.type === 'video' || form.demo.type === 'interactive_video') {
      if (!form.demo.video && !form.demo.videoId) missingFields.push('Demo video');
    }
    if (!form.caseStudy.problem?.trim()) missingFields.push('Problem (Arabic)');
    if (!form.caseStudy.solution?.trim()) missingFields.push('Solution (Arabic)');
    if (!form.caseStudy.architecture?.trim()) missingFields.push('Architecture (Arabic)');
    if (!form.caseStudy.challenges?.trim()) missingFields.push('Challenges (Arabic)');
    if (!form.caseStudy.results?.trim()) missingFields.push('Results (Arabic)');
    return missingFields;
  };

  const updateField = <K extends keyof AppDTO>(key: K, value: AppDTO[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateLinks = (key: keyof AppDTO['links'], value: string) => {
    setForm((prev) => ({ ...prev, links: { ...prev.links, [key]: value } }));
  };

  const updateDemo = (key: keyof AppDTO['demo'], value: any) => {
    setForm((prev) => ({ ...prev, demo: { ...prev.demo, [key]: value } }));
  };

  const updateLocalizedRoot = (
    field: 'shortDesc' | 'description',
    lang: keyof LocalizedText,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: lang === 'ar' ? value : prev[field],
      content: {
        ...prev.content!,
        [field]: {
          ...prev.content![field],
          [lang]: value
        }
      }
    }));
  };

  const updateCaseStudy = (
    field: keyof AppDTO['caseStudy'],
    lang: keyof LocalizedText,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      caseStudy: {
        ...prev.caseStudy,
        [field]: lang === 'ar' ? value : prev.caseStudy[field]
      },
      content: {
        ...prev.content!,
        caseStudy: {
          ...prev.content!.caseStudy,
          [field]: {
            ...prev.content!.caseStudy[field],
            [lang]: value
          }
        }
      }
    }));
  };

  const updateFeature = (
    index: number,
    key: 'title' | 'details',
    lang: keyof LocalizedText,
    value: string
  ) => {
    setForm((prev) => {
      const nextFeatures = [...prev.features];
      const nextLocalizedFeatures = [...(prev.content?.features ?? [])];

      nextFeatures[index] = {
        ...nextFeatures[index],
        [key]: lang === 'ar' ? value : nextFeatures[index]?.[key] ?? ''
      };

      nextLocalizedFeatures[index] = nextLocalizedFeatures[index] ?? createLocalizedFeature();
      nextLocalizedFeatures[index] = {
        ...nextLocalizedFeatures[index],
        [key]: {
          ...nextLocalizedFeatures[index][key],
          [lang]: value
        }
      };

      return {
        ...prev,
        features: nextFeatures,
        content: {
          ...prev.content!,
          features: nextLocalizedFeatures
        }
      };
    });
  };

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, { title: '', details: '' }],
      content: {
        ...prev.content!,
        features: [...(prev.content?.features ?? []), createLocalizedFeature()]
      }
    }));
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
      content: {
        ...prev.content!,
        features: (prev.content?.features ?? []).filter((_, i) => i !== index)
      }
    }));
  };

  const tagsString = useMemo(() => form.tags.join(', '), [form.tags]);
  const techString = useMemo(() => form.techStack.join(', '), [form.techStack]);

  const normalizeUrl = (value?: string | null) => {
    if (!value) return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    setServerDetails({});
    const missingFields = getMissingRequired();

    if (missingFields.length > 0) {
      setMissing(missingFields);
      setSaving(false);
      setError(locale === 'ar' ? 'تحقق من الحقول الإلزامية.' : 'Please review required fields.');
      return;
    }

    setMissing([]);
    const resolvedVideoId = form.demo.video?._id ?? (form.demo.videoId || undefined);

    const payload = {
      title: form.title.trim(),
      titleEn: form.titleEn?.trim() || undefined,
      slug: form.slug.trim(),
      shortDesc: form.content?.shortDesc.ar?.trim() || form.shortDesc.trim(),
      description: form.content?.description.ar?.trim() || form.description.trim(),
      category: form.category,
      tags: form.tags,
      roleVariants: form.roleVariants,
      techStack: form.techStack,
      features: (form.content?.features ?? []).map((feature, index) => ({
        title: feature.title.ar?.trim() || form.features[index]?.title || '',
        details: feature.details.ar?.trim() || form.features[index]?.details || ''
      })),
      kpis: form.kpis,
      links: {
        liveDemoUrl: normalizeUrl(form.links.liveDemoUrl),
        githubUrl: normalizeUrl(form.links.githubUrl),
        apkUrl: normalizeUrl(form.links.apkUrl),
        iosUrl: normalizeUrl(form.links.iosUrl),
        playStoreUrl: normalizeUrl(form.links.playStoreUrl),
        appStoreUrl: normalizeUrl(form.links.appStoreUrl)
      },
      demo: {
        type: form.demo.type,
        embedUrl: normalizeUrl(form.demo.embedUrl),
        videoId: resolvedVideoId,
        interactiveHotspots: form.demo.interactiveHotspots ?? []
      },
      media: {
        iconId: form.media.icon?._id,
        coverId: form.media.cover?._id,
        galleryIds: form.media.gallery?.map((item) => item._id)
      },
      mediaDisplay: form.mediaDisplay,
      caseStudy: {
        problem: form.content?.caseStudy.problem.ar?.trim() || form.caseStudy.problem.trim(),
        solution: form.content?.caseStudy.solution.ar?.trim() || form.caseStudy.solution.trim(),
        architecture:
          form.content?.caseStudy.architecture.ar?.trim() || form.caseStudy.architecture.trim(),
        challenges:
          form.content?.caseStudy.challenges.ar?.trim() || form.caseStudy.challenges.trim(),
        results: form.content?.caseStudy.results.ar?.trim() || form.caseStudy.results.trim()
      },
      content: {
        shortDesc: {
          ar: form.content?.shortDesc.ar?.trim() || form.shortDesc.trim(),
          en: form.content?.shortDesc.en?.trim() || ''
        },
        description: {
          ar: form.content?.description.ar?.trim() || form.description.trim(),
          en: form.content?.description.en?.trim() || ''
        },
        caseStudy: {
          problem: {
            ar: form.content?.caseStudy.problem.ar?.trim() || form.caseStudy.problem.trim(),
            en: form.content?.caseStudy.problem.en?.trim() || ''
          },
          solution: {
            ar: form.content?.caseStudy.solution.ar?.trim() || form.caseStudy.solution.trim(),
            en: form.content?.caseStudy.solution.en?.trim() || ''
          },
          architecture: {
            ar:
              form.content?.caseStudy.architecture.ar?.trim() || form.caseStudy.architecture.trim(),
            en: form.content?.caseStudy.architecture.en?.trim() || ''
          },
          challenges: {
            ar: form.content?.caseStudy.challenges.ar?.trim() || form.caseStudy.challenges.trim(),
            en: form.content?.caseStudy.challenges.en?.trim() || ''
          },
          results: {
            ar: form.content?.caseStudy.results.ar?.trim() || form.caseStudy.results.trim(),
            en: form.content?.caseStudy.results.en?.trim() || ''
          }
        },
        features: (form.content?.features ?? []).map((feature, index) => ({
          title: {
            ar: feature.title.ar?.trim() || form.features[index]?.title || '',
            en: feature.title.en?.trim() || ''
          },
          details: {
            ar: feature.details.ar?.trim() || form.features[index]?.details || '',
            en: feature.details.en?.trim() || ''
          }
        }))
      },
      status: form.status
    };

    const res = await fetch(
      mode === 'create' ? '/api/studio/apps' : `/api/studio/apps/${form._id}`,
      {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    setSaving(false);
    if (res.ok) {
      router.push('/studio/apps');
      return;
    }

    const data = await res.json().catch(() => ({}));
    if (data?.error?.fieldErrors) {
      setServerDetails(data.error.fieldErrors as Record<string, string[]>);
      setError(locale === 'ar' ? 'تحقق من المدخلات المطلوبة.' : 'Please review the required inputs.');
    } else {
      setError(data?.error ?? (locale === 'ar' ? 'حدث خطأ أثناء الحفظ.' : 'An error occurred while saving.'));
    }
  };

  const tabLabels: Record<(typeof tabs)[number]['id'], string> = {
    basic: locale === 'ar' ? 'بيانات أساسية' : 'Basic Info',
    media: locale === 'ar' ? 'الصور والوسائط' : 'Media',
    demo: locale === 'ar' ? 'الديمو' : 'Demo',
    case: locale === 'ar' ? 'دراسة الحالة' : 'Case Study',
    extras: locale === 'ar' ? 'روابط + KPIs + Features' : 'Links + KPIs + Features'
  };

  const renderLocalizedField = ({
    label,
    arValue,
    enValue,
    onArChange,
    onEnChange,
    rows = 3
  }: {
    label: string;
    arValue: string;
    enValue: string;
    onArChange: (value: string) => void;
    onEnChange: (value: string) => void;
    rows?: number;
  }) => (
    <div className="grid gap-3 md:grid-cols-2">
      <Textarea
        rows={rows}
        placeholder={`${label} (AR) *`}
        value={arValue}
        onChange={(event) => onArChange(event.target.value)}
      />
      <Textarea
        rows={rows}
        placeholder={`${label} (EN)`}
        value={enValue}
        onChange={(event) => onEnChange(event.target.value)}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {missing.length > 0 && (
        <div className="glass rounded-2xl border border-red-400/30 p-4 text-sm text-red-200">
          <p className="font-semibold">
            {locale === 'ar' ? 'حقول إلزامية ناقصة:' : 'Missing required fields:'}
          </p>
          <ul className="mt-2 list-disc pl-5">
            {missing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <Chip
            key={item.id}
            label={tabLabels[item.id] ?? item.label}
            active={tab === item.id}
            onClick={() => setTab(item.id)}
          />
        ))}
      </div>

      {tab === 'basic' && (
        <div className="glass rounded-2xl p-5 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Title (Arabic) *"
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
            />
            <Input
              placeholder="Title (EN)"
              value={form.titleEn ?? ''}
              onChange={(event) => updateField('titleEn', event.target.value)}
            />
            <Input
              placeholder="Slug *"
              value={form.slug}
              onChange={(event) => updateField('slug', event.target.value)}
            />
            <Select
              value={form.category}
              onChange={(event) => updateField('category', event.target.value as AppDTO['category'])}
            >
              {['Flutter', 'Backend', 'Admin', 'Tools', 'DevOps'].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Tags (comma separated)"
              value={tagsString}
              onChange={(event) =>
                updateField(
                  'tags',
                  event.target.value
                    .split(',')
                    .map((v) => v.trim())
                    .filter(Boolean)
                )
              }
            />
            <Input
              placeholder="Tech stack (comma separated)"
              value={techString}
              onChange={(event) =>
                updateField(
                  'techStack',
                  event.target.value
                    .split(',')
                    .map((v) => v.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold">
                {locale === 'ar' ? 'الوصف المختصر المترجم' : 'Localized short description'}
              </h3>
            </div>
            {renderLocalizedField({
              label: 'Short description',
              arValue: form.content?.shortDesc.ar ?? form.shortDesc,
              enValue: form.content?.shortDesc.en ?? '',
              onArChange: (value) => updateLocalizedRoot('shortDesc', 'ar', value),
              onEnChange: (value) => updateLocalizedRoot('shortDesc', 'en', value)
            })}
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold">
                {locale === 'ar' ? 'الوصف التفصيلي المترجم' : 'Localized markdown description'}
              </h3>
            </div>
            {renderLocalizedField({
              label: 'Description (Markdown)',
              arValue: form.content?.description.ar ?? form.description,
              enValue: form.content?.description.en ?? '',
              onArChange: (value) => updateLocalizedRoot('description', 'ar', value),
              onEnChange: (value) => updateLocalizedRoot('description', 'en', value),
              rows: 8
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              value={form.status}
              onChange={(event) => updateField('status', event.target.value as AppDTO['status'])}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </div>
        </div>
      )}

      {tab === 'media' && (
        <div className="glass rounded-2xl p-5 space-y-6">
          <MediaUploader
            label="App Icon"
            value={form.media.icon ?? undefined}
            onChange={(media) => updateField('media', { ...form.media, icon: media })}
          />
          <MediaUploader
            label="Cover"
            value={form.media.cover ?? undefined}
            onChange={(media) => updateField('media', { ...form.media, cover: media })}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Select
              value={form.mediaDisplay?.cover ?? 'full'}
              onChange={(event) =>
                updateField('mediaDisplay', {
                  ...form.mediaDisplay,
                  cover: event.target.value as 'phone' | 'full'
                })
              }
            >
              <option value="full">Cover: Full</option>
              <option value="phone">Cover: Phone</option>
            </Select>
            <Select
              value={form.mediaDisplay?.gallery ?? 'phone'}
              onChange={(event) =>
                updateField('mediaDisplay', {
                  ...form.mediaDisplay,
                  gallery: event.target.value as 'phone' | 'full'
                })
              }
            >
              <option value="phone">Gallery: Phone</option>
              <option value="full">Gallery: Full</option>
            </Select>
          </div>
          <GalleryUploader
            label="Gallery"
            values={form.media.gallery ?? []}
            onChange={(media) => updateField('media', { ...form.media, gallery: media })}
          />
        </div>
      )}

      {tab === 'demo' && (
        <div className="glass rounded-2xl p-5 space-y-4">
          <Select value={form.demo.type} onChange={(event) => updateDemo('type', event.target.value)}>
            <option value="video">Video</option>
            <option value="flutter_web">Flutter Web</option>
            <option value="interactive_video">Interactive Video</option>
          </Select>

          {form.demo.type === 'flutter_web' && (
            <div className="space-y-3">
              <Input
                placeholder="Embed URL *"
                value={form.demo.embedUrl ?? ''}
                onChange={(event) => updateDemo('embedUrl', event.target.value)}
              />
              <FlutterWebUploader slug={form.slug} onUploaded={(url) => updateDemo('embedUrl', url)} />
              <p className="text-xs text-muted">
                {locale === 'ar'
                  ? 'تأكد أن الـ slug مكتوب قبل رفع نسخة Flutter Web.'
                  : 'Make sure the slug is set before uploading the Flutter Web build.'}
              </p>
            </div>
          )}

          {(form.demo.type === 'video' || form.demo.type === 'interactive_video') && (
            <MediaUploader
              label="Demo Video *"
              value={form.demo.video ?? undefined}
              onChange={(media) => updateDemo('video', media)}
            />
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Role Variants</h4>
            {form.roleVariants.map((variant, index) => (
              <div key={`${variant.key}-${index}`} className="grid gap-2 md:grid-cols-3">
                <Input
                  placeholder="Key (customer/driver/admin)"
                  value={variant.key}
                  onChange={(event) => {
                    const updated = [...form.roleVariants];
                    updated[index] = { ...variant, key: event.target.value };
                    updateField('roleVariants', updated);
                  }}
                />
                <Input
                  placeholder="Label"
                  value={variant.label}
                  onChange={(event) => {
                    const updated = [...form.roleVariants];
                    updated[index] = { ...variant, label: event.target.value };
                    updateField('roleVariants', updated);
                  }}
                />
                <Button
                  variant="ghost"
                  onClick={() =>
                    updateField(
                      'roleVariants',
                      form.roleVariants.filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                updateField('roleVariants', [...form.roleVariants, { key: '', label: '' }])
              }
            >
              Add Role Variant
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Interactive Hotspots</h4>
            {(form.demo.interactiveHotspots ?? []).map((spot, index) => (
              <div key={`${spot.label}-${index}`} className="grid gap-2 md:grid-cols-6">
                <Input
                  placeholder="Start"
                  value={String(spot.timeStart)}
                  onChange={(event) => {
                    const updated = [...(form.demo.interactiveHotspots ?? [])];
                    updated[index] = { ...spot, timeStart: Number(event.target.value) };
                    updateDemo('interactiveHotspots', updated);
                  }}
                />
                <Input
                  placeholder="End"
                  value={String(spot.timeEnd)}
                  onChange={(event) => {
                    const updated = [...(form.demo.interactiveHotspots ?? [])];
                    updated[index] = { ...spot, timeEnd: Number(event.target.value) };
                    updateDemo('interactiveHotspots', updated);
                  }}
                />
                <Input
                  placeholder="X%"
                  value={String(spot.x)}
                  onChange={(event) => {
                    const updated = [...(form.demo.interactiveHotspots ?? [])];
                    updated[index] = { ...spot, x: Number(event.target.value) };
                    updateDemo('interactiveHotspots', updated);
                  }}
                />
                <Input
                  placeholder="Y%"
                  value={String(spot.y)}
                  onChange={(event) => {
                    const updated = [...(form.demo.interactiveHotspots ?? [])];
                    updated[index] = { ...spot, y: Number(event.target.value) };
                    updateDemo('interactiveHotspots', updated);
                  }}
                />
                <Input
                  placeholder="Action"
                  value={spot.action}
                  onChange={(event) => {
                    const updated = [...(form.demo.interactiveHotspots ?? [])];
                    updated[index] = { ...spot, action: event.target.value };
                    updateDemo('interactiveHotspots', updated);
                  }}
                />
                <Input
                  placeholder="Label"
                  value={spot.label}
                  onChange={(event) => {
                    const updated = [...(form.demo.interactiveHotspots ?? [])];
                    updated[index] = { ...spot, label: event.target.value };
                    updateDemo('interactiveHotspots', updated);
                  }}
                />
                <Button
                  variant="ghost"
                  onClick={() =>
                    updateDemo(
                      'interactiveHotspots',
                      (form.demo.interactiveHotspots ?? []).filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                updateDemo('interactiveHotspots', [
                  ...(form.demo.interactiveHotspots ?? []),
                  { timeStart: 0, timeEnd: 1, x: 50, y: 50, action: 'info', label: 'Hotspot' }
                ])
              }
            >
              Add Hotspot
            </Button>
          </div>
        </div>
      )}

      {tab === 'case' && (
        <div className="glass rounded-2xl p-5 space-y-5">
          <div>
            <h3 className="text-lg font-semibold">
              {locale === 'ar' ? 'محتوى دراسة الحالة المترجم' : 'Localized case study content'}
            </h3>
            <p className="text-sm text-muted">
              {locale === 'ar'
                ? 'املأ العربي والإنجليزي ليظهر المحتوى الصحيح حسب اللغة المختارة.'
                : 'Fill both Arabic and English so the correct content appears for each locale.'}
            </p>
          </div>

          {renderLocalizedField({
            label: 'Problem',
            arValue: form.content?.caseStudy.problem.ar ?? form.caseStudy.problem,
            enValue: form.content?.caseStudy.problem.en ?? '',
            onArChange: (value) => updateCaseStudy('problem', 'ar', value),
            onEnChange: (value) => updateCaseStudy('problem', 'en', value)
          })}
          {renderLocalizedField({
            label: 'Solution',
            arValue: form.content?.caseStudy.solution.ar ?? form.caseStudy.solution,
            enValue: form.content?.caseStudy.solution.en ?? '',
            onArChange: (value) => updateCaseStudy('solution', 'ar', value),
            onEnChange: (value) => updateCaseStudy('solution', 'en', value)
          })}
          {renderLocalizedField({
            label: 'Architecture',
            arValue: form.content?.caseStudy.architecture.ar ?? form.caseStudy.architecture,
            enValue: form.content?.caseStudy.architecture.en ?? '',
            onArChange: (value) => updateCaseStudy('architecture', 'ar', value),
            onEnChange: (value) => updateCaseStudy('architecture', 'en', value)
          })}
          {renderLocalizedField({
            label: 'Challenges',
            arValue: form.content?.caseStudy.challenges.ar ?? form.caseStudy.challenges,
            enValue: form.content?.caseStudy.challenges.en ?? '',
            onArChange: (value) => updateCaseStudy('challenges', 'ar', value),
            onEnChange: (value) => updateCaseStudy('challenges', 'en', value)
          })}
          {renderLocalizedField({
            label: 'Results',
            arValue: form.content?.caseStudy.results.ar ?? form.caseStudy.results,
            enValue: form.content?.caseStudy.results.en ?? '',
            onArChange: (value) => updateCaseStudy('results', 'ar', value),
            onEnChange: (value) => updateCaseStudy('results', 'en', value)
          })}
        </div>
      )}

      {tab === 'extras' && (
        <div className="glass rounded-2xl p-5 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Live Demo URL"
              value={form.links.liveDemoUrl ?? ''}
              onChange={(event) => updateLinks('liveDemoUrl', event.target.value)}
            />
            <Input
              placeholder="GitHub URL"
              value={form.links.githubUrl ?? ''}
              onChange={(event) => updateLinks('githubUrl', event.target.value)}
            />
            <Input
              placeholder="APK URL"
              value={form.links.apkUrl ?? ''}
              onChange={(event) => updateLinks('apkUrl', event.target.value)}
            />
            <Input
              placeholder="iOS URL"
              value={form.links.iosUrl ?? ''}
              onChange={(event) => updateLinks('iosUrl', event.target.value)}
            />
            <Input
              placeholder="Play Store URL"
              value={form.links.playStoreUrl ?? ''}
              onChange={(event) => updateLinks('playStoreUrl', event.target.value)}
            />
            <Input
              placeholder="App Store URL"
              value={form.links.appStoreUrl ?? ''}
              onChange={(event) => updateLinks('appStoreUrl', event.target.value)}
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">KPIs</h4>
            {(form.kpis ?? []).map((kpi, index) => (
              <div key={`${kpi.label}-${index}`} className="grid gap-2 md:grid-cols-3">
                <Input
                  placeholder="Label"
                  value={kpi.label}
                  onChange={(event) => {
                    const updated = [...(form.kpis ?? [])];
                    updated[index] = { ...kpi, label: event.target.value };
                    updateField('kpis', updated);
                  }}
                />
                <Input
                  placeholder="Value"
                  value={kpi.value}
                  onChange={(event) => {
                    const updated = [...(form.kpis ?? [])];
                    updated[index] = { ...kpi, value: event.target.value };
                    updateField('kpis', updated);
                  }}
                />
                <Button
                  variant="ghost"
                  onClick={() =>
                    updateField(
                      'kpis',
                      (form.kpis ?? []).filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => updateField('kpis', [...(form.kpis ?? []), { label: '', value: '' }])}
            >
              Add KPI
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">
              {locale === 'ar' ? 'المميزات المترجمة' : 'Localized features'}
            </h4>
            {form.features.map((feature, index) => (
              <div key={`${feature.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    placeholder="Feature title (AR)"
                    value={form.content?.features?.[index]?.title.ar ?? feature.title}
                    onChange={(event) => updateFeature(index, 'title', 'ar', event.target.value)}
                  />
                  <Input
                    placeholder="Feature title (EN)"
                    value={form.content?.features?.[index]?.title.en ?? ''}
                    onChange={(event) => updateFeature(index, 'title', 'en', event.target.value)}
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Textarea
                    rows={3}
                    placeholder="Feature details (AR)"
                    value={form.content?.features?.[index]?.details.ar ?? feature.details}
                    onChange={(event) => updateFeature(index, 'details', 'ar', event.target.value)}
                  />
                  <Textarea
                    rows={3}
                    placeholder="Feature details (EN)"
                    value={form.content?.features?.[index]?.details.en ?? ''}
                    onChange={(event) => updateFeature(index, 'details', 'en', event.target.value)}
                  />
                </div>
                <Button variant="ghost" onClick={() => removeFeature(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="secondary" onClick={addFeature}>
              Add Feature
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={() => router.push('/studio/apps')}>
          Cancel
        </Button>
        <Button onClick={save} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}

      {Object.keys(serverDetails).length > 0 && (
        <div className="glass rounded-2xl border border-red-400/30 p-4 text-xs text-red-200">
          <p className="mb-2 font-semibold">
            {locale === 'ar' ? 'تفاصيل الأخطاء من السيرفر:' : 'Server validation details:'}
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {Object.entries(serverDetails).map(([field, messages]) => (
              <li key={field}>
                {field}: {messages.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
