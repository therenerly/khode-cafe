import { useTranslation } from 'react-i18next'
import { FiCoffee, FiZap, FiMapPin } from 'react-icons/fi'

export default function About() {
  const { t } = useTranslation()

  const points = [
    { icon: FiCoffee, title: t('about.point1Title'), body: t('about.point1Body') },
    { icon: FiZap, title: t('about.point2Title'), body: t('about.point2Body') },
    { icon: FiMapPin, title: t('about.point3Title'), body: t('about.point3Body') },
  ]

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Image collage */}
        <div className="relative reveal">
          <div className="grid grid-cols-5 grid-rows-6 gap-4">
            <div className="col-span-3 row-span-6 overflow-hidden rounded-3xl shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80"
                alt="Coffee being brewed"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80"
                alt="Café interior"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-3xl shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80"
                alt="Latte art"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Since badge */}
          <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 px-5 py-3 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-ink-800/90">
            <span className="font-display text-3xl font-black gradient-text">2021</span>
            <span className="text-xs font-semibold uppercase leading-tight tracking-wide text-slate-500 dark:text-slate-400">
              {t('about.since')}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="reveal">
          <span className="chip">{t('about.chip')}</span>
          <h2 className="mt-5 section-title text-balance">{t('about.title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('about.body')}
          </p>

          <div className="mt-8 space-y-5">
            {points.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-deep/15 text-brand-600 ring-1 ring-brand-500/20 dark:text-brand-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
