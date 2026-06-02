import { useTranslation } from 'react-i18next'
import { FiArrowRight, FiArrowDown, FiWifi, FiStar, FiCoffee } from 'react-icons/fi'
import { MdQrCodeScanner } from 'react-icons/md'
import { useUI } from '../../context/UIContext.jsx'

export default function Hero() {
  const { t } = useTranslation()
  const { openCart } = useUI()
  const ticker = t('hero.ticker', { returnObjects: true })
  const tickerItems = Array.isArray(ticker) ? ticker : []

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="container-px grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        {/* Copy */}
        <div className="lg:col-span-6">
          <span className="chip animate-fade-up">
            <span className="h-px w-6 bg-deep/50" />
            {t('hero.badge')}
          </span>

          <h1 className="mt-6 font-display text-[2.6rem] font-normal leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4.2rem]">
            <span className="animate-fade-up [animation-delay:80ms]">{t('hero.title')}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-900/70 animate-fade-up [animation-delay:160ms] dark:text-paper-100/65 sm:text-lg">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-col gap-3 animate-fade-up [animation-delay:240ms] sm:flex-row sm:items-center">
            <button type="button" onClick={openCart} className="btn-primary group">
              <MdQrCodeScanner className="h-4 w-4" />
              {t('hero.ctaPrimary')}
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#menu" className="btn-ghost group">
              <FiCoffee className="h-4 w-4" />
              {t('hero.ctaSecondary')}
            </a>
          </div>

          {/* Stats */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 animate-fade-up [animation-delay:320ms]">
            {[
              ['24+', t('hero.stat1')],
              ['90s', t('hero.stat2')],
              ['7–11', t('hero.stat3')],
            ].map(([value, label]) => (
              <div key={label} className="border-l border-ink-900/15 pl-4 dark:border-white/15">
                <dt className="font-display text-2xl font-medium text-ink-900 dark:text-paper-100 sm:text-3xl">
                  {value}
                </dt>
                <dd className="mt-1.5 text-xs font-medium uppercase tracking-wider text-ink-900/50 dark:text-paper-100/50">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-md animate-fade-up [animation-delay:200ms] lg:max-w-none">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink-900/10 shadow-soft dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1100&q=80"
                alt="Barista pouring latte art at KHode Café"
                className="h-[420px] w-full object-cover sm:h-[520px]"
                width="1100"
                height="520"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
            </div>

            {/* Floating rating card */}
            <div className="absolute -left-3 top-8 flex items-center gap-3 rounded-xl border border-ink-900/10 bg-white/95 p-3 shadow-card backdrop-blur animate-float dark:border-white/10 dark:bg-ink-800/95 sm:-left-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900/[0.04] text-coffee-500 dark:bg-white/5">
                <FiStar className="h-5 w-5 fill-current" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-none">4.9</p>
                <p className="text-[11px] font-medium text-ink-900/50 dark:text-paper-100/50">
                  {t('hero.reviews')}
                </p>
              </div>
            </div>

            {/* Floating wifi card */}
            <div className="absolute -right-3 bottom-10 flex items-center gap-3 rounded-xl border border-ink-900/10 bg-white/95 p-3 shadow-card backdrop-blur animate-float [animation-delay:1.5s] dark:border-white/10 dark:bg-ink-800/95 sm:-right-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-900/[0.04] text-deep dark:bg-white/5 dark:text-brand-300">
                <FiWifi className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-none">{t('hero.wifiValue')}</p>
                <p className="text-[11px] font-medium text-ink-900/50 dark:text-paper-100/50">
                  {t('hero.wifiUnit')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker / marquee */}
      <div className="relative border-y border-ink-900/10 py-4 dark:border-white/10">
        <div className="flex overflow-hidden mask-fade-x">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap text-xs font-medium uppercase tracking-[0.2em] text-ink-900/45 dark:text-paper-100/45"
              >
                <span className="h-1 w-1 rounded-full bg-deep/50" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="container-px mt-6 hidden items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-ink-900/40 dark:text-paper-100/40 lg:flex"
      >
        {t('hero.scroll')}
        <FiArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
