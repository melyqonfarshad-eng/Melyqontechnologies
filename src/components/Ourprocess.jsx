import { useEffect, useRef, useState } from 'react'

// TODO: edit to match how you really work
const steps = [
  {
    no: '01',
    title: 'Discover',
    text: 'We learn your goals, users and constraints, then define what success looks like before a single line is written.',
    tags: ['Workshops', 'Research', 'Scope'],
  },
  {
    no: '02',
    title: 'Design',
    text: 'Clean interfaces and a clear system, prototyped and validated early so there are no surprises later.',
    tags: ['UI / UX', 'Prototypes', 'Design System'],
  },
  {
    no: '03',
    title: 'Build',
    text: 'Production-grade code, tested and fast, shipped in small iterations you can see and react to.',
    tags: ['Engineering', 'QA', 'Integrations'],
  },
  {
    no: '04',
    title: 'Launch & Scale',
    text: 'We deploy, monitor and keep improving as your product and your users grow.',
    tags: ['Deployment', 'Monitoring', 'Optimization'],
  },
  {
    no: '05',
    title: 'Support',
    text: 'We stay with you after launch: fixes, updates and improvements from a team that already knows your product inside out.',
    tags: ['Maintenance', 'Security Updates', 'Improvements'],
  },
]

const OurProcess = () => {
  const listRef = useRef(null)
  const lineRef = useRef(null)
  const stepRefs = useRef([])
  const activeRef = useRef(-1)
  const [active, setActive] = useState(-1)

  useEffect(() => {
    let frame = 0

    const update = () => {
      const list = listRef.current
      const line = lineRef.current
      if (!list || !line) return

      const trigger = window.innerHeight * 0.55
      const rect = list.getBoundingClientRect()
      const p = Math.min(Math.max((trigger - rect.top) / rect.height, 0), 1)
      line.style.transform = `scaleY(${p})`

      let next = -1
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= trigger) next = i
      })
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-white px-6 py-24 text-black sm:px-10 sm:py-32 lg:px-20"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="reveal mb-5 text-xs font-semibold tracking-[3px] text-neutral-500">
                OUR PROCESS
            </p>
            <h2 className="reveal text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
              From idea to launch,
              <br />
              <span className="bg-gradient-to-b from-neutral-900 to-neutral-400 bg-clip-text text-transparent">
                without the chaos.
              </span>
            </h2>
          </div>
          <p
            className="reveal max-w-md text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8"
            style={{ transitionDelay: '150ms' }}
          >
            A simple, transparent way of working. You always know where we are,
            what comes next and what it will take to get there.
          </p>
        </div>

        {/* Timeline */}
        <div ref={listRef} className="relative mt-16 pl-9 sm:pl-14 lg:mt-24">
          {/* track + fill */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-black/10">
            <div
              ref={lineRef}
              className="h-full w-px origin-top bg-black"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {steps.map((s, i) => {
            const reached = i <= active
            return (
              <div
                key={s.no}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                className="relative py-10 sm:py-14"
              >
                {/* dot */}
                <span
                  className={`absolute -left-9 top-[3.1rem] h-[15px] w-[15px] rounded-full border transition-all duration-500 sm:-left-14 sm:top-[4.1rem] ${
                    reached
                      ? 'scale-110 border-black bg-black'
                      : 'border-black/25 bg-white'
                  }`}
                />

                <div
                  className={`grid gap-6 transition-opacity duration-500 lg:grid-cols-[1.1fr_1fr] lg:gap-16 ${
                    reached ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div>
                    <span className="text-xs font-medium tracking-[2px] text-neutral-500">
                      STEP {s.no}
                    </span>
                    <h3 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
                      {s.title}
                    </h3>
                  </div>

                  <div className="lg:pt-6">
                    <p className="max-w-md text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
                      {s.text}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-black/10 bg-neutral-50 px-4 py-1.5 text-xs text-neutral-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="absolute inset-x-0 bottom-0 h-px bg-black/[0.06]" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurProcess