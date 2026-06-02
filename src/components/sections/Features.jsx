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
    <section id="features" className="relative scroll-mt-24 border-y border-ink-900/10 bg-paper-100/50 py-24 dark:border-white/10 dark:bg-white/[0.015] sm:py-32">
      <div className="container-px">
        <SectionHeading
          chip={t('features.chip')}
          title={t('features.title')}
          subtitle={t('features.subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Highlighted lead feature — elegant near-black */}
          <article className="reveal relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink-900 p-8 text-paper-100 dark:bg-white/[0.06] sm:col-span-2 lg:row-span-2">
            <div>
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <hero.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium sm:text-3xl">
                {t(`features.items.${hero.key}.title`)}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper-100/70 sm:text-base">
                {t(`features.items.${hero.key}.desc`)}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-paper-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t('hero.wifiValue')} {t('hero.wifiUnit')}
            </div>
          </article>

          {rest.map(({ key, icon: Icon }, i) => (
            <article
              key={key}
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              className="group card reveal relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <FiArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-ink-900/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-deep dark:text-white/20" />
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-900/[0.04] text-deep ring-1 ring-ink-900/5 dark:bg-white/5 dark:text-brand-300 dark:ring-white/10">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium">
                {t(`features.items.${key}.title`)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-900/65 dark:text-paper-100/60">
                {t(`features.items.${key}.desc`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
