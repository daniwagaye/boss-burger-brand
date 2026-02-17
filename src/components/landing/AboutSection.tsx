import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <img
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop"
              alt="Boss Burger restaurant interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Born From a Love of Fire & Flavor
            </h2>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-4">
              Boss Burger started with a simple belief: that every bite should be unforgettable. We source the finest
              cuts, grind our patties fresh daily, and char them over open flames to lock in that smoky, juicy perfection.
            </p>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed">
              From our signature sauces to our artisan brioche buns, every element is crafted with obsessive attention to
              detail. This isn't fast food — it's a burger experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
