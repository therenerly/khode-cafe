import { UIProvider, useUI } from './context/UIContext.jsx'
import { useReveal } from './hooks/useReveal.js'

import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Menu from './components/sections/Menu.jsx'
import Features from './components/sections/Features.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Contact from './components/sections/Contact.jsx'
import BackToTop from './components/ui/BackToTop.jsx'
import AuthModal from './components/auth/AuthModal.jsx'
import CartDrawer from './components/cart/CartDrawer.jsx'
import PaymentModal from './components/payment/PaymentModal.jsx'

function Shell() {
  const { authOpen, closeAuth, paymentOpen, closePayment } = useUI()
  useReveal()

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Features />
        <Gallery />
        <Contact />
      </main>
      <Footer />

      <BackToTop />
      <CartDrawer />
      <AuthModal open={authOpen} onClose={closeAuth} />
      <PaymentModal open={paymentOpen} onClose={closePayment} />
    </div>
  )
}

export default function App() {
  return (
    <UIProvider>
      <Shell />
    </UIProvider>
  )
}
