import { useTranslation } from 'react-i18next'
import { GALLERY } from '../../data/menu.js'

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <section id="gallery" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center reveal">
          <span className="chip">{t('gallery.chip')}</span>
          <h2 className="mt-5 section-title text-balance">{t('gallery.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {GALLERY.map((src, i) => (
            <div
              key={src}
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              className={`group relative overflow-hidden rounded-3xl shadow-soft reveal ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              } ${i === 3 ? 'lg:row-span-2' : ''}`}
            >
              <img
                src={src}
                alt={`KHode Café ambience ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
