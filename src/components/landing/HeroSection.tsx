import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";
import heroBurger from "@/assets/hero-burger.jpg";

const PHONE = "tel:+15551234567";

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>

      {/* Floating smoke overlay */}
      <div
        className="absolute inset-0 z-10 opacity-20 pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold font-sans text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Premium Handcrafted Burgers
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight max-w-4xl"
        >
          Bigger Taste.
          <br />
          <span className="text-gradient-gold">Better Burgers.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 text-white/70 font-sans text-lg md:text-xl max-w-lg"
        >
          Crafted with passion, served with pride. Experience burgers like never before.
        </motion.p>

        <motion.a
          href={PHONE}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.3, type: "spring" }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-sans font-bold text-lg glow-crimson shadow-2xl"
        >
          <Phone size={20} />
          Call Now
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
