import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiMenu,
  FiX,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiHome,
  FiInfo,
  FiCoffee,
  FiZap,
  FiImage,
  FiMapPin,
} from 'react-icons/fi'
import Logo from '../ui/Logo.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import LanguageToggle from '../ui/LanguageToggle.jsx'
import { useUI } from '../../context/UIContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useScrolled } from '../../hooks/useScrolled.js'
import { useScrollLock } from '../../hooks/useScrollLock.js'
import { useScrollSpy } from '../../hooks/useScrollSpy.js'

const LINKS = [
  ['home', '#home', FiHome],
  ['about', '#about', FiInfo],
  ['menu', '#menu', FiCoffee],
  ['features', '#features', FiZap],
  ['gallery', '#gallery', FiImage],
  ['contact', '#contact', FiMapPin],
]

const SECTION_IDS = LINKS.map(([key]) => key)

export default function Navbar() {
  const { t } = useTranslation()
  const { openAuth, openCart } = useUI()
  const { count } = useCart()
  const { isAuthed, user, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(16)
  const activeId = useScrollSpy(SECTION_IDS)

  useScrollLock(open)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-ink-900/10 bg-paper-50/85 backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/85'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-px flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map(([key, href, Icon]) => {
              const isActive = activeId === key
              return (
                <li key={key}>
                  <a
                    href={href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-ink-900/[0.06] text-ink-900 dark:bg-white/10 dark:text-paper-100'
                        : 'text-ink-900/65 hover:bg-ink-900/[0.04] hover:text-ink-900 dark:text-paper-100/65 dark:hover:text-paper-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t(`nav.${key}`)}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            <ThemeToggle className="hidden sm:grid" />

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              aria-label={t('nav.order')}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-ink-900/12 bg-white/80 text-ink-900/70 transition-colors hover:border-ink-900/30 hover:text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-brand-200"
            >
              <FiShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-ink-900 px-1 text-[11px] font-bold text-paper-50 dark:bg-paper-50 dark:text-ink-900">
                  {count}
                </span>
              )}
            </button>

            {/* Auth (desktop) */}
            {isAuthed ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="hidden items-center gap-2 rounded-full border border-ink-900/12 bg-ink-900/[0.04] px-3 py-2 text-sm font-semibold text-ink-900/75 dark:border-white/10 dark:bg-white/5 dark:text-paper-100/75 md:inline-flex">
                  <FiUser className="h-4 w-4" /> {user.phone}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  aria-label={t('auth.signOut')}
                  title={t('auth.signOut')}
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/12 bg-white/80 text-ink-900/50 transition hover:text-rose-500 dark:border-white/10 dark:bg-white/5"
                >
                  <FiLogOut className="h-[18px] w-[18px]" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={openAuth}
                className="btn-primary hidden h-10 px-5 py-0 sm:inline-flex"
              >
                <FiUser className="h-4 w-4" />
                {t('nav.signIn')}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/12 bg-white/80 text-ink-900/70 dark:border-white/10 dark:bg-white/5 dark:text-brand-200 lg:hidden"
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-16 z-40 origin-top bg-paper-50/95 backdrop-blur-xl transition-all duration-300 dark:bg-ink-900/95 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-px flex h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto py-6">
          {LINKS.map(([key, href, Icon], i) => (
            <a
              key={key}
              href={href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-4 font-display text-lg font-medium text-ink-900/80 transition-all hover:bg-ink-900/[0.04] hover:text-ink-900 dark:text-paper-100/80 dark:hover:text-paper-100 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink-900/[0.05] text-deep dark:bg-white/5 dark:text-brand-300">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              {t(`nav.${key}`)}
            </a>
          ))}

          <div className="mt-4 flex items-center gap-3">
            <LanguageToggle align="left" drop="up" />
            <ThemeToggle />
          </div>

          <div className="mt-4">
            {isAuthed ? (
              <button
                type="button"
                onClick={() => {
                  signOut()
                  setOpen(false)
                }}
                className="btn-ghost w-full"
              >
                <FiLogOut className="h-4 w-4" /> {t('auth.signOut')} · {user.phone}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  openAuth()
                  setOpen(false)
                }}
                className="btn-primary w-full"
              >
                <FiUser className="h-4 w-4" /> {t('nav.signIn')}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
