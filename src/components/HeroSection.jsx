import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import weddingData from "../data/weddingData"
import { GaneshMark } from "./Ornaments"

const RECEPTION = Date.parse("2026-11-13T18:15:00+05:30")
const SLIDE_MS = 4500

function timeLeft() {
  const remaining = Math.max(0, RECEPTION - Date.now())
  const hoursTotal = Math.floor(remaining / 3600000)
  return {
    days: Math.floor(hoursTotal / 24),
    hours: hoursTotal % 24,
  }
}

function ReceptionCountdown() {
  const [left, setLeft] = useState(timeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => setLeft(timeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4" aria-label="Time remaining until the reception on 13 November 2026">
      {[
        ["Days", left.days],
        ["Hours", left.hours],
      ].map(([label, value]) => (
        <div
          key={label}
          className="min-w-[4.25rem] border border-gold bg-maroon px-3 py-2 shadow-[0_8px_18px_rgba(0,0,0,0.28)] sm:min-w-[5.25rem] sm:px-4 sm:py-2.5 lg:min-w-[5.75rem]"
        >
          <p className="font-display text-[1.45rem] leading-none text-gold-bright tabular-nums sm:text-[1.75rem] lg:text-3xl">{value}</p>
          <p className="mt-1 font-display text-[0.62rem] tracking-[0.2em] text-gold-light uppercase">{label}</p>
        </div>
      ))}
    </div>
  )
}

export default function HeroSection({ revealed }) {
  const reduce = useReducedMotion()
  const slides = weddingData.couple.heroSlides
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce || slides.length < 2 || !revealed) return undefined
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [reduce, revealed, slides.length])

  const slide = slides[active] ?? slides[0]

  return (
    <section className="relative bg-ivory lg:flex lg:min-h-[100svh] lg:items-center lg:justify-center lg:px-8 lg:py-6">
      <div className="@container relative min-h-[100svh] w-full overflow-hidden lg:h-[min(94svh,940px)] lg:min-h-0 lg:w-[min(52vh,480px)] lg:shadow-[0_24px_70px_rgba(90,64,53,0.22)] lg:ring-1 lg:ring-gold/50">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width="900"
            height="1200"
            fetchPriority={active === 0 ? "high" : "low"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: revealed && !reduce ? 1.02 : 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{
              opacity: { duration: reduce ? 0 : 1.1, ease: "easeInOut" },
              scale: { duration: reduce ? 0 : 5.2, ease: "linear" },
            }}
          />
        </AnimatePresence>

        {/* Preload the next slide so swaps stay smooth */}
        {slides.map((item, index) =>
          index === active ? null : (
            <img key={`preload-${item.src}`} src={item.src} alt="" className="hidden" aria-hidden="true" />
          ),
        )}

        <div className="absolute inset-x-0 top-0 z-[1] h-48 bg-gradient-to-b from-[#641c25]/70 via-[#641c25]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-52 bg-gradient-to-t from-[#641c25]/80 via-[#641c25]/35 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center lg:h-full lg:min-h-0">
          <div className="flex flex-col items-center px-6 pt-[max(1.25rem,env(safe-area-inset-top))] text-center lg:pt-6">
            <GaneshMark className="h-9 w-9 text-gold-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] lg:h-11 lg:w-11" />
            <p className="mt-1 font-deva text-sm text-gold-light drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] lg:text-base">
              {weddingData.blessing}
            </p>
          </div>

          <div className="mt-auto w-full px-4 pb-[calc(6.75rem+env(safe-area-inset-bottom))] text-center sm:px-6 lg:pb-8">
            <ReceptionCountdown />
            <p className="mx-auto mt-4 max-w-full font-display text-[clamp(1rem,4.8vw,1.7rem)] tracking-[0.12em] text-gold-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:tracking-[0.16em] lg:text-[clamp(1.15rem,11cqi,1.8rem)] lg:tracking-[0.14em]">
              {weddingData.couple.groom.toUpperCase()}
              <span className="mx-2 inline-block text-blush">♥</span>
              {weddingData.couple.bride.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
