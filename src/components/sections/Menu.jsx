import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiPlus, FiCheck, FiStar, FiGrid, FiCoffee, FiDroplet } from 'react-icons/fi'
import { MdOutlineRestaurant } from 'react-icons/md'
import { MENU, MENU_CATEGORIES } from '../../data/menu.js'
import { useCart } from '../../context/CartContext.jsx'
import { useReveal } from '../../hooks/useReveal.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const CATEGORY_ICONS = {
  all: FiGrid,
  coffee: FiCoffee,
  noncoffee: FiDroplet,
  food: MdOutlineRestaurant,
}

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
    <article className="group card reveal flex flex-col overflow-hidden ring-1 ring-transparent transition-all hover:-translate-y-1.5 hover:shadow-glow hover:ring-brand-500/30">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={t(`menu.items.${product.key}.name`)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/0 to-transparent" />
        {product.popular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-coffee-500/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg backdrop-blur">
            <FiStar className="h-3 w-3 fill-current" />
            {t('menu.popular')}
          </span>
        )}
        {/* Price pill overlaps the image bottom edge */}
        <span className="absolute -bottom-4 right-4 grid h-12 min-w-12 place-items-center rounded-2xl bg-white px-3 font-display text-lg font-extrabold text-deep shadow-soft ring-1 ring-black/5 dark:bg-ink-700 dark:text-brand-200">
          {t('menu.currency')}
          {product.price.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-6">
        <h3 className="pr-14 font-display text-lg font-bold leading-tight">
          {t(`menu.items.${product.key}.name`)}
        </h3>
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
        <SectionHeading
          chip={t('menu.chip')}
          title={t('menu.title')}
          subtitle={t('menu.subtitle')}
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 reveal">
          {tabs.map((cat) => {
            const isActive = active === cat
            const Icon = CATEGORY_ICONS[cat] || FiGrid
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-deep text-white shadow-glow'
                    : 'border border-slate-200/80 bg-white/60 text-slate-600 hover:border-brand-500/40 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat === 'all' ? t('nav.menu') : t(`menu.categories.${cat}`)}
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
