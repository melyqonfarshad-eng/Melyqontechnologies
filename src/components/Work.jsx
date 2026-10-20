import { useEffect, useRef, useState } from 'react'

// TODO: replace with your real projects
const projects = [
  {
    title: 'Finvault',
    desc: 'Banking dashboard with real-time analytics',
    tag: 'Web App',
    year: '2026',
    bg: 'from-neutral-900 via-neutral-800 to-neutral-600',
    bars: [40, 65, 50, 80, 60, 95, 70],
  },
  {
    title: 'Orbit',
    desc: 'Logistics tracking platform for fleets',
    tag: 'Platform',
    year: '2026',
    bg: 'from-neutral-300 via-neutral-200 to-white',
    bars: [70, 45, 85, 55, 75, 50, 90],
    light: true,
  },
  {
    title: 'Luma Health',
    desc: 'Patient booking and care mobile app',
    tag: 'Mobile',
    year: '2025',
    bg: 'from-neutral-700 via-neutral-600 to-neutral-400',
    bars: [30, 55, 45, 70, 85, 65, 90],
  },
  {
    title: 'Nexa AI',
    desc: 'AI assistant that automates customer support',
    tag: 'AI',
    year: '2025',
    bg: 'from-black via-neutral-900 to-neutral-700',
    bars: [55, 80, 60, 90, 70, 85, 100],
  },
  {
    title: 'Stratos Cloud',
    desc: 'DevOps console for deployments and monitoring',
    tag: 'Cloud',
    year: '2025',
    bg: 'from-neutral-400 via-neutral-300 to-neutral-100',
    bars: [60, 40, 75, 50, 80, 65, 55],
    light: true,
  },
]

// No backdrop-blur here on purpose: blur on moving elements causes scroll lag
const Mockup = ({ bars, light }) => {
  const line = light ? 'bg-black/15' : 'bg-white/20'
  const strong = light ? 'bg-black/70' : 'bg-white/80'
  const peak = bars.indexOf(Math.max(...bars))

  return (
    <div
      className={`absolute inset-x-6 bottom-0 top-8 rounded-t-2xl border shadow-lg transition-transform duration-700 group-hover:-translate-y-2 sm:inset-x-10 ${
        light ? 'border-black/10 bg-white/70' : 'border-white/15 bg-white/10'
      }`}
    >
      {/* window bar */}
      <div className="flex items-center gap-1.5 px-4 py-3">
        <span className={`h-2 w-2 rounded-full ${line}`} />
        <span className={`h-2 w-2 rounded-full ${line}`} />
        <span className={`h-2 w-2 rounded-full ${line}`} />
        <span className={`ml-4 h-2 w-24 rounded-full ${line}`} />
      </div>

      <div className="flex gap-4 px-4 pb-4">
        {/* sidebar */}
        <div className="hidden w-16 flex-col gap-2 sm:flex">
          <span className={`h-2 w-full rounded-full ${strong}`} />
          <span className={`h-2 w-4/5 rounded-full ${line}`} />
          <span className={`h-2 w-3/5 rounded-full ${line}`} />
          <span className={`h-2 w-4/5 rounded-full ${line}`} />
        </div>

        {/* chart */}
        <div className="flex-1">
          <span className={`block h-3 w-28 rounded-full ${strong}`} />
          <span className={`mt-2 block h-2 w-40 rounded-full ${line}`} />
          <div className="mt-5 flex h-24 items-end gap-2 sm:h-28">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t-md ${i === peak ? strong : line}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Work = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const bar = barRef.current
    let max = 0
    let frame = 0
    let lastWidth = window.innerWidth

    const update = () => {
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0

      track.style.transform = `translate3d(${-p * max}px,0,0)`
      bar.style.transform = `scaleX(${p})`

      // only touch React state when the active project really changes
      const next = Math.min(projects.length - 1, Math.floor(p * projects.length))
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    }

    const measure = () => {
      max = Math.max(track.scrollWidth - window.innerWidth, 0)
      // vertical scroll distance = horizontal distance + one screen
      section.style.height = `${max + window.innerHeight}px`
      update()
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    // Ignore height-only resizes (mobile address bar) so the layout doesn't jump
    const onResize = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      measure()
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative bg-white text-black">
      {/* pinned viewport */}
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pt-24">
        {/* soft glow (gradient, not a blur filter, so it is cheap to paint) */}
        <div className="pointer-events-none absolute -right-24 top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.07)_0%,transparent_70%)]" />

        {/* header */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-6 sm:px-10 lg:px-20">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[3px] text-neutral-500">
              05 <span className="mx-2 text-neutral-300">/</span> SELECTED WORK
            </p>
            <h2 className="text-3xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
              Work that speaks
              <br />
              for itself.
            </h2>
          </div>

          <div className="hidden w-56 sm:block">
            <div className="mb-3 flex justify-between text-[10px] font-semibold tracking-[2px] text-neutral-400">
              <span>PROJECT</span>
              <span className="text-black">
                {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>
            <div className="h-px w-full bg-black/10">
              <div
                ref={barRef}
                className="h-px origin-left bg-black"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        </div>

        {/* horizontal track */}
        <div
          ref={trackRef}
          className="relative z-10 flex w-max gap-6 px-6 will-change-transform sm:px-10 lg:px-20"
          style={{ transform: 'translate3d(0,0,0)' }}
        >
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="group w-[82vw] shrink-0 sm:w-[480px] lg:w-[560px]"
            >
              <div
                className={`relative h-[40vh] min-h-[260px] max-h-[400px] overflow-hidden rounded-[2rem] bg-gradient-to-br ${p.bg} shadow-[0_12px_30px_rgba(0,0,0,0.12)]`}
              >
                <span
                  className={`absolute right-5 top-4 text-xs font-medium tracking-[2px] ${
                    p.light ? 'text-black/40' : 'text-white/50'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Mockup bars={p.bars} light={p.light} />
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">{p.desc}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[10px] tracking-[1.5px] text-neutral-600">
                    {p.tag.toUpperCase()} · {p.year}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-sm transition-colors duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}

          {/* closing CTA card */}
          <a
            href="#contact"
            className="group flex w-[82vw] shrink-0 flex-col justify-between rounded-[2rem] bg-black p-8 text-white transition-colors hover:bg-neutral-900 sm:w-[420px]"
            style={{ minHeight: 'min(40vh, 400px)' }}
          >
            <span className="text-xs font-medium tracking-[2px] text-neutral-500">
              YOUR PROJECT
            </span>
            <div>
              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em]">
                Have an idea?
                <br />
                Let's build it.
              </h3>
              <span className="mt-6 inline-flex items-center gap-3 text-sm text-neutral-300">
                Start a conversation
                <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Work