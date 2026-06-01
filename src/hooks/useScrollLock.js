import { useEffect } from 'react'

// Counter-based body scroll lock. Multiple overlapping consumers (e.g. the
// cart drawer handing off to the payment modal) won't prematurely restore
// scrolling or leave the page permanently locked.
let lockCount = 0
let savedOverflow = ''
let savedPaddingRight = ''

export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return

    if (lockCount === 0) {
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth
      savedOverflow = document.body.style.overflow
      savedPaddingRight = document.body.style.paddingRight
      document.body.style.overflow = 'hidden'
      // Compensate for the disappearing scrollbar to avoid layout shift.
      if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`
    }
    lockCount += 1

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow
        document.body.style.paddingRight = savedPaddingRight
      }
    }
  }, [active])
}
