import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheck, FiChevronDown } from 'react-icons/fi'
import { LANGS } from '../../i18n'

export default function LanguageToggle({ className = '', align = 'right', drop = 'down' }) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Position the dropdown so it never runs off-screen. In the navbar the
  // toggle sits on the right (align right, opens down); in the mobile drawer
  // it sits on the left near the bottom (align left, opens up).
  // NOTE: full literal class names so Tailwind's scanner picks them up.
  const posX = align === 'left' ? 'left-0' : 'right-0'
  const posY = drop === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'
  const origin =
    drop === 'up'
      ? align === 'left'
        ? 'origin-bottom-left'
        : 'origin-bottom-right'
      : align === 'left'
        ? 'origin-top-left'
        : 'origin-top-right'

  const current = (i18n.language || 'en').split('-')[0]
  const active = LANGS[current] ? current : 'en'

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const choose = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('lang.switch')}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 text-deep transition-colors hover:border-brand-500/50 dark:border-white/10 dark:bg-white/5 dark:text-brand-200"
      >
        <img
          src={LANGS[active].flag}
          alt=""
          className="h-4 w-6 rounded-[3px] object-cover ring-1 ring-black/5"
        />
        <span className="text-sm font-bold uppercase">{active}</span>
        <FiChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        role="listbox"
        className={`absolute z-50 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-soft transition-all duration-200 dark:border-white/10 dark:bg-ink-800 ${posX} ${posY} ${origin} ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        {Object.entries(LANGS).map(([code, meta]) => (
          <button
            key={code}
            role="option"
            aria-selected={active === code}
            onClick={() => choose(code)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-brand-500/10 ${
              active === code ? 'text-brand-600 dark:text-brand-300' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <img
              src={meta.flag}
              alt=""
              className="h-4 w-6 rounded-[3px] object-cover ring-1 ring-black/5"
            />
            <span className="flex-1">{meta.native}</span>
            {active === code && <FiCheck className="h-4 w-4" />}
          </button>
        ))}
      </div>
    </div>
  )
}
