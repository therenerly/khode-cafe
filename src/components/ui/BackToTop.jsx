import { FiArrowUp } from 'react-icons/fi'
import { useScrolled } from '../../hooks/useScrolled.js'

export default function BackToTop() {
  const show = useScrolled(600)

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink-900 text-paper-50 shadow-card transition-all duration-300 hover:-translate-y-0.5 dark:bg-paper-50 dark:text-ink-900 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  )
}
