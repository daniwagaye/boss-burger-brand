import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const INGREDIENTS = [
  {
    name: "Angus Beef",
    desc: "100% grass-fed, hand-pressed daily for max flavor",
    icon: "🥩",
    color: "bg-red-50 dark:bg-red-950/30",
    titleColor: "text-primary",
  },
  {
    name: "Artisan Buns",
    desc: "Baked fresh every morning by local craft bakers",
    icon: "🥐",
    color: "bg-amber-50 dark:bg-amber-950/30",
    titleColor: "text-gold",
  },
  {
    name: "Signature Sauces",
    desc: "House-made, never from a bottle, always scratch-made",
    icon: "🫙",
    color: "bg-orange-50 dark:bg-orange-950/30",
    titleColor: "text-primary",
  },
  {
    name: "Farm Veggies",
    desc: "Crisp lettuce, ripe tomatoes, hand-sliced daily",
    icon: "🥬",
    color: "bg-green-50 dark:bg-green-950/30",
    titleColor: "text-gold",
  },
  {
    name: "Zero Shortcuts",
    desc: "No frozen, no artificial flavors — ever. Period.",
    icon: "👍",
    color: "bg-blue-50 dark:bg-blue-950/30",
    titleColor: "text-primary",
  },
  {
    name: "Made to Order",
    desc: "Every burger built fresh when you call. No heat lamps.",
    icon: "⚡",
    color: "bg-purple-50 dark:bg-purple-950/30",
    titleColor: "text-gold",
  },
];

export default function SignatureIngredients() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-gold font-sans text-xs tracking-[0.3em] uppercase mb-3">Quality First</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Signature <span className="italic text-primary">Ingredients</span>
          </h2>
          <p className="text-muted-foreground font-sans text-base max-w-md">
            Every component matters. We obsess over every detail so you taste the difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${ing.color} rounded-2xl p-5 flex items-start gap-4 border border-border/30`}
            >
              <div className="text-3xl mt-0.5 flex-shrink-0">{ing.icon}</div>
              <div>
                <h3 className={`font-display text-lg font-bold mb-1 ${ing.titleColor}`}>{ing.name}</h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">{ing.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

