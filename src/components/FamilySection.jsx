import { Heart } from "lucide-react"
import weddingData from "../data/weddingData"
import { FloralDivider, Marigold, Stagger, StaggerItem } from "./Ornaments"

export default function FamilySection() {
  const { family } = weddingData

  return (
    <section className="relative overflow-hidden bg-ivory-deep px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-xl text-center lg:max-w-3xl">
        <Stagger>
          <StaggerItem>
            <p className="font-script text-4xl text-gold-deep sm:text-5xl lg:text-6xl">{family.withLove}</p>
            <h2 className="mt-2 font-display text-base tracking-[0.22em] text-maroon uppercase sm:text-lg sm:tracking-[0.28em] lg:text-xl">
              {family.godaraTitle}
            </h2>
            <FloralDivider className="mx-auto mt-4" />
          </StaggerItem>
          {family.godara.map((name, index) => (
            <StaggerItem key={name} className="mt-3">
              <p
                className={
                  index === family.godara.length - 1
                    ? "font-script text-3xl text-maroon"
                    : "font-serif text-[1.45rem] leading-tight text-ink"
                }
              >
                {name}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <FloralDivider className="mx-auto mt-12" />

        <Stagger className="mt-8">
          <StaggerItem>
            <Marigold className="mx-auto h-5 w-5 text-gold-deep" />
            <h2 className="mt-3 px-2 font-script text-[clamp(1.8rem,8vw,2.25rem)] leading-tight text-maroon sm:text-5xl lg:text-6xl">{family.flowersTitle}</h2>
          </StaggerItem>
          {family.flowers.map(([left, right]) => (
            <StaggerItem key={left} className="mt-4">
              <p className="flex flex-wrap items-center justify-center gap-x-3 font-serif text-[1.45rem] text-ink">
                <span>{left}</span>
                <Heart className="fill-gold text-gold" size={12} strokeWidth={1.5} aria-hidden="true" />
                <span>{right}</span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>
{/* 
        <div className="mt-12">
          <p className="font-display text-xs tracking-[0.32em] text-gold-deep uppercase">
            {family.blessingsTitle}
          </p>
          <Stagger className="mt-5 space-y-5">
            {family.blessings.map((group) => (
              <StaggerItem key={group.title}>
                <p className="font-serif text-xl text-maroon">{group.title}</p>
                <p className="mx-auto mt-1 max-w-sm font-serif text-lg leading-snug text-ink/80">
                  {group.names}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div> */}
      </div>
    </section>
  )
}
