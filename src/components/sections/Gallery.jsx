import { useTranslation } from 'react-i18next'
import { FiMapPin, FiInstagram } from 'react-icons/fi'
import { GALLERY } from '../../data/menu.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const CAPTIONS = ['Pour-over bar', 'Window seats', 'Roast corner', 'Quiet zone', 'Morning light', 'Community table']

export default function Gallery() {
  const { t } = useTranslation()

  return (
    <section id="gallery" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="container-px">
        <SectionHeading
          chip={t('gallery.chip')}
          title={t('gallery.title')}
          subtitle={t('gallery.subtitle')}
        />

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {GALLERY.map((src, i) => (
            <figure
              key={src}
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              className={`group relative overflow-hidden rounded-3xl shadow-soft reveal ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              } ${i === 3 ? 'lg:row-span-2' : ''}`}
            >
              <img
                src={src}
                alt={`KHode Café — ${CAPTIONS[i] || 'ambience'}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-1.5 p-4 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <FiMapPin className="h-3.5 w-3.5 text-brand-300" />
                {CAPTIONS[i] || 'KHode Café'}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Social CTA */}
        <div className="mt-10 flex justify-center reveal">
          <a
            href="#"
            className="btn-ghost group"
            aria-label="Follow KHode Café on Instagram"
          >
            <FiInstagram className="h-4 w-4 transition-transform group-hover:scale-110" />
            @khode.cafe
          </a>
        </div>
      </div>
    </section>
  )
}
