import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiCheck } from 'react-icons/fi'
import { MENU, MENU_CATEGORIES } from '../../data/menu.js'
import { useCart } from '../../context/CartContext.jsx'
import { useReveal } from '../../hooks/useReveal.js'

function MenuCard({ product }) {
  const { t } = useTranslation()
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    add(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className="group card reveal overflow-hidden hover:-translate-y-1.5 hover:shadow-glow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={t(`menu.items.${product.key}.name`)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {product.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-coffee-500/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg backdrop-blur">
            {t('menu.popular')}
          </span>
        )}
      </div>

      <div className="flex flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-tight">
            {t(`menu.items.${product.key}.name`)}
          </h3>
          <span className="shrink-0 font-display text-lg font-extrabold text-brand-600 dark:text-brand-300">
            {t('menu.currency')}
            {product.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {t(`menu.items.${product.key}.desc`)}
        </p>

        <button
          type="button"
          onClick={handleAdd}
          className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
            added
              ? 'bg-emerald-500 text-white'
              : 'bg-brand-500/10 text-deep hover:bg-brand-500 hover:text-white dark:text-brand-200 dark:hover:text-white'
          }`}
        >
          {added ? (
            <>
              <FiCheck className="h-4 w-4" /> {t('menu.added')}
            </>
          ) : (
            <>
              <FiPlus className="h-4 w-4" /> {t('menu.addToOrder')}
            </>
          )}
        </button>
      </div>
    </article>
  )
}

export default function Menu() {
  const { t } = useTranslation()
  const [active, setActive] = useState('all')

  const filtered = useMemo(
    () => (active === 'all' ? MENU : MENU.filter((m) => m.category === active)),
    [active]
  )

  // Re-run reveal observer whenever the visible set changes.
  useReveal([active])

  const tabs = ['all', ...MENU_CATEGORIES]

  return (
    <section id="menu" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center reveal">
          <span className="chip">{t('menu.chip')}</span>
          <h2 className="mt-5 section-title text-balance">{t('menu.title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 reveal">
          {tabs.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-deep text-white shadow-glow'
                    : 'border border-slate-200/80 bg-white/60 text-slate-600 hover:border-brand-500/40 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                {cat === 'all'
                  ? t('nav.menu')
                  : t(`menu.categories.${cat}`)}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <MenuCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
