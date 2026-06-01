import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiCheckCircle, FiRefreshCw, FiClock, FiCheck } from 'react-icons/fi'
import Modal from '../ui/Modal.jsx'
import KhqrCode from './KhqrCode.jsx'
import { useCart } from '../../context/CartContext.jsx'

const QR_TTL = 180 // seconds

function makeRef() {
  // Deterministic-enough reference without Date.now/random restrictions issues.
  const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14)
  return `KHODE${stamp}`
}

export default function PaymentModal({ open, onClose }) {
  const { t } = useTranslation()
  const { total, clear } = useCart()
  const [status, setStatus] = useState('scan') // scan | processing | success
  const [ttl, setTtl] = useState(QR_TTL)
  const [reference, setReference] = useState('')

  const amount = useMemo(() => total, [total])

  useEffect(() => {
    if (open) {
      setStatus('scan')
      setTtl(QR_TTL)
      setReference(makeRef())
    }
  }, [open])

  // QR countdown.
  useEffect(() => {
    if (!open || status !== 'scan') return
    const id = setInterval(() => setTtl((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(id)
  }, [open, status])

  const regenerate = () => {
    setTtl(QR_TTL)
    setReference(makeRef())
  }

  const pay = () => {
    setStatus('processing')
    setTimeout(() => setStatus('success'), 1800)
  }

  const finish = () => {
    clear()
    onClose()
  }

  const mins = String(Math.floor(ttl / 60)).padStart(1, '0')
  const secs = String(ttl % 60).padStart(2, '0')
  const expired = ttl === 0

  return (
    <Modal
      open={open}
      onClose={status === 'processing' ? () => {} : onClose}
      labelledBy="pay-title"
      maxWidth="max-w-md"
    >
      {/* ABA-styled header — extra right padding reserves space for the
          Modal's absolutely-positioned close button (top-4 right-4). */}
      <div className="rounded-t-3xl bg-gradient-to-br from-deep to-brand-700 py-5 pl-6 pr-16 text-white sm:pl-8 sm:pr-20">
        <div className="flex items-center justify-between gap-3">
          <div className="flex shrink-0 items-center gap-2.5">
            <span className="inline-flex h-9 items-center rounded-lg bg-white px-2 shadow-sm">
              <img src="/aba-pay.svg" alt="ABA PayWay" className="h-5 w-auto" />
            </span>
            <span className="text-sm font-extrabold uppercase tracking-wide">KHQR</span>
          </div>
          <span className="truncate rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
            {t('payment.currencyNote')}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {status === 'success' ? (
          <div className="animate-fade-in py-2 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
              <FiCheckCircle className="h-11 w-11" />
            </div>
            <h2 id="pay-title" className="mt-5 font-display text-2xl font-extrabold">
              {t('payment.success')}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {t('payment.successBody')}
            </p>
            <div className="mx-auto mt-5 flex max-w-xs items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm dark:bg-white/5">
              <span className="text-slate-500 dark:text-slate-400">{t('payment.ref')}</span>
              <span className="font-mono text-xs font-bold">{reference}</span>
            </div>
            <button onClick={finish} className="btn-primary mt-6 w-full">
              <FiCheck className="h-4 w-4" />
              {t('payment.done')}
            </button>
          </div>
        ) : (
          <>
            <h2 id="pay-title" className="font-display text-xl font-extrabold">
              {t('payment.title')}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t('payment.subtitle')}
            </p>

            {/* Amount */}
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-brand-500/8 px-5 py-4 ring-1 ring-brand-500/15">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  {t('payment.amount')}
                </p>
                <p className="font-display text-3xl font-black gradient-text">
                  {t('menu.currency')}
                  {amount.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  {t('payment.merchant')}
                </p>
                <p className="font-display text-lg font-extrabold">{t('brand.name')}</p>
              </div>
            </div>

            {/* QR */}
            <div className="relative mt-6">
              <div className="mx-auto w-full max-w-[16rem]">
                <div className="relative rounded-3xl border-2 border-deep/10 bg-white p-4 shadow-soft">
                  <KhqrCode
                    seed={reference}
                    className={`w-full transition-all duration-300 ${
                      expired ? 'blur-sm opacity-40' : ''
                    }`}
                  />
                  {/* scan line */}
                  {!expired && status === 'scan' && (
                    <div className="pointer-events-none absolute inset-x-6 top-6 h-[calc(100%-3rem)] overflow-hidden rounded-xl">
                      <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-brand-500/0 via-brand-500/30 to-brand-500/0 animate-[float_2.2s_ease-in-out_infinite]" />
                    </div>
                  )}

                  {expired && (
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="text-center">
                        <p className="font-display text-sm font-extrabold text-rose-500">
                          {t('payment.expired')}
                        </p>
                        <button
                          onClick={regenerate}
                          className="btn-soft mt-2 px-4 py-2 text-xs"
                        >
                          <FiRefreshCw className="h-3.5 w-3.5" /> {t('payment.regenerate')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Timer */}
              {!expired && (
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                  <FiClock className="h-3.5 w-3.5" />
                  {t('payment.expiresIn', { count: `${mins}:${secs}` })}
                </p>
              )}
            </div>

            <p className="mt-4 text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {t('payment.scanHint')}
            </p>

            {status === 'processing' ? (
              <button disabled className="btn-primary mt-5 w-full">
                <FiRefreshCw className="h-4 w-4 animate-spin" />
                {t('payment.processing')}
              </button>
            ) : (
              <button onClick={pay} disabled={expired} className="btn-primary mt-5 w-full">
                <FiCheckCircle className="h-4 w-4" /> {t('payment.simulate')}
              </button>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              {t('payment.poweredBy')}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
