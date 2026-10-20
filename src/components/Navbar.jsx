import { useEffect, useState } from 'react'
import logo from '../assets/Melyqonlogo.png'

// same order as the sections on the page
const links = [
  ['Services', '#services'],
  ['Our Work', '#work'],
  ['About', '#about'],
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')

  useEffect(() => {
    let frame = 0

    const update = () => {
      setScrolled(window.scrollY > 20)

      // scroll-spy: which section is in the middle of the screen
      const mid = window.innerHeight * 0.4
      let found = ''
      links.forEach(([, href]) => {
        const el = document.querySelector(href)
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= mid && r.bottom > mid) found = href
      })
      setCurrent(found)
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      {/* Floating pill */}
      <nav
        className={`pointer-events-auto mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border pl-5 pr-2.5 backdrop-blur-md transition-all duration-500 sm:h-[72px] sm:pl-7 sm:pr-3 ${
          scrolled
            ? 'border-white/15 bg-neutral-950/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
            : 'border-white/10 bg-neutral-950/75'
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          aria-label="Melyqon home"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt="Melyqon - Software / Automation / Systems"
            className="h-12 w-auto select-none sm:h-16 lg:h-20"
            draggable="false"
          />
        </a>

        {/* Links (desktop) */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                current === href
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA (desktop) */}
        <a
          href="#contact"
          className="group hidden items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-neutral-200 md:inline-flex"
        >
          Let's Talk
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            ↗
          </span>
        </a>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 md:hidden"
        >
          <span
            className={`absolute h-px w-4 bg-white transition-all duration-300 ${
              open ? 'rotate-45' : '-translate-y-[3px]'
            }`}
          />
          <span
            className={`absolute h-px w-4 bg-white transition-all duration-300 ${
              open ? '-rotate-45' : 'translate-y-[3px]'
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border bg-neutral-950/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          open
            ? 'pointer-events-auto max-h-96 border-white/10 opacity-100'
            : 'pointer-events-none max-h-0 border-transparent opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 p-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={`rounded-2xl px-4 py-3 text-base transition-colors ${
                current === href
                  ? 'bg-white/10 text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-white px-5 py-3.5 text-sm font-medium text-black"
          >
            Let's Talk <span>↗</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar