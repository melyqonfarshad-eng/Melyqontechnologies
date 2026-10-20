import { useEffect, useRef, useState } from 'react'

// NOTE: card backgrounds are SOLID (no /opacity) so stacked cards never show through each other
const services = [
  {
    no: '01',
    short: 'Custom Software',
    title: 'Custom software built around your business.',
    text: 'We engineer bespoke digital solutions tailored to your unique workflows, business challenges, and long-term goals.',
    tags: ['Custom Platforms', 'Business Solutions', 'System Integration'],
    style: 'bg-white text-black border-neutral-200',
    sub: 'text-neutral-500',
    pill: 'border-black/10 text-neutral-600',
    big: 'text-black/[0.06]',
  },
  {
    no: '02',
    short: 'Web & Mobile',
    title: 'Web & Mobile Development',
    text: 'Modern, responsive websites and powerful mobile applications designed to deliver seamless digital experiences.',
    tags: ['Web Apps', 'Mobile Apps', 'React', 'APIs'],
    style: 'bg-neutral-200 text-black border-neutral-300',
    sub: 'text-neutral-600',
    pill: 'border-black/10 text-neutral-700',
    big: 'text-black/[0.07]',
  },
  {
    no: '03',
    short: 'UI / UX Design',
    title: 'UI / UX Design',
    text: 'Intuitive, human-centred interfaces that simplify complex ideas and make every interaction feel effortless.',
    tags: ['Research', 'Prototyping', 'Design Systems'],
    style: 'bg-neutral-300 text-black border-neutral-400/60',
    sub: 'text-neutral-600',
    pill: 'border-black/10 text-neutral-700',
    big: 'text-black/[0.07]',
  },
  {
    no: '04',
    short: 'Cloud & DevOps',
    title: 'Cloud & DevOps',
    text: 'Reliable infrastructure, streamlined deployments, and monitoring to keep your digital products running smoothly.',
    tags: ['AWS', 'Docker', 'CI/CD', 'Monitoring'],
    style: 'bg-neutral-700 text-white border-white/10',
    sub: 'text-neutral-300',
    pill: 'border-white/20 text-neutral-200',
    big: 'text-white/[0.07]',
  },
  {
    no: '05',
    short: 'AI & Automation',
    title: 'AI & Automation',
    text: 'Intelligent workflows and AI-powered capabilities that reduce repetitive tasks and help your business work smarter.',
    tags: ['AI Solutions', 'Automation', 'Intelligent Workflows', 'Data'],
    style: 'bg-neutral-950 text-white border-white/10',
    sub: 'text-neutral-400',
    pill: 'border-white/20 text-neutral-300',
    big: 'text-white/[0.08]',
  },
]

const Services = () => {
  const [active, setActive] = useState(0)
  const cardRefs = useRef([])

  useEffect(() => {
    let frame = 0

    const update = () => {
      const threshold = window.innerHeight * 0.45
      let current = 0

      cardRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = i
        }
      })

      setActive(current)
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
      id="services"
      className="relative overflow-x-clip bg-neutral-100 px-6 py-24 sm:px-10 sm:py-28 lg:px-20"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute left-0 top-40 h-96 w-96 rounded-full bg-neutral-400/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-neutral-900/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">

        {/* LEFT: Introduction and service index */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="reveal mb-4 flex items-center gap-3 text-xs font-semibold tracking-[3px] text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-[#D9FF4F]" />
            WHAT WE DO
          </p>

          <h2 className="reveal text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-black sm:text-5xl">
            Services built for ambitious teams.
          </h2>

          <p className="reveal mt-5 max-w-md text-sm leading-7 text-neutral-500">
            From custom software to intelligent automation, we build
            purposeful digital solutions that help businesses move forward.
          </p>

          {/* Service index */}
          <div className="reveal relative mt-8 rounded-3xl border border-white/80 bg-white/60 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.05)] backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between text-[10px] font-semibold tracking-[2px] text-neutral-400">
              <span>SERVICE INDEX</span>
              <span>
                {String(active + 1).padStart(2, '0')} /{' '}
                {String(services.length).padStart(2, '0')}
              </span>
            </div>

            <div className="relative pl-6">
              <div className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-black/10">
                <div
                  className="w-px bg-[#D9FF4F] transition-all duration-500"
                  style={{
                    height: `${((active + 1) / services.length) * 100}%`,
                  }}
                />
              </div>

              <ul>
                {services.map((service, i) => (
                  <li
                    key={service.no}
                    className={`flex items-center gap-3 py-1.5 transition-all duration-500 ${
                      i === active
                        ? 'translate-x-1 text-black'
                        : 'text-neutral-400'
                    }`}
                  >
                    <span className="shrink-0 text-xs font-medium tracking-[1px]">
                      {service.no}
                    </span>

                    <span
                      className={`text-sm tracking-[-0.02em] transition-all duration-500 sm:text-base ${
                        i === active ? 'font-semibold' : 'font-normal'
                      }`}
                    >
                      {service.short}
                    </span>

                    <span
                      className={`ml-auto h-2 w-2 shrink-0 rounded-full bg-[#D9FF4F] transition-all duration-500 ${
                        i === active
                          ? 'scale-100 opacity-100'
                          : 'scale-0 opacity-0'
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="reveal mt-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-neutral-800"
          >
            Start a project
            <span className="text-[#D9FF4F]">↗</span>
          </a>
        </div>

        {/* RIGHT: Stacking service cards */}
        <div className="pb-20">
          {services.map((service, i) => {
            // cards that are already covered shrink a little for a clean depth effect
            const depth = Math.max(active - i, 0)

            return (
              <div
                key={service.no}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="sticky mb-8"
                style={{
                  top: `calc(7rem + ${i * 1.25}rem)`,
                  zIndex: i + 1,
                }}
              >
                <article
                  className={`relative flex min-h-[360px] origin-top flex-col justify-between overflow-hidden rounded-[2rem] border p-7 shadow-[0_20px_60px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-500 ease-out will-change-transform sm:p-10 ${service.style}`}
                  style={{ transform: `scale(${1 - depth * 0.035})` }}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-4 -top-8 select-none text-[10rem] font-semibold leading-none tracking-[-0.08em] sm:text-[12rem] ${service.big}`}
                  >
                    {service.no}
                  </span>

                  <span
                    className={`relative text-xs font-medium tracking-[2px] sm:text-sm ${service.sub}`}
                  >
                    {service.no} / {String(services.length).padStart(2, '0')}
                  </span>

                  <div className="relative mt-16 sm:mt-20">
                    <h3 className="max-w-lg text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                      {service.title}
                    </h3>

                    <p className={`mt-3 max-w-md text-sm leading-7 ${service.sub}`}>
                      {service.text}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1.5 text-xs sm:px-4 ${service.pill}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* MELYQON lime accent */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D9FF4F]/70 to-transparent sm:left-10 sm:right-10" />
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services