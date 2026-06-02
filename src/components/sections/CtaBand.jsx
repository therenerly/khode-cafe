import { useTranslation } from 'react-i18next'
import { FiArrowRight } from 'react-icons/fi'
import { MdQrCodeScanner } from 'react-icons/md'
import { useUI } from '../../context/UIContext.jsx'

export default function CtaBand() {
  const { t } = useTranslation()
  const { openCart } = useUI()

  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-14 text-paper-100 reveal dark:bg-white/[0.05] sm:px-12 sm:py-16">
          <div className="flex flex-col items-center gap-9 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-paper-100/60">
                <span className="h-px w-6 bg-paper-100/40" />
                {t('cta.chip')}
              </span>
              <h2 className="mt-5 font-display text-3xl font-normal tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
                {t('cta.title')}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-paper-100/70 sm:text-lg">
                {t('cta.subtitle')}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={openCart}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper-50 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-300 hover:-translate-y-0.5"
              >
                <MdQrCodeScanner className="h-4 w-4" />
                {t('cta.button')}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-paper-100/25 px-7 py-3.5 text-sm font-semibold text-paper-100 transition-colors hover:border-paper-100/60"
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
