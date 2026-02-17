import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronRight } from "lucide-react";

const FEATURED = [
  {
    name: "The Boss Classic",
    description: "Double smashed patty, aged cheddar, Boss sauce, brioche bun",
    price: "$14.99",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
  },
  {
    name: "Smoky BBQ Beast",
    description: "Hickory smoked bacon, crispy onion ring, tangy BBQ glaze",
    price: "$16.99",
    img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&h=500&fit=crop",
  },
  {
    name: "Truffle Royale",
    description: "Black truffle aioli, gruyère, wild mushrooms, arugula",
    price: "$18.99",
    img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&h=500&fit=crop",
  },
  {
    name: "Spicy Inferno",
    description: "Ghost pepper sauce, pepper jack, jalapeños, fire-roasted salsa",
    price: "$15.99",
    img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&h=500&fit=crop",
  },
];

export default function FeaturedMenu() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-3">Our Favorites</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Featured Burgers</h2>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-4 -mx-4 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:mx-0">
          {FEATURED.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="min-w-[280px] md:min-w-0 snap-center glass rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-foreground">{item.name}</h3>
                <p className="text-muted-foreground font-sans text-sm mt-1 line-clamp-2">{item.description}</p>
                <p className="text-primary font-display text-2xl font-bold mt-3">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-primary font-sans font-semibold text-lg hover:gap-3 transition-all"
          >
            View Full Menu <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
