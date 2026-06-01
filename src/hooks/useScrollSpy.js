import { useEffect, useState } from 'react'

// Tracks which section is currently in view so the navbar can highlight the
// active link. Uses a thin horizontal band near the top-third of the viewport
// so the "active" section matches what the user is actually reading.
export function useScrollSpy(ids = []) {
  const [activeId, setActiveId] = useState(ids[0] || null)

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.5, 1] }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // ids is a stable literal array from the caller; join keeps the dep cheap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')])

  return activeId
}
