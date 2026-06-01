// Unified, centered section header used across Menu, Features and Gallery so
// every section opens with the same rhythm: flanked eyebrow → title → subtitle.
export default function SectionHeading({ chip, title, subtitle, className = '' }) {
  return (
    <div className={`mx-auto max-w-2xl text-center reveal ${className}`}>
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-500/60 sm:w-12" />
        <span className="chip">{chip}</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-500/60 sm:w-12" />
      </div>
      <h2 className="mt-5 section-title text-balance">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
