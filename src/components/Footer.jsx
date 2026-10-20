import logo from '../assets/Melyqonlogo.png'

// Address shown line by line (just the address, no building or hub names)
const LOCATION = [
  '27th Main Rd,Phase 3, 1st Sector, HSR Layout,',
  'Bengaluru, Karnataka 560102',
]
const EMAIL = 'melyqon.technologies@gmail.com'
const PHONE = '+91 84318 71304'

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black px-6 py-14 text-white sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.5fr_1.3fr_1fr] lg:gap-8">
          {/* Logo */}
          <a href="#home" aria-label="Melyqon home" className="inline-block">
            <img
              src={logo}
              alt="Melyqon - Software / Automation / Systems"
              className="h-16 w-auto select-none sm:h-18"
              draggable="false"
            />
          </a>

          {/* Location */}
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[3px] text-neutral-500">
              LOCATION
            </p>
            <address className="text-sm not-italic leading-6 text-neutral-300">
              {LOCATION.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          {/* Email */}
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[3px] text-neutral-500">
              EMAIL
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="break-words text-sm leading-6 text-neutral-300 transition-colors duration-300 hover:text-white"
            >
              {EMAIL}
            </a>
          </div>

          {/* Phone */}
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[3px] text-neutral-500">
              PHONE
            </p>
            <a
              href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}
              className="text-sm leading-6 text-neutral-300 transition-colors duration-300 hover:text-white"
            >
              {PHONE}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-[11px] tracking-[1px] text-neutral-600">
          © {new Date().getFullYear()} MELYQON. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}

export default Footer