import { motion, useReducedMotion } from "framer-motion";
import weddingData from "../data/weddingData";
import { FloralDivider, Reveal } from "./Ornaments";

const SPILL = [
  {
    type: "petal",
    left: "6%",
    top: "8%",
    rotate: -36,
    size: 15,
    color: "#f3b7c6",
  },
  {
    type: "heart",
    left: "16%",
    top: "38%",
    rotate: 16,
    size: 11,
    color: "#c23a4e",
  },
  {
    type: "petal",
    left: "24%",
    top: "4%",
    rotate: 22,
    size: 12,
    color: "#e3b52f",
  },
  {
    type: "petal",
    left: "30%",
    top: "46%",
    rotate: -18,
    size: 16,
    color: "#e9899d",
  },
  {
    type: "heart",
    left: "38%",
    top: "18%",
    rotate: -8,
    size: 10,
    color: "#7a1f2b",
  },
  {
    type: "petal",
    left: "46%",
    top: "52%",
    rotate: 12,
    size: 14,
    color: "#f0d56a",
  },
  {
    type: "heart",
    left: "54%",
    top: "22%",
    rotate: 20,
    size: 12,
    color: "#e85d75",
  },
  {
    type: "petal",
    left: "60%",
    top: "48%",
    rotate: -28,
    size: 15,
    color: "#d4a62a",
  },
  {
    type: "petal",
    left: "68%",
    top: "10%",
    rotate: 34,
    size: 13,
    color: "#f7c5d0",
  },
  {
    type: "heart",
    left: "76%",
    top: "40%",
    rotate: -14,
    size: 10,
    color: "#b4233a",
  },
  {
    type: "petal",
    left: "84%",
    top: "16%",
    rotate: -22,
    size: 14,
    color: "#e3b52f",
  },
  {
    type: "heart",
    left: "90%",
    top: "50%",
    rotate: 8,
    size: 11,
    color: "#f4a4b4",
  },
];

function SpillPiece({ piece, reduce }) {
  const shape =
    piece.type === "heart" ? (
      <svg
        width={piece.size}
        height={piece.size}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M12 20s-7-4.4-7-9.2C5 8 6.8 6.2 9 6.2c1.3 0 2.4.6 3 1.6.6-1 1.7-1.6 3-1.6 2.2 0 4 1.8 4 4.6C19 15.6 12 20 12 20z"
          fill={piece.color}
        />
      </svg>
    ) : (
      <svg
        width={piece.size}
        height={piece.size * 1.4}
        viewBox="0 0 20 30"
        aria-hidden="true"
      >
        <path
          d="M10 1.5c3.8 5.2 7.2 10.2 7.2 15.2C17.2 24 14 28.2 10 28.2S2.8 24 2.8 16.7C2.8 11.7 6.2 6.7 10 1.5z"
          fill={piece.color}
        />
      </svg>
    );

  if (reduce) {
    return (
      <span
        className="absolute"
        style={{
          left: piece.left,
          top: piece.top,
          rotate: `${piece.rotate}deg`,
        }}
      >
        {shape}
      </span>
    );
  }

  return (
    <motion.span
      className="absolute"
      style={{ left: piece.left, top: piece.top }}
      initial={{ y: -36, opacity: 0, rotate: piece.rotate - 24 }}
      whileInView={{ y: 0, opacity: 1, rotate: piece.rotate }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {shape}
    </motion.span>
  );
}

function FlowerSpill() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative mx-auto mt-2 h-28 w-full max-w-sm"
      aria-hidden="true"
    >
      {SPILL.map((piece) => (
        <SpillPiece
          key={`${piece.left}-${piece.top}`}
          piece={piece}
          reduce={reduce}
        />
      ))}
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="relative flex flex-col items-center overflow-hidden px-5 pt-16 pb-[calc(6.5rem+env(safe-area-inset-bottom))] text-center sm:px-8 sm:pt-24 lg:pb-28">
      <img
        src={weddingData.couple.footerPortrait}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_30%]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-ivory/55"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/35 to-ivory/65"
        aria-hidden="true"
      />

      <Reveal className="relative z-10 flex w-full max-w-xl flex-col items-center lg:max-w-3xl">
        <div
          role="img"
          aria-label={weddingData.couple.monogramAlt}
          className="h-36 w-44 bg-maroon sm:h-40 sm:w-52 lg:h-48 lg:w-60"
          style={{
            WebkitMaskImage: `url(${weddingData.couple.monogram})`,
            maskImage: `url(${weddingData.couple.monogram})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
        <FloralDivider className="mt-5" />
        <p className="mt-6 max-w-sm whitespace-pre-line font-serif text-xl italic leading-relaxed text-maroon sm:max-w-md sm:text-2xl lg:max-w-xl lg:text-3xl">
          {weddingData.closing.line}
        </p>
        <FlowerSpill />
      </Reveal>
    </footer>
  );
}
