import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const PHONE = "tel:+15551234567";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl font-bold text-foreground">
              BOSS<span className="text-primary">BURGER</span>
            </p>
            <p className="text-muted-foreground font-sans text-sm mt-1">Bigger Taste. Better Burgers.</p>
          </div>
          <div className="flex items-center gap-6 font-sans text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-foreground transition-colors">Menu</Link>
            <a href={PHONE} className="inline-flex items-center gap-1 text-primary font-semibold hover:underline">
              <Phone size={14} />
              Call Now
            </a>
          </div>
        </div>
        <div className="text-center text-muted-foreground font-sans text-xs mt-8">
          © {new Date().getFullYear()} Boss Burger. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
