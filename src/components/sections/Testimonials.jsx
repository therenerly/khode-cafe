import { useTranslation } from 'react-i18next'
import { FiStar } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading.jsx'

const PEOPLE = [{ key: 'sophea' }, { key: 'marco' }, { key: 'dara' }]

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
      <div className="container-px">
        <SectionHeading
          chip={t('testimonials.chip')}
          title={t('testimonials.title')}
          subtitle={t('testimonials.subtitle')}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PEOPLE.map(({ key }, i) => {
            const name = t(`testimonials.items.${key}.name`)
            const initial = [...name][0]
            return (
              <figure
                key={key}
                style={{ transitionDelay: `${i * 90}ms` }}
                className={`card reveal relative flex flex-col p-7 ${
                  i === 1 ? 'md:-translate-y-3 md:shadow-card' : ''
                }`}
              >
                <span className="absolute right-7 top-6 font-display text-5xl leading-none text-ink-900/10 dark:text-white/10">
                  ”
                </span>
                <Stars />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-900/80 dark:text-paper-100/80">
                  {t(`testimonials.items.${key}.quote`)}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-900/10 pt-5 dark:border-white/10">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink-900 font-display text-lg font-medium text-paper-50 dark:bg-paper-50 dark:text-ink-900">
                    {initial}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display font-medium leading-tight">{name}</span>
                    <span className="block truncate text-sm text-ink-900/55 dark:text-paper-100/55">
                      {t(`testimonials.items.${key}.role`)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-ink-900/55 reveal dark:text-paper-100/55">
          <FiStar className="h-4 w-4 fill-current text-coffee-500" />
          {t('testimonials.rating')}
        </p>
      </div>
    </section>
  )
}
