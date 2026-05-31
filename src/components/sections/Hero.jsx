import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiArrowDown, FiWifi, FiStar } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { useUI } from '../../context/UIContext.jsx'

export default function Hero() {
  const { t } = useTranslation()
  const { openCart } = useUI()
  const ticker = t('hero.ticker', { returnObjects: true })
  const tickerItems = Array.isArray(ticker) ? ticker : []

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Background flourishes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60 mask-fade-x" />
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-deep/20 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-coffee-400/10 blur-[120px]" />
      </div>

      <div className="container-px grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <span className="chip animate-fade-up">
            <HiOutlineSparkles className="h-3.5 w-3.5" />
            {t('hero.badge')}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="animate-fade-up [animation-delay:80ms]">
              {t('hero.title')}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 animate-fade-up [animation-delay:160ms] dark:text-slate-300 sm:text-lg">
            {t('hero.subtitle')}
          </p>

          <div className="mt-8 flex flex-col gap-3 animate-fade-up [animation-delay:240ms] sm:flex-row sm:items-center">
            <button type="button" onClick={openCart} className="btn-primary group">
              {t('hero.ctaPrimary')}
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#menu" className="btn-ghost">
              {t('hero.ctaSecondary')}
            </a>
          </div>

          {/* Stats */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 animate-fade-up [animation-delay:320ms]">
            {[
              ['24+', t('hero.stat1')],
              ['90s', t('hero.stat2')],
              ['7–11', t('hero.stat3')],
            ].map(([value, label]) => (
              <div key={label} className="border-l-2 border-brand-500/40 pl-4">
                <dt className="font-display text-2xl font-extrabold gradient-text sm:text-3xl">
                  {value}
                </dt>
                <dd className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-md animate-fade-up [animation-delay:200ms] lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/20 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1100&q=80"
                alt="Barista pouring latte art at KHode Café"
                className="h-[420px] w-full object-cover sm:h-[520px]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
            </div>

            {/* Floating rating card */}
            <div className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 p-3 shadow-soft backdrop-blur-xl animate-float dark:border-white/10 dark:bg-ink-800/90 sm:-left-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-coffee-400/15 text-coffee-500">
                <FiStar className="h-5 w-5 fill-current" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold leading-none">4.9</p>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  1,200+ reviews
                </p>
              </div>
            </div>

            {/* Floating wifi card */}
            <div
              className="absolute -right-3 bottom-10 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 p-3 shadow-soft backdrop-blur-xl animate-float [animation-delay:1.5s] dark:border-white/10 dark:bg-ink-800/90 sm:-right-6"
            >
              <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-500">
                <FiWifi className="h-5 w-5" />
                <span className="absolute inset-0 rounded-xl ring-2 ring-brand-500/40 animate-pulse-ring" />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold leading-none">500</p>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Mbps free Wi‑Fi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker / marquee */}
      <div className="relative border-y border-slate-200/70 bg-white/50 py-4 backdrop-blur dark:border-white/10 dark:bg-white/[0.02]">
        <div className="flex overflow-hidden mask-fade-x">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="container-px mt-6 hidden items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 lg:flex"
      >
        {t('hero.scroll')}
        <FiArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
