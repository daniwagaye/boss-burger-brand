import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Food Blogger",
    text: "Best burger I've ever had. The Smoky BBQ is absolutely unreal. I drive 30 minutes just for this!",
    stars: 5,
    initial: "S",
  },
  {
    name: "James K.",
    role: "Regular Customer",
    text: "The quality is insane. You can taste the difference in every single bite. Boss Burger is the real deal.",
    stars: 5,
    initial: "J",
  },
  {
    name: "Olivia P.",
    role: "Local Foodie",
    text: "Fresh ingredients, massive portions, and the staff is always welcoming. Our family's favorite spot.",
    stars: 5,
    initial: "O",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-foreground">
      <div className="container mx-auto px-4 max-w-2xl lg:max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <p className="text-primary font-sans text-xs tracking-[0.3em] uppercase font-bold mb-3">Reviews</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-background">
            What People <span className="text-primary italic">Say</span>
          </h2>
        </motion.div>

        {/* Cards — stacked on mobile, 3-col on large screens */}
        <div className="flex flex-col lg:flex-row gap-5 mb-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex-1 bg-[#2a2a2a] rounded-2xl p-6 flex flex-col"
            >
              {/* Big red quote mark */}
              <div className="mb-3">
                <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="28" fontSize="42" fontFamily="Georgia, serif" fill="#b91c1c" opacity="0.85">"</text>
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={18} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-background/80 font-sans text-sm leading-relaxed italic flex-1 mb-5">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="border-t border-background/10 mb-4" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm font-sans">{t.initial}</span>
                </div>
                <div>
                  <p className="text-background font-sans font-bold text-sm">{t.name}</p>
                  <p className="text-background/50 font-sans text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto max-w-xs bg-[#2a2a2a] rounded-2xl p-6 text-center"
        >
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} size={22} className="fill-gold text-gold" />
            ))}
          </div>
          <p className="font-display text-3xl font-bold text-background mb-1">4.9 / 5</p>
          <p className="text-background/50 font-sans text-sm">Based on 1,200+ reviews</p>
        </motion.div>
      </div>
    </section>
  );
}


