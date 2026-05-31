import { useTranslation } from 'react-i18next'
import { FiWifi, FiBatteryCharging, FiCoffee, FiHeadphones, FiClock } from 'react-icons/fi'
import { MdQrCodeScanner } from 'react-icons/md'

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

  return (
    <section id="features" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center reveal">
          <span className="chip">{t('features.chip')}</span>
          <h2 className="mt-5 section-title text-balance">{t('features.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              className="group card reveal relative overflow-hidden p-7 hover:-translate-y-1.5 hover:border-brand-500/40 hover:shadow-glow"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-500/5 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-deep/15 text-brand-600 ring-1 ring-brand-500/20 transition-transform duration-300 group-hover:-rotate-6 dark:text-brand-300">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-display text-xl font-bold">
                {t(`features.items.${key}.title`)}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t(`features.items.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
