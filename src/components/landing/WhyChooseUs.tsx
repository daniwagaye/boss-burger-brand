import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Flame, Beef, Leaf } from "lucide-react";

const REASONS = [
  { icon: Beef, title: "Premium Cuts", desc: "100% grass-fed Angus beef, never frozen" },
  { icon: Flame, title: "Flame Grilled", desc: "Open-flame charred for that perfect smoky crust" },
  { icon: Leaf, title: "Fresh Daily", desc: "Locally sourced produce delivered every morning" },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-3">Why Boss Burger</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Crafted Different</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-8 text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <r.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">{r.title}</h3>
              <p className="text-muted-foreground font-sans">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
