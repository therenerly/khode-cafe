import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [authOpen, setAuthOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)

  const openAuth = useCallback(() => setAuthOpen(true), [])
  const closeAuth = useCallback(() => setAuthOpen(false), [])
  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])
  const openPayment = useCallback(() => {
    setCartOpen(false)
    setPaymentOpen(true)
  }, [])
  const closePayment = useCallback(() => setPaymentOpen(false), [])

  return (
    <UIContext.Provider
      value={{
        authOpen,
        openAuth,
        closeAuth,
        cartOpen,
        openCart,
        closeCart,
        paymentOpen,
        openPayment,
        closePayment,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
