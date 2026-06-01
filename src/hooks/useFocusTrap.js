import { useEffect } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Traps Tab focus within `ref` while `active`, and restores focus to the
// previously-focused element on close. Respects a component's own initial
// focus (e.g. an autofocused input) — it only focuses the first element when
// focus isn't already inside the container.
export function useFocusTrap(ref, active) {
  useEffect(() => {
    const node = ref.current
    if (!active || !node) return

    const previouslyFocused = document.activeElement

    const getFocusable = () =>
      Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      )

    if (!node.contains(document.activeElement)) {
      getFocusable()[0]?.focus()
    }

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const items = getFocusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => {
      node.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus()
    }
  }, [ref, active])
}
