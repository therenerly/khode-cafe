import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiArrowRight,
  FiCheck,
  FiCoffee,
  FiPhone,
  FiClock,
  FiMapPin,
  FiArrowUpRight,
  FiArrowUp,
} from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaTiktok } from 'react-icons/fa'

const SOCIALS = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTelegramPlane, href: '#', label: 'Telegram' },
  { icon: FaTiktok, href: '#', label: 'TikTok' },
]

const PHONE = '+855 (0) 69 69 005'
const PHONE_TEL = '+85569690005'
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=Le-nou+Siemreap+Guesthouse'

export default function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setDone(true)
    setEmail('')
    setTimeout(() => setDone(false), 3000)
  }

  const cols = {
    explore: [
      ['nav.about', '#about'],
      ['nav.menu', '#menu'],
      ['nav.features', '#features'],
      ['nav.gallery', '#gallery'],
    ],
    company: [
      ['footer.careers', '#'],
      ['footer.press', '#'],
      ['nav.contact', '#contact'],
    ],
    legal: [
      ['footer.privacy', '#'],
      ['footer.terms', '#'],
      ['footer.cookies', '#'],
    ],
  }

  const contact = [
    { icon: FiPhone, label: PHONE, href: `tel:${PHONE_TEL}` },
    { icon: FiMapPin, label: t('contact.locationName'), href: MAP_LINK, external: true },
    { icon: FiClock, label: t('contact.hoursValue') },
  ]

  return (
    <footer className="relative mt-20 overflow-hidden rounded-t-[2.5rem] bg-ink-900 text-paper-100/75">
      <div className="relative">
        {/* Newsletter strip */}
        <div className="container-px border-b border-white/10 py-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                {t('newsletter.title')}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{t('newsletter.subtitle')}</p>
            </div>
            <form onSubmit={subscribe} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                aria-label={t('newsletter.placeholder')}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/20"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-paper-50 px-6 py-3.5 text-sm font-semibold text-ink-900 transition-all hover:-translate-y-0.5"
              >
                {done ? (
                  <>
                    <FiCheck className="h-4 w-4" /> {t('newsletter.subscribed')}
                  </>
                ) : (
                  <>
                    {t('newsletter.subscribe')} <FiArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Main grid */}
        <div className="container-px grid gap-10 py-14 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#home" className="group inline-flex items-center gap-2.5" aria-label="KHode Café — home">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 transition-transform group-hover:-rotate-6">
                <img src="/khode-logo.png" alt="KHode" className="h-7 w-7 object-contain" width="28" height="28" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                {t('brand.name')}
                <span className="text-brand-400">.</span>
                <span className="ml-1 font-bold text-slate-400">{t('brand.suffix')}</span>
              </span>
            </a>

            {/* code-café tagline */}
            <p className="mt-5 font-mono text-xs text-brand-300/80">
              <span className="text-slate-500">{'// '}</span>
              {t('brand.tagline')}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">{t('footer.blurb')}</p>

            {/* Quick contact */}
            <ul className="mt-6 space-y-2.5">
              {contact.map(({ icon: Icon, label, href, external }) => {
                const body = (
                  <>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/5 text-brand-300 ring-1 ring-white/10">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {label}
                  </>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noreferrer' : undefined}
                        className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-300 transition hover:text-brand-300"
                      >
                        {body}
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-400">
                        {body}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {Object.entries(cols).map(([colKey, links]) => (
              <div key={colKey}>
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                  {t(`footer.${colKey}`)}
                </h4>
                <ul className="mt-4 space-y-3">
                  {links.map(([labelKey, href]) => (
                    <li key={labelKey}>
                      <a
                        href={href}
                        className="group inline-flex items-center gap-1 text-sm font-medium text-slate-300 transition hover:text-brand-300"
                      >
                        {t(labelKey)}
                        <FiArrowUpRight className="h-3.5 w-3.5 -translate-x-1 text-brand-400/0 transition-all group-hover:translate-x-0 group-hover:text-brand-400" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payments + status + socials */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {t('footer.pay')}
            </h4>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex h-12 items-center rounded-xl bg-white px-3 transition hover:-translate-y-0.5">
                <img src="/aba-pay.svg" alt="ABA PayWay" className="h-7 w-auto" />
              </span>
              <span className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-deep transition hover:-translate-y-0.5">
                <img src="/switch-lang.svg" alt="" className="h-5 w-5" /> KHQR
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500">{t('payment.currencyNote')}</p>

            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {t('hero.stat3')} · 7:00–23:00
            </span>

            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-brand-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Oversized brand watermark */}
        <div className="pointer-events-none relative select-none overflow-hidden" aria-hidden="true">
          <span
            className="block translate-y-[22%] bg-gradient-to-b from-white/[0.06] to-transparent bg-clip-text text-center font-display font-black leading-none text-transparent"
            style={{ fontSize: 'clamp(4rem, 20vw, 18rem)' }}
          >
            {t('brand.name')}
          </span>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-px flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} {t('brand.name')} {t('brand.suffix')} · {t('footer.rights')}
            </p>
            <p className="inline-flex items-center gap-1.5 text-sm text-slate-500">
              {t('footer.madeWith')} <FiCoffee className="h-4 w-4 text-coffee-400" /> in Siem Reap ·{' '}
              <a href="https://www.khode.com" className="font-semibold text-brand-300 transition hover:text-brand-200">
                www.khode.com
              </a>
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-300 transition hover:border-brand-400/50 hover:text-brand-300"
            >
              <FiArrowUp className="h-3.5 w-3.5" /> {t('brand.name')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
