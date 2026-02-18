import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Food Blogger",
    text: "Best burger I've ever had. The Smoky BBQ is absolutely unreal. I drive 30 minutes just for this!",
    stars: 5,
    initials: "SM",
    color: "bg-primary",
  },
  {
    name: "James K.",
    role: "Regular Customer",
    text: "The quality is insane. You can taste the difference in every single bite. Boss Burger is the real deal.",
    stars: 5,
    initials: "JK",
    color: "bg-gold",
  },
  {
    name: "Olivia P.",
    role: "Local Foodie",
    text: "Fresh ingredients, massive portions, and the staff is always welcoming. Our family's favorite spot.",
    stars: 5,
    initials: "OP",
    color: "bg-primary",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, j) => (
        <Star key={j} size={16} className="fill-gold text-gold" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-foreground">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <p className="text-gold font-sans text-xs tracking-[0.3em] uppercase mb-3">Reviews</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-background">
            What People <span className="text-gold italic">Say</span>
          </h2>

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-muted/10 border border-border/20 rounded-2xl p-5"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-lg">🍔</span>
              </div>
              <StarRow count={t.stars} />
              <p className="text-background/80 font-sans text-sm leading-relaxed italic mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-primary-foreground font-sans font-bold text-xs">{t.initials}</span>
                </div>
                <div>
                  <p className="text-background font-sans font-semibold text-sm">{t.name}</p>
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
          className="bg-gold/10 border border-gold/30 rounded-2xl p-6 text-center"
        >
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} size={22} className="fill-gold text-gold" />
            ))}
          </div>
          <p className="font-display text-3xl font-bold text-gold mb-1">4.9 / 5</p>
          <p className="text-background/60 font-sans text-sm">Based on 1,200+ reviews</p>
        </motion.div>
      </div>
    </section>
  );
}

