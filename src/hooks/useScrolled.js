import { useEffect, useState } from 'react'

// Returns true once the page is scrolled past `threshold` pixels.
// Shared by the navbar (condense on scroll) and the back-to-top button.
export function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(
    typeof window !== 'undefined' && window.scrollY > threshold
  )

  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > threshold)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
