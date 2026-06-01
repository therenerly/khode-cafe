import { useTranslation } from 'react-i18next'
import { FiPhone, FiMapPin, FiClock, FiArrowUpRight } from 'react-icons/fi'

const PHONE = '+855 (0) 69 69 005'
const PHONE_TEL = '+85569690005'
const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Le-nou+Siemreap+Guesthouse'

export default function Contact() {
  const { t } = useTranslation()

  const cards = [
    {
      icon: FiPhone,
      label: t('contact.phone'),
      value: PHONE,
      href: `tel:${PHONE_TEL}`,
    },
    {
      icon: FiMapPin,
      label: t('contact.location'),
      value: t('contact.locationName'),
      href: MAP_LINK,
    },
    {
      icon: FiClock,
      label: t('contact.hours'),
      value: t('contact.hoursValue'),
    },
  ]

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-brand-500/10 blur-[120px]" />
      </div>
      <div className="container-px">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Info */}
          <div className="reveal lg:col-span-5">
            <span className="chip">{t('contact.chip')}</span>
            <h2 className="mt-5 section-title text-balance">{t('contact.title')}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {t('contact.subtitle')}
            </p>

            <div className="mt-8 space-y-4">
              {cards.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-deep/15 text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        {label}
                      </p>
                      <p className="mt-0.5 font-semibold text-ink-900 dark:text-white">
                        {value}
                      </p>
                    </div>
                    {href && (
                      <FiArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-brand-500" />
                    )}
                  </>
                )
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group card flex items-center gap-4 p-4 hover:border-brand-500/40 hover:shadow-glow"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="card flex items-center gap-4 p-4">
                    {inner}
                  </div>
                )
              })}
            </div>

            {/* Address strip */}
            <div className="mt-4 rounded-2xl border border-dashed border-brand-500/30 bg-brand-500/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {t('contact.address')}
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                {t('contact.addressValue')}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${PHONE_TEL}`} className="btn-primary">
                <FiPhone className="h-4 w-4" /> {t('contact.callUs')}
              </a>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <FiMapPin className="h-4 w-4" /> {t('contact.getDirections')}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="reveal lg:col-span-7">
            <div className="card overflow-hidden p-2 shadow-soft">
              {/* Map label bar */}
              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-deep dark:text-brand-200">
                  <FiMapPin className="h-4 w-4 text-brand-500" />
                  {t('contact.locationName')}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  {t('hero.stat3')}
                </span>
              </div>
              <iframe
                title="KHode Café location — Le-Nou Siemreap Guesthouse"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4185.375824551374!2d103.85088597540755!3d13.34481918700596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110170031c639b5%3A0x3ccd9e79d92ee6b7!2sLe-nou%20Siemreap%20Guesthouse!5e1!3m2!1sen!2skh!4v1780121344468!5m2!1sen!2skh"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '440px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
