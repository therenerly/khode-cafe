import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import { useFocusTrap } from '../../hooks/useFocusTrap.js'

export default function Modal({ open, onClose, children, labelledBy, maxWidth = 'max-w-md' }) {
  const { t } = useTranslation()
  const panelRef = useRef(null)

  useScrollLock(open)
  useFocusTrap(panelRef, open)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
    >
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={`relative w-full ${maxWidth} max-h-[92vh] overflow-y-auto rounded-t-3xl border border-white/10 bg-white shadow-2xl animate-fade-up sm:rounded-3xl dark:bg-ink-800`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('common.close')}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-ink-900 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <FiX className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
