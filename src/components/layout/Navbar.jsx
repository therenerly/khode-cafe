import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiMenu, FiX, FiShoppingBag, FiUser, FiLogOut } from 'react-icons/fi'
import Logo from '../ui/Logo.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import LanguageToggle from '../ui/LanguageToggle.jsx'
import { useUI } from '../../context/UIContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const LINKS = [
  ['home', '#home'],
  ['about', '#about'],
  ['menu', '#menu'],
  ['features', '#features'],
  ['gallery', '#gallery'],
  ['contact', '#contact'],
]

export default function Navbar() {
  const { t } = useTranslation()
  const { openAuth, openCart } = useUI()
  const { count } = useCart()
  const { isAuthed, user, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink-900/80'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-px flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map(([key, href]) => (
              <li key={key}>
                <a
                  href={href}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-brand-500/10 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
                >
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
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
              className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200/80 bg-white/70 text-deep transition-colors hover:border-brand-500/50 hover:text-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-brand-200"
            >
              <FiShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-r from-brand-500 to-deep px-1 text-[11px] font-extrabold text-white shadow-glow">
                  {count}
                </span>
              )}
            </button>

            {/* Auth (desktop) */}
            {isAuthed ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="hidden items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-2 text-sm font-bold text-brand-700 dark:text-brand-300 md:inline-flex">
                  <FiUser className="h-4 w-4" /> {user.phone}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  aria-label={t('auth.signOut')}
                  title={t('auth.signOut')}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200/80 bg-white/70 text-slate-500 transition hover:text-rose-500 dark:border-white/10 dark:bg-white/5"
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
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200/80 bg-white/70 text-deep dark:border-white/10 dark:bg-white/5 dark:text-brand-200 lg:hidden"
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 top-16 z-40 origin-top bg-white/95 backdrop-blur-xl transition-all duration-300 dark:bg-ink-900/95 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="container-px flex h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto py-6">
          {LINKS.map(([key, href], i) => (
            <a
              key={key}
              href={href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={`rounded-2xl px-4 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-brand-500/10 hover:text-brand-600 dark:text-slate-200 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
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
