import { motion } from "framer-motion";
import { useScrollAnimation, useParallax } from "@/hooks/useScrollAnimation";

const INGREDIENTS = [
  { name: "Angus Beef", img: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=400&fit=crop" },
  { name: "Artisan Buns", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" },
  { name: "Fresh Produce", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop" },
  { name: "Secret Sauces", img: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop" },
];

export default function SignatureIngredients() {
  const { ref, isVisible } = useScrollAnimation();
  const scrollY = useParallax();

  return (
    <section ref={ref} className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-3">What Goes In</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Signature Ingredients</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring" }}
              style={{ transform: `translateY(${(scrollY - 1500) * (i % 2 === 0 ? 0.03 : -0.03)}px)` }}
              className="group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                <img
                  src={ing.img}
                  alt={ing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <p className="text-center font-display text-lg font-bold text-foreground">{ing.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
