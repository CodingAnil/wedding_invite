import weddingData from "../data/weddingData"
import { FloralDivider, Stagger, StaggerItem } from "./Ornaments"

export default function FamilySection() {
  const { family } = weddingData

  return (
    <section className="relative overflow-hidden bg-ivory-deep px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-xl text-center lg:max-w-3xl">
        <Stagger>
          <StaggerItem>
            <FloralDivider className="mx-auto" />
            <p className="mt-8 font-script text-[clamp(1.7rem,7vw,2.5rem)] leading-snug text-gold-deep">
              {family.withLove}
            </p>
            <p className="mt-3 font-script text-[clamp(2.4rem,10vw,3.75rem)] leading-tight text-maroon">
              All Godara Family
            </p>
            <FloralDivider className="mx-auto mt-8" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}
