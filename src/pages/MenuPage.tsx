import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, Flame, Milk, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import type { Tables } from "@/integrations/supabase/types";

type MenuItem = Tables<"menu_items">;
type Category = Tables<"categories">;

const TAG_ICONS: Record<string, typeof Flame> = {
  spicy: Flame,
  cheese: Milk,
  vegetarian: Leaf,
};

const PHONE = "tel:+15551234567";

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const load = async () => {
      const [{ data: cats }, { data: menuItems }] = await Promise.all([
        supabase.from("categories").select("*").order("sort_order"),
        supabase.from("menu_items").select("*").order("sort_order"),
      ]);
      setCategories(cats || []);
      setItems(menuItems || []);
      if (cats && cats.length > 0) setActiveCategory(cats[0].id);
    };
    load();
  }, []);

  const filtered = items.filter((i) => i.category_id === activeCategory);
  const activeCatName = categories.find(c => c.id === activeCategory)?.name || "";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="text-center mb-12 px-4">
          <p className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-3">Boss Burger</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground">Our Menu</h1>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="container mx-auto px-4">
          {categories.length === 0 ? (
            <p className="text-center text-muted-foreground font-sans py-12">Loading menu...</p>
          ) : (
            <div className="md:grid md:grid-cols-[200px_1fr] gap-12">
              {/* Category sidebar - desktop */}
              <div className="hidden md:block sticky top-28 self-start">
                <nav className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-display text-lg transition-all ${
                        activeCategory === cat.id
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Category tabs - mobile */}
              <div className="flex md:hidden gap-2 mb-8 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full font-sans text-sm font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Menu items */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {filtered.length === 0 ? (
                    <p className="text-center text-muted-foreground font-sans py-12">No items in {activeCatName} yet.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-6">
                      {filtered.map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ y: -4 }}
                          onClick={() => setSelectedItem(item)}
                          className="glass rounded-2xl overflow-hidden cursor-pointer group"
                        >
                          {item.image_url && (
                            <div className="aspect-[16/10] overflow-hidden">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="font-display text-xl font-bold text-foreground">{item.name}</h3>
                              <span className="text-primary font-display text-xl font-bold whitespace-nowrap">${Number(item.price).toFixed(2)}</span>
                            </div>
                            <p className="text-muted-foreground font-sans text-sm mt-1">{item.description}</p>
                            {item.tags.length > 0 && (
                              <div className="flex gap-2 mt-3">
                                {item.tags.map((tag) => {
                                  const Icon = TAG_ICONS[tag];
                                  return (
                                    <span key={tag} className="inline-flex items-center gap-1 text-xs font-sans font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                      {Icon && <Icon size={12} />}
                                      {tag}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Item detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {selectedItem.image_url && (
                <div className="relative aspect-[16/10]">
                  <img src={selectedItem.image_url} alt={selectedItem.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-display text-3xl font-bold text-foreground">{selectedItem.name}</h2>
                  <span className="text-primary font-display text-3xl font-bold">${Number(selectedItem.price).toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground font-sans mb-4">{selectedItem.description}</p>

                {selectedItem.tags.length > 0 && (
                  <div className="flex gap-2 mb-6">
                    {selectedItem.tags.map((tag) => {
                      const Icon = TAG_ICONS[tag];
                      return (
                        <span key={tag} className="inline-flex items-center gap-1 text-sm font-sans font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                          {Icon && <Icon size={14} />}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}

                {selectedItem.ingredients.length > 0 && (
                  <>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Ingredients</h3>
                    <ul className="grid grid-cols-2 gap-1 mb-6">
                      {selectedItem.ingredients.map((ing) => (
                        <li key={ing} className="text-muted-foreground font-sans text-sm">• {ing}</li>
                      ))}
                    </ul>
                  </>
                )}

                {!selectedItem.image_url && (
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted text-foreground flex items-center justify-center"
                  >
                    <X size={16} />
                  </button>
                )}

                <a
                  href={PHONE}
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-sans font-bold text-lg glow-crimson hover:scale-[1.02] transition-transform"
                >
                  <Phone size={20} />
                  Call to Order
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
