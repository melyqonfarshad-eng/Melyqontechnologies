import logo from '../assets/Melyqonlogo.png'

// TODO: edit the copy to match your real company story
const pillars = [
  {
    no: '01',
    title: 'Software',
    text: 'Custom platforms, web and mobile applications engineered around how your business actually works.',
    tags: ['Custom Platforms', 'Web Apps', 'Mobile Apps', 'APIs'],
  },
  {
    no: '02',
    title: 'Automation',
    text: 'Intelligent workflows and AI that remove repetitive work and give your team its time back.',
    tags: ['AI Solutions', 'Workflows', 'Integrations', 'Data'],
  },
  {
    no: '03',
    title: 'Systems',
    text: 'Reliable cloud infrastructure, deployments and monitoring that keep everything running smoothly.',
    tags: ['Cloud', 'DevOps', 'CI/CD', 'Monitoring'],
  },
]

const values = [
  ['Precision', 'Every detail is considered, from the code to the pixels.'],
  ['Transparency', 'Clear timelines and honest, direct communication.'],
  ['Speed', 'A lean senior team that iterates fast with no red tape.'],
  ['Ownership', 'We treat your product as if it were our own.'],
]

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-neutral-950 px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-20"
    >
      {/* ambient light (gradients, no blur filters) */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(255,255,255,0.10)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* logo watermark */}
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="pointer-events-none absolute -bottom-10 -right-24 hidden w-[56rem] max-w-none select-none opacity-[0.05] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="reveal mb-5 text-xs font-semibold tracking-[3px] text-neutral-500">
              ABOUT MELYQON
            </p>
            <h2 className="reveal text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              We build the
              <br />
              technology behind
              <br />
              <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
                ambitious businesses.
              </span>
            </h2>
          </div>

          <p
            className="reveal max-w-md text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8"
            style={{ transitionDelay: '150ms' }}
          >
            Melyqon is an IT company that designs, builds and runs software,
            automation and systems for businesses that want to move faster. We
            pair deep engineering with clean design, so what we deliver is
            powerful and simple to use.
          </p>
        </div>

        {/* Static pillar cards: details always visible, no hover or animation */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-24">
          {pillars.map((p) => (
            <article
              key={p.no}
              className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 sm:p-9"
            >
              {/* big faint number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-8 select-none text-[10rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.04]"
              >
                {p.no}
              </span>

              <span className="relative text-xs font-medium tracking-[2px] text-neutral-500">
                {p.no} / 03
              </span>

              <div className="relative mt-16">
                <h3 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-neutral-400">
                  {p.text}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Values */}
        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {values.map(([title, text], i) => (
            <div
              key={title}
              className="border-t border-white/15 pt-6"
            >
              <span className="text-xs font-medium tracking-[2px] text-neutral-600">
                0{i + 1}
              </span>
              <h4 className="mt-4 text-lg font-semibold tracking-[-0.02em]">
                {title}
              </h4>
              <p className="mt-2 max-w-[16rem] text-sm leading-6 text-neutral-400">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-24 flex flex-col items-start justify-between gap-8 border-t border-white/15 pt-12 sm:flex-row sm:items-center">
          <h3 className="max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
            Let's build something
            <br />
            that lasts.
          </h3>
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition duration-300 hover:-translate-y-1 hover:bg-neutral-200"
          >
            Work with us
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About