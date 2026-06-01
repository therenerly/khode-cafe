import { useTranslation } from 'react-i18next'
import { FiWifi, FiBatteryCharging, FiCoffee, FiHeadphones, FiClock, FiArrowUpRight } from 'react-icons/fi'
import { MdQrCodeScanner } from 'react-icons/md'
import SectionHeading from '../ui/SectionHeading.jsx'

const FEATURES = [
  { key: 'wifi', icon: FiWifi },
  { key: 'power', icon: FiBatteryCharging },
  { key: 'roast', icon: FiCoffee },
  { key: 'quiet', icon: FiHeadphones },
  { key: 'pay', icon: MdQrCodeScanner },
  { key: 'open', icon: FiClock },
]

export default function Features() {
  const { t } = useTranslation()
  const [hero, ...rest] = FEATURES

  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Section background rhythm */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slate-50/60 dark:bg-white/[0.015]" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          chip={t('features.chip')}
          title={t('features.title')}
          subtitle={t('features.subtitle')}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Highlighted hero feature spans two columns on large screens */}
          <article className="group card reveal relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-deep to-brand-700 p-8 text-white sm:col-span-2 sm:row-span-1 lg:row-span-2 lg:flex-col">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
            <div className="relative">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                <hero.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold sm:text-3xl">
                {t(`features.items.${hero.key}.title`)}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base">
                {t(`features.items.${hero.key}.desc`)}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              {t('hero.wifiValue')} {t('hero.wifiUnit')}
            </div>
          </article>

          {rest.map(({ key, icon: Icon }, i) => (
            <article
              key={key}
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              className="group card reveal relative overflow-hidden p-6 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-glow"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/5 transition-transform duration-500 group-hover:scale-150" />
              <FiArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500 dark:text-white/20" />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-deep/15 text-brand-600 ring-1 ring-brand-500/20 transition-transform duration-300 group-hover:-rotate-6 dark:text-brand-300">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-bold">
                {t(`features.items.${key}.title`)}
              </h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t(`features.items.${key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
