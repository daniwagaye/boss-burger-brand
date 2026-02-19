import { motion } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/useScrollAnimation";
import heroBurger from "@/assets/hero-burger.jpg";

const PHONE = "tel:+09101002002";
const PHONE_DISPLAY = "0910100202";

export default function HeroSection() {
  const scrollY = useParallax();

  return (
    <section className="relative h-screen overflow-hidden bg-background">
      {/* Background layer with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src={heroBurger}
          alt="Gourmet burger with melting cheese"
          className="w-full h-[120%] object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/85" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pb-24">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-2 backdrop-blur-sm bg-black/20"
        >
          <span className="w-2 h-2 rounded-full bg-gold inline-block" />
          <span className="text-white font-sans text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">Premium Burgers</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-4xl"
        >
          <span className="text-white">Bigger Taste.</span>
          <br />
          <span className="text-primary">Better Burgers.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-5 text-white/75 font-sans text-base md:text-lg max-w-md"
        >
          Hand-pressed patties · local buns · real flavor.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <motion.a
            href={PHONE}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-sans font-bold text-base md:text-lg glow-crimson shadow-2xl"
          >
            <Phone size={18} />
            Call Now — {PHONE_DISPLAY}
          </motion.a>

          <Link
            to="/menu"
            className="text-white/80 hover:text-white font-sans text-sm font-medium underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors"
          >
            View Full Menu →
          </Link>
        </motion.div>
      </div>

      {/* Stats bar — pinned to bottom, above scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-10 md:gap-16 z-20"
      >
        {[
          { value: "10+", label: "YEARS" },
          { value: "50K+", label: "BURGERS" },
          { value: "4.9★", label: "RATING" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
            <p className="font-sans text-xs tracking-widest text-white/50 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-0.5 z-20"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

