import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Phone, MapPin, Clock, Instagram } from "lucide-react";

const PHONE = "tel:+09101002002";
const PHONE_DISPLAY = "0910100202";

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

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

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Map placeholder */}
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

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card rounded-3xl p-7 md:p-8 shadow-xl border border-border space-y-6"
          >
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Address</h3>
                <p className="text-muted-foreground font-sans text-sm mt-0.5">123 Burger Lane, Downtown, Your City</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Clock className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Hours</h3>
                <p className="text-muted-foreground font-sans text-sm mt-0.5">Mon – Sat: 11am – 10pm</p>
                <p className="text-muted-foreground font-sans text-sm">Sunday: 12pm – 9pm</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Phone</h3>
                <p className="text-muted-foreground font-sans text-sm mt-0.5">{PHONE_DISPLAY}</p>
              </div>
            </div>

            {/* Call Now button */}
            <a
              href={PHONE}
              className="flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground py-4 rounded-full font-sans font-bold text-base glow-crimson hover:scale-[1.02] transition-transform shadow-lg"
            >
              <Phone size={18} />
              Call Now — {PHONE_DISPLAY}
            </a>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 border border-border rounded-full py-3 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors font-sans text-sm font-medium"
              >
                <Instagram size={16} />
                Instagram
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 border border-border rounded-full py-3 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors font-sans text-sm font-medium"
              >
                <FacebookIcon size={16} />
                Facebook
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

