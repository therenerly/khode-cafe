import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { MENU } from '../../data/menu.js'
import { useCart } from '../../context/CartContext.jsx'
import { useUI } from '../../context/UIContext.jsx'

const byId = Object.fromEntries(MENU.map((m) => [m.id, m]))

export default function CartDrawer() {
  const { t } = useTranslation()
  const { cartOpen, closeCart, openPayment } = useUI()
  const { list, count, subtotal, tax, total, setQty, remove, clear } = useCart()

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [cartOpen, closeCart])

  const fmt = (n) => `${t('menu.currency')}${n.toFixed(2)}`

  return createPortal(
    <div
      className={`fixed inset-0 z-[90] ${cartOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!cartOpen}
    >
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('order.title')}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:bg-ink-800 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 p-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <FiShoppingBag className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-extrabold">{t('order.title')}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {count} {count === 1 ? t('order.item') : t('order.items')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t('common.close')}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {list.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-slate-100 text-slate-300 dark:bg-white/5">
                <FiShoppingBag className="h-9 w-9" />
              </span>
              <p className="mt-5 max-w-[15rem] text-sm font-medium text-slate-500 dark:text-slate-400">
                {t('order.empty')}
              </p>
              <button onClick={closeCart} className="btn-soft mt-5">
                {t('nav.menu')} <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {list.map((line) => {
                const product = byId[line.id]
                if (!product) return null
                return (
                  <li
                    key={line.id}
                    className="flex gap-3 rounded-2xl border border-slate-200/70 p-3 dark:border-white/10"
                  >
                    <img
                      src={product.image}
                      alt={t(`menu.items.${product.key}.name`)}
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate font-bold leading-tight">
                          {t(`menu.items.${product.key}.name`)}
                        </h3>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          aria-label={t('order.remove')}
                          className="shrink-0 text-slate-300 transition hover:text-rose-500"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-brand-600 dark:text-brand-300">
                        {fmt(product.price)}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/10">
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty - 1)}
                            aria-label="Decrease"
                            className="grid h-8 w-8 place-items-center rounded-full text-slate-600 transition hover:bg-brand-500/10 hover:text-brand-600 dark:text-slate-300"
                          >
                            <FiMinus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-extrabold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty + 1)}
                            aria-label="Increase"
                            className="grid h-8 w-8 place-items-center rounded-full text-slate-600 transition hover:bg-brand-500/10 hover:text-brand-600 dark:text-slate-300"
                          >
                            <FiPlus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-extrabold tabular-nums">
                          {fmt(product.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}

          {list.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400 transition hover:text-rose-500"
            >
              <FiTrash2 className="h-3.5 w-3.5" /> {t('order.clear')}
            </button>
          )}
        </div>

        {/* Summary */}
        {list.length > 0 && (
          <div className="border-t border-slate-200/70 p-5 dark:border-white/10">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t('order.subtotal')}</span>
                <span className="font-semibold tabular-nums">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>{t('order.tax')}</span>
                <span className="font-semibold tabular-nums">{fmt(tax)}</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 dark:border-white/10">
                <span className="font-display text-lg font-extrabold">{t('order.total')}</span>
                <span className="font-display text-lg font-extrabold gradient-text tabular-nums">
                  {fmt(total)}
                </span>
              </div>
            </div>
            <button onClick={openPayment} className="btn-primary mt-4 w-full">
              {t('order.checkout')} <FiArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
              <img src="/aba-pay.svg" alt="ABA PayWay" className="h-5" />
              <span>· {t('payment.poweredBy')}</span>
            </div>
          </div>
        )}
      </aside>
    </div>,
    document.body
  )
}
