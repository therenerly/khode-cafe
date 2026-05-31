import { useMemo } from 'react'

// A stylized, deterministic QR-style matrix for the KHQR payment demo.
// Not a scannable code — it renders a convincing, on-brand visual seeded
// from the order reference so it changes per transaction.
function seededRand(seed) {
  let s = 0
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 0xffffffff
  }
}

const SIZE = 25 // modules per side

function isFinderZone(r, c) {
  const inBox = (r0, c0) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7
  return inBox(0, 0) || inBox(0, SIZE - 7) || inBox(SIZE - 7, 0)
}

export default function KhqrCode({ seed = 'KHODE', className = '' }) {
  const cells = useMemo(() => {
    const rand = seededRand(seed)
    const out = []
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (isFinderZone(r, c)) continue
        if (rand() > 0.52) out.push([r, c])
      }
    }
    return out
  }, [seed])

  const finder = (x, y) => (
    <g key={`f-${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.6" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="1" fill="white" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" fill="currentColor" />
    </g>
  )

  return (
    <svg
      viewBox={`-1 -1 ${SIZE + 2} ${SIZE + 2}`}
      className={className}
      role="img"
      aria-label="KHQR payment code"
    >
      <rect x="-1" y="-1" width={SIZE + 2} height={SIZE + 2} fill="white" rx="2" />
      <g className="text-deep">
        {cells.map(([r, c]) => (
          <rect
            key={`${r}-${c}`}
            x={c}
            y={r}
            width="1"
            height="1"
            rx="0.28"
            fill="currentColor"
          />
        ))}
        {finder(0, 0)}
        {finder(SIZE - 7, 0)}
        {finder(0, SIZE - 7)}
      </g>
      {/* Center emblem */}
      <g>
        <rect
          x={SIZE / 2 - 3}
          y={SIZE / 2 - 3}
          width="6"
          height="6"
          rx="1.4"
          fill="white"
        />
        <rect
          x={SIZE / 2 - 2.4}
          y={SIZE / 2 - 2.4}
          width="4.8"
          height="4.8"
          rx="1.1"
          className="text-brand-500"
          fill="currentColor"
        />
        <text
          x={SIZE / 2}
          y={SIZE / 2 + 0.9}
          textAnchor="middle"
          fontSize="2.6"
          fontWeight="900"
          fill="white"
          fontFamily="Urbanist, sans-serif"
        >
          K
        </text>
      </g>
    </svg>
  )
}
