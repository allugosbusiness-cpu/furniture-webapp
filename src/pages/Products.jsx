import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="relative z-10">
      {/* Page Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-orange-50" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-savanna-ochre font-heading text-xs tracking-[0.4em] uppercase mb-3">Our Collection</p>
            <h1 className="font-heading font-bold text-foreground mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              All Products
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Discover our range of premium, artisan-crafted furniture. Each piece is a unique blend of Zimbabwean heritage and modern design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters + Products */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map(cat => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`font-heading text-xs tracking-[0.15em] uppercase px-4 py-2.5 rounded-lg border transition-all ${
                  activeCategory === cat
                    ? 'bg-savanna-ochre border-savanna-ochre text-white'
                    : 'bg-transparent border-iron_ore/30 text-iron_ore hover:border-savanna-ochre hover:text-savanna-ochre'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-heading text-xl text-iron_ore">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}