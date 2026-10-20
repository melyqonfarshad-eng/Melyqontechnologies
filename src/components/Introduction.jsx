import { useEffect, useRef, useState } from 'react'

// TODO: edit to match your real company story
const statement =
  'Melyqon is an independent digital studio. We blend software engineering, thoughtful design and emerging technology to turn ambitious ideas into products people love.'

const pillars = [
  {
    no: '01',
    title: 'Our Mission',
    text: 'To build reliable, beautiful software that helps businesses move faster and grow with confidence.',
  },
  {
    no: '02',
    title: 'Our Vision',
    text: 'A future where every company, big or small, has access to world-class digital products.',
  },
  {
    no: '03',
    title: 'Our Approach',
    text: 'Small senior team, clear communication, honest timelines. Quality first, always.',
  },
]

const words = statement.split(' ')

const Introduction = () => {
  const textRef = useRef(null)
  const litRef = useRef(0)
  const [lit, setLit] = useState(0)

  // Light up words as the statement scrolls through the screen
  useEffect(() => {
    let frame = 0

    const update = () => {
      const el = textRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.85
      const end = vh * 0.3
      const p = Math.min(
        Math.max((start - rect.top) / (start - end + rect.height * 0.5), 0),
        1
      )
      const next = Math.round(p * words.length)
      if (next !== litRef.current) {
        litRef.current = next
        setLit(next)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="introduction"
      className="relative overflow-hidden bg-neutral-950 px-6 py-28 text-white sm:px-10 lg:px-20 lg:py-36"
    >
      {/* ambient glow + grid (gradient, no blur filter) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(255,255,255,0.10)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="reveal mb-8 text-xs font-semibold tracking-[3px] text-neutral-500">
          03 <span className="mx-2 text-neutral-700">/</span> INTRODUCTION
        </p>

        {/* Scroll-linked statement */}
        <p
          ref={textRef}
          className="max-w-5xl text-3xl font-semibold leading-[1.15] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
        >
          {words.map((w, i) => (
            <span
              key={i}
              className={`transition-colors duration-300 ${
                i < lit ? 'text-white' : 'text-neutral-700'
              }`}
            >
              {w}{' '}
            </span>
          ))}
        </p>

        {/* Mission / Vision / Approach */}
        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <article
              key={p.no}
              style={{ transitionDelay: `${i * 120}ms` }}
              className="reveal group rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.08]"
            >
              <span className="text-xs font-medium tracking-[2px] text-neutral-500">
                {p.no}
              </span>
              <h3 className="mt-14 text-2xl font-semibold tracking-[-0.03em]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-neutral-400">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Introduction