'use client';

import { AppDTO } from '@/lib/types';
import { useLocale } from '@/components/LocaleProvider';
import { getLocalizedAppTitle, getLocalizedCategory } from '@/lib/app-presentation';
import Link from 'next/link';
import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = Array.from({ length: 30 }).map((_, i) => ({
  name: `Day ${i + 1}`,
  activity: Math.floor(Math.random() * 80) + 10,
  commits: Math.floor(Math.random() * 40) + 5
}));

const techData = [
  { name: 'React', value: 85 },
  { name: 'Next.js', value: 90 },
  { name: 'Node.js', value: 70 },
  { name: 'Flutter', value: 60 },
  { name: 'TypeScript', value: 95 },
  { name: 'MongoDB', value: 65 },
  { name: 'AWS', value: 50 },
];

export default function DashboardOverview({ apps }: { apps: AppDTO[] }) {
  const { locale } = useLocale();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">
          {locale === 'ar' ? 'مرحباً بعودتك، يوسف' : 'Welcome back, Yousef'}
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            <span>{locale === 'ar' ? 'تقرير يومي' : 'Daily'}</span>
            <span className="mx-2 text-white/20">|</span>
            <span>6 Nov 2025</span>
          </div>
          <button className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent-400">
            {locale === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV'}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: locale === 'ar' ? 'إجمالي المشاريع' : 'TOTAL PROJECTS', value: apps.length.toString(), trend: '+2 this year' },
          { label: locale === 'ar' ? 'التقنيات المستخدمة' : 'TECH STACK', value: '14', trend: '+4 this year' },
          { label: locale === 'ar' ? 'العملاء (B2B)' : 'BUSINESS CLIENTS', value: '6', trend: 'Active' },
          { label: locale === 'ar' ? 'سنوات الخبرة' : 'YEARS EXP.', value: '4+', trend: 'Growing' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-[#222222] p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{stat.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <div className="flex items-center gap-1 text-xs text-accent-500">
                <span>{stat.trend}</span>
              </div>
            </div>
            <div className="mt-4 flex h-8 items-end gap-1">
              {[4, 7, 5, 8, 3, 6, 9].map((height, hIdx) => (
                <div
                  key={hIdx}
                  className="w-full flex-1 rounded-sm bg-accent-500"
                  style={{ height: `${height * 10}%`, opacity: 0.4 + (hIdx * 0.1) }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-white/5 bg-[#222222] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase">
              {locale === 'ar' ? 'نشاط المشاريع' : 'PROJECTS TREND'}
            </h3>
            <div className="flex gap-2 text-xs font-medium">
              <span className="text-white/40">{locale === 'ar' ? 'أسبوعي' : 'Weekly'}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-white">{locale === 'ar' ? 'شهري' : 'Monthly'}</span>
              <span className="text-white/40">{locale === 'ar' ? 'سنوي' : 'Yearly'}</span>
            </div>
          </div>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#131313', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="activity" stackId="a" fill="rgba(255, 123, 0, 0.4)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="commits" stackId="a" fill="#FF7B00" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#222222] p-6">
          <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase">
            {locale === 'ar' ? 'توزيع التقنيات' : 'TECH BREAKDOWN'}
          </h3>
          <div className="mt-8 h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={techData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  contentStyle={{ backgroundColor: '#131313', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {techData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 || index === 4 ? '#FF7B00' : 'rgba(255, 123, 0, 0.4)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="rounded-2xl border border-white/5 bg-[#222222] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold tracking-wider text-white/50 uppercase">
            {locale === 'ar' ? 'التطبيقات الحديثة' : 'RECENT APPLICATIONS'}
          </h3>
          <Link href="/apps" className="rounded-lg bg-accent-500/10 px-4 py-2 text-xs font-semibold text-accent-500 transition hover:bg-accent-500/20">
            {locale === 'ar' ? '+ عرض الكل' : '+ View All'}
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/60">
            <thead>
              <tr className="border-b border-white/10 uppercase tracking-wider text-white/30 text-xs">
                <th className="pb-4 font-semibold">ID</th>
                <th className="pb-4 font-semibold">{locale === 'ar' ? 'اسم التطبيق' : 'APPLICATION'}</th>
                <th className="pb-4 font-semibold">{locale === 'ar' ? 'التصنيف' : 'CATEGORY'}</th>
                <th className="pb-4 font-semibold">{locale === 'ar' ? 'التقنية' : 'TECH STACK'}</th>
                <th className="pb-4 font-semibold">{locale === 'ar' ? 'الحالة' : 'STATUS'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {apps.slice(0, 5).map((app, idx) => (
                <tr key={app._id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 font-mono text-xs text-white/40">#{String(idx + 1).padStart(4, '0')}</td>
                  <td className="py-4 font-semibold text-white">{getLocalizedAppTitle(app, locale)}</td>
                  <td className="py-4">{getLocalizedCategory(app.category, locale)}</td>
                  <td className="py-4 text-xs font-mono text-white/50">
                    {(app.techStack ?? []).slice(0, 2).join(', ')}
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs text-green-400">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
