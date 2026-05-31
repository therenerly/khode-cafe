import { useTranslation } from 'react-i18next'

export default function Logo({ className = '', textClass = '', showText = true }) {
  const { t } = useTranslation()
  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="KHode Café — home"
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-deep/15 ring-1 ring-brand-500/20 transition-transform duration-300 group-hover:-rotate-6 sm:h-11 sm:w-11">
        <img
          src="/khode-logo.png"
          alt="KHode"
          className="h-7 w-7 object-contain sm:h-8 sm:w-8"
          width="32"
          height="32"
        />
      </span>
      {showText && (
        <span className={`flex flex-col leading-none ${textClass}`}>
          <span className="font-display text-lg font-extrabold tracking-tight">
            {t('brand.name')}
            <span className="text-brand-500">.</span>
            <span className="ml-1 font-bold text-slate-500 dark:text-slate-400">
              {t('brand.suffix')}
            </span>
          </span>
        </span>
      )}
    </a>
  )
}
