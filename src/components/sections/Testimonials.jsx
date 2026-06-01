import { useTranslation } from 'react-i18next'
import { FiStar } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading.jsx'

const PEOPLE = [
  { key: 'sophea', accent: 'from-brand-500 to-deep' },
  { key: 'marco', accent: 'from-coffee-400 to-coffee-600' },
  { key: 'dara', accent: 'from-deep to-brand-600' },
]

function Stars() {
  return (
    <div className="flex gap-0.5 text-coffee-500" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()

  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-slate-50/60 dark:bg-white/[0.015]" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full bg-coffee-400/10 blur-[120px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          chip={t('testimonials.chip')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PEOPLE.map(({ key, accent }, i) => {
            const name = t(`testimonials.items.${key}.name`)
            const initial = [...name][0]
            return (
              <figure
                key={key}
                style={{ transitionDelay: `${i * 90}ms` }}
                className={`card reveal relative flex flex-col p-7 ${
                  i === 1 ? 'md:-translate-y-4 md:shadow-glow' : ''
                }`}
              >
                <HiOutlineSparkles className="absolute right-6 top-6 h-6 w-6 text-brand-500/20" />
                <Stars />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700 dark:text-slate-200">
                  “{t(`testimonials.items.${key}.quote`)}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-200/70 pt-5 dark:border-white/10">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${accent} font-display text-lg font-extrabold text-white`}
                  >
                    {initial}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display font-bold leading-tight">
                      {name}
                    </span>
                    <span className="block truncate text-sm text-slate-500 dark:text-slate-400">
                      {t(`testimonials.items.${key}.role`)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 reveal dark:text-slate-400">
          <FiStar className="h-4 w-4 fill-current text-coffee-500" />
          {t('testimonials.rating')}
        </p>
      </div>
    </section>
  )
}
