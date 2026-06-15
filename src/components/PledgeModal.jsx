import { useEffect, useState } from 'react'
import { FORMSPREE_ID } from '../config'
import { formatPrice } from '../utils/wishes'

export default function PledgeModal({ wish, onClose }) {
  const f = wish.fields
  const itemName = f['Product Name']
  const price = f.Price

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    team: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')

  const update = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setStatus('loading')

    try {
      if (!FORMSPREE_ID) {
        throw new Error('Formspree not configured')
      }

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          team: form.team,
          message: form.message,
          item: f._bundleItems
            ? `${itemName} — ${f._bundleItems}`
            : itemName,
        }),
      })

      if (!res.ok) throw new Error('submit failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-card">
        <div className="px-[22px] pt-5 flex justify-between items-start">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.07em] uppercase text-[var(--text-muted)] mb-1">
              You&apos;re gifting
            </div>
            <div className="text-[17.5px] font-bold leading-[1.3]">
              {itemName}
            </div>
            {price && (
              <div className="text-[13.5px] font-semibold text-[var(--accent)] mt-0.5">
                {formatPrice(price)}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-transparent border-0 cursor-pointer text-[var(--text-muted)] text-lg leading-none p-1 rounded-lg ml-4 shrink-0 hover:text-[var(--text)] transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="h-px bg-[var(--border)] mx-[22px] my-4" />

        {status === 'success' ? (
          <div className="px-[22px] pt-3 pb-7 text-center">
            <div className="success-emoji">🎉</div>
            <div className="text-[19px] font-extrabold mb-2">
              Thank you, {form.name.split(' ')[0]}!
            </div>
            <div className="text-[14.5px] text-[var(--text-2)] leading-[1.65]">
              Karthick will be absolutely thrilled.
              <br />
              You just made his day. 🥹
            </div>
            <button
              className="btn btn-outline mt-[22px]"
              onClick={onClose}
            >
              Back to wishlist
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-[22px] pb-[22px]">
            <div className="flex flex-col gap-[13px]">
              <div>
                <label className="block text-[12.5px] font-semibold text-[var(--text-2)] mb-[5px]">
                  Your name{' '}
                  <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="What do we call you?"
                  required
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5 max-[480px]:grid-cols-1">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[var(--text-2)] mb-[5px]">
                    Email
                  </label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-[var(--text-2)] mb-[5px]">
                    Phone
                  </label>
                  <input
                    className="input"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <p className="pledge-aside">
                Relax! follow-ups and thank-yous only. Plus a reserved right to
                guilt-trip you, affectionately, if you pledge and then go quiet.
              </p>

              <div>
                <label className="block text-[12.5px] font-semibold text-[var(--text-2)] mb-[5px]">
                  Team / Group
                </label>
                <input
                  className="input"
                  type="text"
                  name="team"
                  value={form.team}
                  onChange={update}
                  placeholder="Family, college friends, work…"
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-[var(--text-2)] mb-[5px]">
                  Message{' '}
                  <span className="font-normal text-[var(--text-muted)]">
                    (optional)
                  </span>
                </label>
                <textarea
                  className="input"
                  name="message"
                  value={form.message}
                  onChange={update}
                  placeholder="Leave Karthick a little note 💌"
                />
              </div>

              {status === 'error' && (
                <div className="py-2.5 px-3.5 bg-red-50 border-[1.5px] border-red-200 rounded-[10px] text-[13px] text-red-700">
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full py-3 text-[15px] mt-0.5"
                disabled={!form.name.trim() || status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <span className="spinner" />
                    Sending…
                  </span>
                ) : (
                  'Let Karthick know 🎁'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
