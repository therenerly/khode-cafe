import { useTranslation } from 'react-i18next'
import { FiArrowRight } from 'react-icons/fi'
import { MdQrCodeScanner } from 'react-icons/md'
import { useUI } from '../../context/UIContext.jsx'

export default function CtaBand() {
  const { t } = useTranslation()
  const { openCart } = useUI()

  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-deep via-brand-700 to-brand-600 px-6 py-12 text-white shadow-soft reveal sm:px-12 sm:py-16">
          {/* Texture + glow */}
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />

          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
                <MdQrCodeScanner className="h-3.5 w-3.5" />
                {t('cta.chip')}
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {t('cta.title')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                {t('cta.subtitle')}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={openCart}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-deep shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <MdQrCodeScanner className="h-4 w-4" />
                {t('cta.button')}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {t('cta.secondary')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
