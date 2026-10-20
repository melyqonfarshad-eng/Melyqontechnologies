import { useState } from 'react'

// TODO: put your real email here
const CONTACT_EMAIL = 'melyqon.technologies@gmail.com'

// Free form service key (web3forms.com). Put it in a .env file as VITE_WEB3FORMS_KEY=your_key
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

const interests = ['Software', 'Automation', 'Systems', 'Not sure yet']

const nextSteps = [
  'We read your message and understand your goals.',
  'We set up a short call to talk through the details.',
  'You get a clear proposal with scope and timeline.',
]

const fieldClass =
  'w-full border-0 border-b border-white/20 bg-transparent py-3 text-base text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-white'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [picked, setPicked] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const toggle = (t) =>
    setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    // spam trap: real users never tick this hidden box
    if (new FormData(e.currentTarget).get('botcheck')) return

    const interest = picked.length ? picked.join(', ') : 'Not specified'

    // No form service key yet -> open the visitor's email app instead
    if (!ACCESS_KEY) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\nInterested in: ${interest}\n\n${form.message}`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `New project enquiry from ${form.name}`
      )}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New project enquiry from ${form.name}`,
          from_name: 'Melyqon website',
          name: form.name,
          email: form.email,
          interest,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        setPicked([])
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-neutral-950 px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-20"
    >
      {/* ambient light + grid (gradients, no blur filters) */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(255,255,255,0.09)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* LEFT */}
        <div>
          <p className="reveal mb-5 text-xs font-semibold tracking-[3px] text-neutral-500">
            08 <span className="mx-2 text-neutral-700">/</span> CONTACT
          </p>

          <h2 className="reveal text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl">
            Have an idea?
            <br />
            <span className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent">
              Let's build it.
            </span>
          </h2>

          <p
            className="reveal mt-6 max-w-md text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8"
            style={{ transitionDelay: '120ms' }}
          >
            Tell us a little about your project. Whether it's a new product, a
            workflow to automate or a system that needs fixing, we'd love to
            hear about it.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="reveal group mt-10 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-xl font-medium tracking-[-0.02em] transition-colors duration-300 hover:border-white sm:text-2xl"
            style={{ transitionDelay: '200ms' }}
          >
            {CONTACT_EMAIL}
            <span className="text-neutral-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
              ↗
            </span>
          </a>

          {/* What happens next */}
          <div className="reveal mt-14" style={{ transitionDelay: '280ms' }}>
            <p className="mb-6 text-[10px] font-semibold tracking-[3px] text-neutral-500">
              WHAT HAPPENS NEXT
            </p>
            <ol className="space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-[10px] font-medium text-neutral-400">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6 text-neutral-400">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* RIGHT: glass form (reveal sits on this static wrapper, not on state-driven elements) */}
        <div className="reveal" style={{ transitionDelay: '150ms' }}>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:p-10">
            {status === 'success' ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl text-black">
                  ✓
                </span>
                <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">
                  Message sent.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-400">
                  Thanks for reaching out. We'll read your message and get back
                  to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 rounded-full border border-white/20 px-6 py-3 text-sm text-white transition hover:bg-white hover:text-black"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                {/* hidden spam trap */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] font-semibold tracking-[2px] text-neutral-500">
                      NAME
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className={fieldClass}
                    />
                  </label>

                  <label className="block">
                    <span className="text-[10px] font-semibold tracking-[2px] text-neutral-500">
                      EMAIL
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@company.com"
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </label>
                </div>

                {/* interest chips */}
                <div>
                  <span className="text-[10px] font-semibold tracking-[2px] text-neutral-500">
                    I'M INTERESTED IN
                  </span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {interests.map((t) => {
                      const on = picked.includes(t)
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(t)}
                          className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                            on
                              ? 'border-white bg-white text-black'
                              : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <label className="block">
                  <span className="text-[10px] font-semibold tracking-[2px] text-neutral-500">
                    PROJECT DETAILS
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell us about your idea, goals and timeline..."
                    className={`${fieldClass} resize-none`}
                  />
                </label>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center justify-center gap-4 rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition duration-300 hover:-translate-y-1 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </button>

                  <p
                    aria-live="polite"
                    className="text-xs leading-5 text-neutral-500"
                  >
                    {status === 'error'
                      ? `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`
                      : 'We only use your details to reply to you.'}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact