'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Inputs';
import Button from '@/components/ui/Button';
import { useLocale } from '@/components/LocaleProvider';

export default function ContactContent() {
  const { locale, t } = useLocale();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const validate = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (trimmedName.length < 2) {
      return locale === 'ar'
        ? 'الاسم لازم يكون حرفين على الأقل.'
        : 'Name must be at least 2 characters.';
    }
    if (!emailOk) {
      return locale === 'ar'
        ? 'اكتب بريدًا إلكترونيًا صحيحًا.'
        : 'Please enter a valid email address.';
    }
    if (trimmedMessage.length < 10) {
      return locale === 'ar'
        ? 'الرسالة لازم تكون 10 أحرف على الأقل.'
        : 'Message must be at least 10 characters.';
    }
    return null;
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const validationError = validate();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }
    setSending(true);
    setStatus(null);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    setSending(false);
    if (res.ok) {
      setStatus({
        type: 'success',
        message: locale === 'ar' ? 'تم إرسال الرسالة بنجاح.' : 'Message sent successfully.'
      });
      setName('');
      setEmail('');
      setMessage('');
    } else {
      const data = await res.json().catch(() => ({}));
      const rawError = typeof data?.error === 'string' ? data.error : null;
      const responseMessage =
        rawError === 'Email provider is not configured.'
          ? locale === 'ar'
            ? 'خدمة البريد غير مفعلة بعد. أضف إعدادات SMTP أولًا.'
            : 'Email provider is not configured yet. Please add SMTP settings first.'
          : locale === 'ar'
            ? 'تعذر إرسال الرسالة. حاول مرة أخرى.'
            : 'Unable to send your message. Please try again.';
      setStatus({ type: 'error', message: responseMessage });
    }
  };

  const quickSteps =
    locale === 'ar'
      ? [
          'ابعت الفكرة أو وصفًا مختصرًا للمشروع.',
          'سنرتب النطاق والنتيجة المطلوبة بسرعة.',
          'نبدأ التنفيذ مع تحديثات واضحة ومستمرة.'
        ]
      : [
          'Send the idea or a short project brief.',
          'We align on scope and the desired outcome quickly.',
          'Execution starts with clear, steady updates.'
        ];

  return (
    <div className="space-y-8">
      <section className="section-shell p-6 sm:p-8">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              {locale === 'ar' ? 'تواصل' : 'Contact'}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t('contactTitle')}</h1>
            <p className="max-w-2xl text-sm leading-8 text-muted">{t('contactSubtitle')}</p>

            <Card className="glass-soft rounded-[1.8rem] border border-white/10">
              <h2 className="text-lg font-semibold">
                {locale === 'ar' ? 'خطوات سريعة' : 'Quick steps'}
              </h2>
              <div className="mt-4 space-y-3 text-sm text-muted">
                {quickSteps.map((step) => (
                  <div key={step} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    {step}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-soft rounded-[1.8rem] border border-white/10">
              <h2 className="text-lg font-semibold">
                {locale === 'ar' ? 'وقت الرد' : 'Response time'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {locale === 'ar'
                  ? 'عادةً يصل الرد خلال 24 ساعة في أيام العمل.'
                  : 'I usually reply within 24 hours on business days.'}
              </p>
            </Card>
          </div>

          <Card className="glass-soft rounded-[1.8rem] border border-white/10">
            <form className="space-y-4" onSubmit={submit}>
              <Input
                placeholder={locale === 'ar' ? 'الاسم الكامل' : 'Full name'}
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <Input
                placeholder={locale === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Textarea
                placeholder={locale === 'ar' ? 'رسالتك' : 'Your message'}
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
              <Button type="submit" disabled={sending}>
                {sending ? (locale === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') : t('sendMessage')}
              </Button>
              {status && (
                <p
                  className={`text-sm ${
                    status.type === 'success' ? 'text-emerald-200' : 'text-red-200'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
