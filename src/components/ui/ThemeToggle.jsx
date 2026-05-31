import { FiMoon, FiSun } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.light') : t('theme.dark')}
      title={isDark ? t('theme.light') : t('theme.dark')}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-slate-200/80 bg-white/70 text-deep transition-colors hover:border-brand-500/50 hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-brand-200 ${className}`}
    >
      <FiSun
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          isDark ? 'translate-y-0 rotate-0 opacity-100' : 'translate-y-6 -rotate-90 opacity-0'
        }`}
      />
      <FiMoon
        className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
          isDark ? '-translate-y-6 rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'
        }`}
      />
    </button>
  )
}
