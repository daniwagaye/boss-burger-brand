import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

const PHONE = "tel:+15551234567";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark py-3 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold tracking-wider text-primary-foreground">
            BOSS<span className="text-primary">BURGER</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavItem to="/" label="Home" />
            <NavItem to="/menu" label="Menu" />
            <button onClick={toggle} className="p-2 rounded-full hover:bg-muted/20 transition-colors text-primary-foreground">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href={PHONE}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-sans font-semibold text-sm hover:scale-105 transition-transform glow-crimson"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-full hover:bg-muted/20 transition-colors text-primary-foreground">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-primary-foreground">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-dark overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                <Link to="/" className="text-primary-foreground font-sans text-lg py-2" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/menu" className="text-primary-foreground font-sans text-lg py-2" onClick={() => setMenuOpen(false)}>Menu</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile floating Call button */}
      <a
        href={PHONE}
        className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-sans font-bold text-sm shadow-2xl glow-crimson hover:scale-105 transition-transform"
      >
        <Phone size={18} />
        Call Now
      </a>
    </>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="text-primary-foreground/80 hover:text-primary-foreground font-sans text-sm font-medium tracking-wide transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
    >
      {label}
    </Link>
  );
}
