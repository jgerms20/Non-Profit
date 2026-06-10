import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 to `end` when scrolled into view.
// Accepts prefix/suffix for things like "500+" or "$1M".
export default function CountUp({ end, suffix = '', prefix = '', duration = 1600, className = '' }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        io.disconnect()

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) {
          setValue(end)
          return
        }

        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(end * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}
