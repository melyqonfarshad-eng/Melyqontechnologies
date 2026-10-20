import { useEffect, useState } from 'react'
import AbstractLoop from './AbstractLoop'

// Same three words as the logo tagline: Software / Automation / Systems
const words = ['Software', 'Automation', 'Systems']

// Words slide up one by one, then loop. Lives in its own component so the
// Hero does not re-render every time the word changes.
const WordRotator = () => {
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const list = [...words, words[0]] // extra first word at the end for a seamless loop

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true)
      setIndex((i) => i + 1)
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const handleEnd = () => {
    // reached the duplicated first word -> jump back to the real first one, no animation
    if (index === words.length) {
      setAnimate(false)
      setIndex(0)
    }
  }

  return (
    <span className="relative inline-block h-5 overflow-hidden align-middle">
      <span
        className="block"
        style={{
          transform: `translateY(-${index * 1.25}rem)`,
          transition: animate ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
        }}
        onTransitionEnd={handleEnd}
      >
        {list.map((w, i) => (
          <span key={i} className="block h-5 leading-5 text-black">
            {w.toUpperCase()}
          </span>
        ))}
      </span>
    </span>
  )
}

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-white px-6 pt-20 text-black sm:px-10 lg:px-20"
    >
      {/* soft gray glow behind everything */}
      <div className="pointer-events-none absolute -left-24 top-32 h-96 w-96 rounded-full bg-neutral-300/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-neutral-400/20 blur-[120px]" />

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-6 py-12 md:grid-cols-2 lg:gap-12">
        {/* LEFT */}
        <div className="relative z-10 py-6">
          <div className="reveal mb-8 inline-flex items-center gap-3 rounded-full border border-black/[0.07] bg-white/70 px-4 py-2.5 text-[10px] font-semibold tracking-[2px] text-neutral-600 shadow-sm backdrop-blur-xl sm:text-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neutral-900" />
            <span className="text-neutral-400">WE BUILD</span>
            <span className="h-3 w-px bg-black/15" />
            <WordRotator />
          </div>

          <h1 className="reveal text-[clamp(3.8rem,7.5vw,6.8rem)] font-semibold leading-[0.96] tracking-[-0.075em]" style={{ transitionDelay: '100ms' }}>
            We build
            <br />
            what comes
            <br />
            <span className="bg-gradient-to-b from-neutral-900 to-neutral-400 bg-clip-text text-transparent">
              next.
            </span>
          </h1>

          <p className="reveal mt-7 max-w-md text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8" style={{ transitionDelay: '200ms' }}>
            We transform ambitious ideas into exceptional digital
            experiences through software, design, and technology.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-4" style={{ transitionDelay: '300ms' }}>
            <a
              href="#work"
              className="group inline-flex items-center gap-4 rounded-full bg-black px-6 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-neutral-800"
            >
              Explore our work
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full px-4 py-4 text-sm font-medium text-neutral-600 transition hover:text-black"
            >
              Discover Melyqon <span>→</span>
            </a>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-[9px] font-medium tracking-[1.5px] text-neutral-400 sm:mt-20">
            <span>INDEPENDENT DIGITAL STUDIO</span>
            <span>BUILDING FOR THE FUTURE © 2026</span>
          </div>
        </div>

        {/* RIGHT: dark glass stage for the 3D object */}
        <div className="reveal relative flex min-h-[350px] items-center justify-center sm:min-h-[450px] lg:min-h-[600px]" style={{ transitionDelay: '200ms' }}>
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#3a3a3a_0%,#141414_55%,#050505_100%)] shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
            {/* subtle grid */}
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>

          <div className="relative z-10 h-[350px] w-full sm:h-[450px] lg:h-[560px]">
            <AbstractLoop />
          </div>

          <div className="pointer-events-none absolute right-6 top-6 z-20 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[9px] tracking-[2px] text-white/80 backdrop-blur-xl">
            FORM / 001
          </div>

          <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[9px] tracking-[2px] text-white/80 backdrop-blur-xl">
            ENGINEERED TO BE DIFFERENT
          </div>
        </div>
      </main>
    </section>
  )
}

export default Hero