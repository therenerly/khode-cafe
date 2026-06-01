import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiCheck, FiCoffee, FiChevronRight } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaTiktok } from 'react-icons/fa'
import Logo from '../ui/Logo.jsx'

const SOCIALS = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTelegramPlane, href: '#', label: 'Telegram' },
  { icon: FaTiktok, href: '#', label: 'TikTok' },
]

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

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-slate-200/70 bg-slate-50/60 dark:border-white/10 dark:bg-ink-800/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-grid opacity-40 mask-fade-x" />

      {/* Newsletter band */}
      <div className="container-px py-14">
        <div className="card relative overflow-hidden p-8 shadow-soft sm:p-10">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                {t('newsletter.title')}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {t('newsletter.subtitle')}
              </p>
            </div>
            <form onSubmit={subscribe} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="input"
                aria-label={t('newsletter.placeholder')}
              />
              <button type="submit" className="btn-primary shrink-0">
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
      </div>

      {/* Main footer */}
      <div className="container-px grid gap-10 pb-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {t('footer.blurb')}
          </p>
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 transition hover:-translate-y-0.5 hover:border-brand-500/50 hover:text-brand-500 dark:border-white/10 dark:bg-white/5"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          {Object.entries(cols).map(([colKey, links]) => (
            <div key={colKey}>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                {t(`footer.${colKey}`)}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {links.map(([labelKey, href]) => (
                  <li key={labelKey}>
                    <a
                      href={href}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"
                    >
                      <FiChevronRight className="h-3.5 w-3.5 text-brand-500/60 transition-transform group-hover:translate-x-0.5" />
                      {t(labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payments */}
        <div className="lg:col-span-3">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            {t('footer.pay')}
          </h4>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex h-12 items-center rounded-xl border border-slate-200/80 bg-white px-3 dark:border-white/10 dark:bg-white/95">
              <img src="/aba-pay.svg" alt="ABA PayWay" className="h-7 w-auto" />
            </span>
            <span className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 text-sm font-bold text-deep dark:border-white/10 dark:bg-white/95">
              <img src="/switch-lang.svg" alt="" className="h-5 w-5" /> KHQR
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {t('payment.currencyNote')}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200/70 py-6 dark:border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} {t('brand.name')} {t('brand.suffix')} ·{' '}
            {t('footer.rights')}
          </p>
          <p className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            {t('footer.madeWith')} <FiCoffee className="h-4 w-4 text-coffee-500" /> · www.khode.com
          </p>
        </div>
      </div>
    </footer>
  )
}
