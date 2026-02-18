import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const INGREDIENTS = [
  {
    name: "Angus Beef",
    desc: "100% grass-fed, hand-pressed daily for max flavor",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <ellipse cx="24" cy="26" rx="16" ry="11" fill="#c0392b" opacity="0.9"/>
        <ellipse cx="24" cy="24" rx="15" ry="10" fill="#e74c3c"/>
        <path d="M14 20 Q18 14 24 16 Q30 14 34 20" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <ellipse cx="19" cy="21" rx="3" ry="2" fill="#c0392b" opacity="0.5"/>
        <ellipse cx="29" cy="22" rx="2.5" ry="1.5" fill="#c0392b" opacity="0.5"/>
      </svg>
    ),
    color: "bg-red-50 dark:bg-red-950/30",
    titleColor: "text-primary",
  },
  {
    name: "Artisan Buns",
    desc: "Baked fresh every morning by local craft bakers",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M8 30 Q8 38 24 38 Q40 38 40 30 L40 32 Q40 36 24 36 Q8 36 8 32 Z" fill="#b7791f"/>
        <path d="M8 28 Q8 18 24 16 Q40 18 40 28 Q40 32 24 32 Q8 32 8 28 Z" fill="#f6ad55"/>
        <path d="M12 26 Q14 20 24 19 Q34 20 36 26" stroke="#ed8936" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="24" cy="20" rx="6" ry="2" fill="#fbd38d" opacity="0.7"/>
      </svg>
    ),
    color: "bg-amber-50 dark:bg-amber-950/30",
    titleColor: "text-gold",
  },
  {
    name: "Signature Sauces",
    desc: "House-made, never from a bottle, always scratch-made",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect x="16" y="10" width="16" height="26" rx="4" fill="#90cdf4"/>
        <rect x="18" y="8" width="12" height="4" rx="2" fill="#63b3ed"/>
        <rect x="20" y="6" width="8" height="3" rx="1.5" fill="#4299e1"/>
        <rect x="16" y="10" width="16" height="6" rx="2" fill="#bee3f8" opacity="0.6"/>
        <rect x="18" y="22" width="5" height="2" rx="1" fill="#4299e1" opacity="0.7"/>
        <rect x="18" y="26" width="8" height="2" rx="1" fill="#4299e1" opacity="0.5"/>
      </svg>
    ),
    color: "bg-orange-50 dark:bg-orange-950/30",
    titleColor: "text-primary",
  },
  {
    name: "Farm Veggies",
    desc: "Crisp lettuce, ripe tomatoes, hand-sliced daily",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M24 36 C24 36 10 28 10 18 C10 12 16 8 22 10 C23 10 23.5 11 24 11 C24.5 11 25 10 26 10 C32 8 38 12 38 18 C38 28 24 36 24 36Z" fill="#48bb78"/>
        <path d="M24 36 C24 36 18 26 20 18 C21 14 23 12 24 11" stroke="#276749" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M14 16 Q19 14 22 18" stroke="#276749" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M34 16 Q29 14 26 18" stroke="#276749" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
    color: "bg-green-50 dark:bg-green-950/30",
    titleColor: "text-gold",
  },
  {
    name: "Zero Shortcuts",
    desc: "No frozen, no artificial flavors — ever. Period.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <circle cx="24" cy="24" r="14" fill="#4299e1" opacity="0.15"/>
        <path d="M16 24 L21 29 L32 18" stroke="#4299e1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "bg-blue-50 dark:bg-blue-950/30",
    titleColor: "text-primary",
  },
  {
    name: "Made to Order",
    desc: "Every burger built fresh when you call. No heat lamps.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M24 8 L26.5 18 L37 18 L28.5 24.5 L31.5 35 L24 29 L16.5 35 L19.5 24.5 L11 18 L21.5 18 Z" fill="#f6ad55" stroke="#ed8936" strokeWidth="1"/>
      </svg>
    ),
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
          className="mb-12 text-center"
        >
          <p className="text-gold font-sans text-xs tracking-[0.3em] uppercase mb-3">Quality First</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Signature <span className="italic text-primary">Ingredients</span>
          </h2>
          <p className="text-muted-foreground font-sans text-base max-w-md mx-auto">
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
              <div className="mt-0.5 flex-shrink-0">{ing.icon}</div>
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
