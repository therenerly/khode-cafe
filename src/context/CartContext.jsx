import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'khode-cart'
const TAX_RATE = 0.1

export function CartProvider({ children }) {
  const [items, setItems] = useState({}) // { id: { id, price, qty } }
  const hydrated = useRef(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      /* ignore corrupt storage */
    } finally {
      hydrated.current = true
    }
  }, [])

  useEffect(() => {
    // Don't persist the initial empty state before hydration completes —
    // that would clobber a stored cart (and stomp on other open tabs).
    if (!hydrated.current) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const add = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev[product.id]
      return {
        ...prev,
        [product.id]: {
          id: product.id,
          price: product.price,
          qty: (existing?.qty || 0) + qty,
        },
      }
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) => {
      if (qty <= 0) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: { ...prev[id], qty } }
    })
  }, [])

  const remove = useCallback((id) => {
    setItems((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const clear = useCallback(() => setItems({}), [])

  const list = useMemo(() => Object.values(items), [items])
  const count = useMemo(() => list.reduce((s, i) => s + i.qty, 0), [list])
  const subtotal = useMemo(
    () => list.reduce((s, i) => s + i.price * i.qty, 0),
    [list]
  )
  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal])
  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  const value = {
    items,
    list,
    count,
    subtotal,
    tax,
    total,
    taxRate: TAX_RATE,
    add,
    setQty,
    remove,
    clear,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
