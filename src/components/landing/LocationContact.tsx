import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Phone, MapPin, Clock } from "lucide-react";

const PHONE = "tel:+15551234567";

export default function LocationContact() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-3">Find Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Visit Boss Burger</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden aspect-video bg-muted"
          >
            <div className="w-full h-full flex items-center justify-center text-muted-foreground font-sans">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-3 text-primary" />
                <p className="text-lg font-semibold">Map Placeholder</p>
                <p className="text-sm">Embed your Google Map here</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Address</h3>
                <p className="text-muted-foreground font-sans">123 Burger Lane, Flavor Town, CA 90210</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Hours</h3>
                <p className="text-muted-foreground font-sans">Mon–Fri: 11am – 10pm</p>
                <p className="text-muted-foreground font-sans">Sat–Sun: 10am – 11pm</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Call Us</h3>
                <p className="text-muted-foreground font-sans">+1 (555) 123-4567</p>
              </div>
            </div>

            <a
              href={PHONE}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-sans font-bold text-lg glow-crimson hover:scale-105 transition-transform shadow-xl"
            >
              <Phone size={20} />
              Call Now to Order
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
