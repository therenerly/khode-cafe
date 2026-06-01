import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiPhone,
  FiArrowRight,
  FiArrowLeft,
  FiShield,
  FiCheckCircle,
  FiRefreshCw,
  FiCheck,
} from 'react-icons/fi'
import Modal from '../ui/Modal.jsx'
import { LANGS } from '../../i18n'
import { useAuth } from '../../context/AuthContext.jsx'

const OTP_LENGTH = 6
const DEMO_CODE = '123456'
const RESEND_SECONDS = 30

export default function AuthModal({ open, onClose }) {
  const { t } = useTranslation()
  const { signIn } = useAuth()
  const [step, setStep] = useState('phone') // phone | otp | success
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(RESEND_SECONDS)
  const otpRefs = useRef([])

  // Reset on open/close.
  useEffect(() => {
    if (open) {
      setStep('phone')
      setPhone('')
      setOtp(Array(OTP_LENGTH).fill(''))
      setError('')
    }
  }, [open])

  // Resend countdown while on OTP step.
  useEffect(() => {
    if (step !== 'otp') return
    setCountdown(RESEND_SECONDS)
    const id = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 0 : c - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [step])

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => otpRefs.current[0]?.focus(), 80)
    }
  }, [step])

  const digitsOnly = phone.replace(/\D/g, '')

  const submitPhone = (e) => {
    e.preventDefault()
    if (digitsOnly.length < 8) {
      setError(t('auth.invalidPhone'))
      return
    }
    setError('')
    setStep('otp')
  }

  const handleOtpChange = (index, value) => {
    const char = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = char
    setOtp(next)
    setError('')
    if (char && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKey = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) otpRefs.current[index - 1]?.focus()
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((d, i) => (next[i] = d))
    setOtp(next)
    otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < OTP_LENGTH) {
      setError(t('auth.invalidOtp'))
      return
    }
    if (code !== DEMO_CODE) {
      setError(t('auth.invalidOtp'))
      setOtp(Array(OTP_LENGTH).fill(''))
      otpRefs.current[0]?.focus()
      return
    }
    signIn(`+855 ${phone}`)
    setStep('success')
  }

  const dial = '+855'

  return (
    <Modal open={open} onClose={onClose} labelledBy="auth-title" maxWidth="max-w-md">
      <div className="p-6 sm:p-8">
        {/* Header brand */}
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500/15 to-deep/15 ring-1 ring-brand-500/20">
            <img src="/khode-logo.png" alt="" className="h-7 w-7 object-contain" />
          </span>
          <div>
            <p className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-600 dark:text-brand-300">
              {t('brand.name')} · {t('brand.suffix')}
            </p>
            <p className="text-xs text-slate-400">{t('brand.tagline')}</p>
          </div>
        </div>

        {step === 'phone' && (
          <form onSubmit={submitPhone} className="animate-fade-in">
            <h2 id="auth-title" className="font-display text-2xl font-extrabold">
              {t('auth.title')}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {t('auth.subtitle')}
            </p>

            <label className="mt-6 block text-sm font-bold text-slate-700 dark:text-slate-300">
              {t('auth.phoneLabel')}
            </label>
            <div className="mt-2 flex items-stretch gap-2">
              <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                <img src={LANGS.km.flag} alt="" className="h-4 w-6 rounded-[3px] object-cover" />
                {dial}
              </span>
              <div className="relative flex-1">
                <FiPhone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  autoFocus
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('auth.phonePlaceholder')}
                  className="input pl-11"
                  aria-label={t('auth.phoneLabel')}
                />
              </div>
            </div>

            {error && <p className="mt-3 text-sm font-semibold text-rose-500">{error}</p>}

            <button type="submit" className="btn-primary mt-6 w-full">
              {t('auth.continue')} <FiArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-slate-400">
              {t('auth.terms')}
            </p>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verifyOtp} className="animate-fade-in">
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition hover:text-brand-600 dark:text-slate-400"
            >
              <FiArrowLeft className="h-4 w-4" /> {t('auth.changeNumber')}
            </button>

            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <FiShield className="h-6 w-6" />
            </div>
            <h2 id="auth-title" className="mt-4 font-display text-2xl font-extrabold">
              {t('auth.otpTitle')}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {t('auth.otpSubtitle')}{' '}
              <span className="font-bold text-ink-900 dark:text-white">
                {dial} {phone}
              </span>
            </p>

            <div className="mt-6 flex justify-between gap-2" onPaste={handleOtpPaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKey(i, e)}
                  className={`h-14 w-full rounded-2xl border bg-white text-center font-display text-2xl font-extrabold text-ink-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:bg-white/5 dark:text-white ${
                    error ? 'border-rose-400' : 'border-slate-200 dark:border-white/10'
                  }`}
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            {error ? (
              <p className="mt-3 text-sm font-semibold text-rose-500">{error}</p>
            ) : (
              <p className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-brand-600/80 dark:text-brand-300/80">
                {t('auth.demoHint')}
              </p>
            )}

            <button type="submit" className="btn-primary mt-6 w-full">
              {t('auth.verify')} <FiArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
              {countdown > 0 ? (
                t('auth.otpResendIn', { count: countdown })
              ) : (
                <button
                  type="button"
                  onClick={() => setCountdown(RESEND_SECONDS)}
                  className="inline-flex items-center gap-1.5 font-bold text-brand-600 hover:underline dark:text-brand-300"
                >
                  <FiRefreshCw className="h-3.5 w-3.5" />
                  {t('auth.otpResend')}
                </button>
              )}
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="animate-fade-in py-4 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
              <FiCheckCircle className="h-11 w-11" />
            </div>
            <h2 id="auth-title" className="mt-5 font-display text-2xl font-extrabold">
              {t('auth.success')}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {t('auth.successBody')}
            </p>
            <button onClick={onClose} className="btn-primary mt-6 w-full">
              <FiCheck className="h-4 w-4" />
              {t('payment.done')}
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
