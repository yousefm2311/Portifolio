'use client';

import Card from '@/components/ui/Card';
import { useLocale } from '@/components/LocaleProvider';
import Button from '@/components/ui/Button';

export default function AboutContent({ cvUrl }: { cvUrl?: string | null }) {
  const { locale, t } = useLocale();

  const intro =
    locale === 'ar'
      ? 'أبني منتجات رقمية من أول الفكرة حتى الإطلاق، مع تركيز على الوضوح، سرعة التنفيذ، وجودة التفاصيل التي يراها المستخدم.'
      : 'I build digital products from the first idea to launch, with a focus on clarity, fast execution, and polished user-facing detail.';

  const highlightTags =
    locale === 'ar'
      ? ['Flutter products', 'Admin systems', 'Interactive UI', 'Fast shipping']
      : ['Flutter products', 'Admin systems', 'Interactive UI', 'Fast shipping'];

  const blocks =
    locale === 'ar'
      ? [
          {
            title: 'كيف أشتغل',
            desc: 'أتعامل مع المنتج كرحلة كاملة: فهم الفكرة، تشكيل واجهة واضحة، ثم تنفيذ مستقر قابل للتوسع.'
          },
          {
            title: 'أين أضيف قيمة',
            desc: 'في المشاريع التي تحتاج دمج بين التصميم المقنع واللوجيك النظيف، خصوصًا تطبيقات الموبايل ولوحات الإدارة.'
          },
          {
            title: 'التركيز الحالي',
            desc: 'تقديم التطبيقات بشكل أقوى بصريًا، وتحويل البورتفوليو من مجرد عرض أعمال إلى تجربة بيع حقيقية.'
          }
        ]
      : [
          {
            title: 'How I work',
            desc: 'I approach a product as a full journey: understand the idea, shape a clear interface, then build it on reliable foundations.'
          },
          {
            title: 'Where I add value',
            desc: 'Projects that need both convincing design and clean logic, especially mobile products and admin systems.'
          },
          {
            title: 'Current focus',
            desc: 'Presenting apps more powerfully and turning the portfolio from a gallery into a true product pitch.'
          }
        ];

  return (
    <div className="space-y-8">
      <section className="section-shell p-6 sm:p-8">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              {locale === 'ar' ? 'نبذة' : 'Profile'}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t('aboutTitle')}</h1>
            <p className="max-w-2xl text-sm leading-8 text-muted">{t('aboutSubtitle')}</p>
            <p className="max-w-2xl text-sm leading-8 text-white/80">{intro}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {highlightTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/65"
                >
                  {tag}
                </span>
              ))}
            </div>

            {cvUrl && (
              <div className="pt-2">
                <a href={cvUrl} target="_blank" rel="noreferrer">
                  <Button>{locale === 'ar' ? 'تحميل السيرة الذاتية (PDF)' : 'Download CV (PDF)'}</Button>
                </a>
              </div>
            )}
          </div>

          <div className="grid gap-3">
            {blocks.map((block) => (
              <Card key={block.title} className="glass-soft rounded-[1.8rem] border border-white/10">
                <h2 className="text-xl font-semibold tracking-tight">{block.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{block.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
