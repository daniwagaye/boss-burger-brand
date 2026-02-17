import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { name: "Sarah M.", text: "The best burger I've ever had. The truffle royale is absolutely divine — worth every penny.", stars: 5 },
  { name: "James K.", text: "Boss Burger is the real deal. Juicy patties, incredible sauces, and that smoky flavor is unbeatable.", stars: 5 },
  { name: "Emily R.", text: "Finally a burger place that takes quality seriously. The spicy inferno is addictive!", stars: 5 },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-3">What People Say</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Loved by Thousands</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground font-sans text-lg leading-relaxed italic mb-6">"{t.text}"</p>
              <p className="text-muted-foreground font-sans font-semibold">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
