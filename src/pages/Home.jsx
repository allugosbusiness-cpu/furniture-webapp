import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import NegotiateModal from '../components/NegotiateModal';
import { products } from '../data/products';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  const [negotiateOpen, setNegotiateOpen] = useState(false);
  const featured = products.slice(0, 4);
  const negotiableFeatured = products.filter(p => p.negotiable && p.inStock).slice(0, 4);

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-granite-noir/80 via-granite-noir/40 to-granite-noir/80 z-10" />
          <img
            src="/product-more-1.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-32 w-full">
          <motion.div
            initial="initial"
            animate="animate"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-savanna-ochre font-heading text-xs tracking-[0.3em] uppercase mb-6"
            >
              Premium Furniture
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading font-bold text-white leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
            >
              Where Craft Meets<br />
              <span className="text-gradient">African Heritage</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl"
            >
              Discover premium, artisan-crafted furniture blending Zimbabwean tradition with modern design. Every piece tells a story.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-savanna-ochre text-white px-8 py-4 font-heading text-sm tracking-wider uppercase font-semibold hover:bg-savanna-ochre/90 transition-all rounded-lg"
              >
                Explore Collection
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <button
                onClick={() => setNegotiateOpen(true)}
                className="inline-flex items-center gap-2 bg-transparent text-white border-2 border-savanna-ochre/60 hover:border-savanna-ochre px-8 py-4 font-heading text-sm tracking-wider uppercase font-semibold hover:bg-savanna-ochre/20 transition-all rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Negotiate a Deal
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </motion.div>
      </section>

      {/* Features Strip */}
      <section className="relative py-12 bg-granite-noir border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: 'shield', title: 'Authentic Craftsmanship', desc: 'Handcrafted by Zimbabwean artisans' },
              { icon: 'truck', title: 'Nationwide Delivery', desc: 'Delivering across Zimbabwe' },
              { icon: 'heart', title: 'Negotiable Pricing', desc: 'Direct from artisans, fair prices' },
              { icon: 'check', title: 'Sustainable Materials', desc: 'Eco-friendly & ethically sourced' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-savanna-ochre/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c17028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                    {item.icon === 'truck' && <><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v3"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="18" r="2.5"/></>}
                    {item.icon === 'heart' && <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>}
                    {item.icon === 'check' && <polyline points="20 6 9 17 4 12"/>}
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-iron_ore text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-savanna-ochre font-heading text-xs tracking-[0.4em] uppercase mb-4">Featured Pieces</p>
            <h2 className="font-heading font-bold text-foreground mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Our Collection
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each piece is thoughtfully curated to bring warmth, character, and the spirit of Zimbabwe into your home.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-savanna-ochre text-white px-8 py-4 font-heading text-sm tracking-wider uppercase font-semibold hover:bg-savanna-ochre/90 transition-all rounded-lg"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative bg-granite-noir py-24 md:py-32 px-6 overflow-hidden">
        {/* Background decorative geometry */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-savanna-ochre/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-savanna-ochre/3 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80"
                  alt="Our workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-savanna-ochre text-white p-6 rounded-xl hidden md:block">
                <p className="font-heading font-bold text-3xl">15+</p>
                <p className="text-sm text-white/70">Years of Craftsmanship</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-savanna-ochre font-heading text-xs tracking-[0.3em] uppercase mb-4">Our Story</p>
              <h2 className="font-heading font-bold text-white mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                Crafted with Passion, Rooted in Tradition
              </h2>
              <div className="space-y-4 text-iron_ore leading-relaxed mb-8">
                <p>
                  Furniture Hub ZW was born from a desire to showcase the incredible talent of Zimbabwean artisans to the world. We work directly with master craftspeople across Zimbabwe, from the stone carvers of Tengenenge to the woodworkers of Mutare.
                </p>
                <p>
                  Every piece in our collection is a testament to the skill, creativity, and cultural heritage of Zimbabwe. We believe in fair trade, sustainable practices, and furniture that tells a story.
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-savanna-ochre border-2 border-savanna-ochre px-8 py-3 font-heading text-sm tracking-wider uppercase font-semibold hover:bg-savanna-ochre hover:text-white transition-all rounded-lg"
              >
                Explore Collection
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-savanna-ochre font-heading text-xs tracking-[0.4em] uppercase mb-6">Visit Our Showroom</p>
            <h2 className="font-heading font-bold text-foreground mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
              Experience the Craft Firsthand
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Visit our Harare showroom to see, touch, and experience our collection in person. Our team is ready to help you find the perfect piece.
            </p>
            <div className="flex items-center justify-center gap-3 text-savanna-ochre font-heading font-semibold text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Samora Machel Ave, Harare, Zimbabwe
            </div>
          </motion.div>
        </div>
      </section>

      {/* Negotiate a Deal Section */}
      <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-transparent via-savanna-ochre/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 mb-4 bg-savanna-ochre/10 text-savanna-ochre font-heading text-[10px] tracking-[0.3em] uppercase rounded-full border border-savanna-ochre/20">
              💰 Best Prices
            </span>
            <h2 className="font-heading font-bold text-foreground mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Negotiate a <span className="text-gradient">Deal</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Love a piece but want a better price? Make us an offer — every item with the "Negotiable" tag is open for discussion. Name your price and we'll get back to you.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setNegotiateOpen(true)}
              className="inline-flex items-center gap-3 bg-savanna-ochre text-white px-10 py-5 font-heading text-sm tracking-wider uppercase font-semibold rounded-xl hover:bg-savanna-ochre/90 transition-all shadow-lg shadow-savanna-ochre/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>
              </svg>
              Start Negotiating
            </motion.button>
          </motion.div>

          {/* Negotiable products preview */}
          {negotiableFeatured.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            >
              {negotiableFeatured.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative group cursor-pointer gradient-border rounded-xl overflow-hidden"
                  onClick={() => setNegotiateOpen(true)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 img-overlay" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white/70 text-[10px] uppercase tracking-wider font-heading mb-1">{product.category}</p>
                    <h3 className="font-heading font-semibold text-white text-sm mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-savanna-ochre text-lg">${product.price.toLocaleString()}</span>
                      <span className="text-[10px] uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Negotiable</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="text-center mt-10">
            <p className="text-muted-foreground text-sm">
              All negotiable items are marked with a <span className="text-green-600 font-semibold">Negotiable</span> badge
            </p>
          </div>
        </div>
      </section>

      {/* Negotiate Modal */}
      <NegotiateModal isOpen={negotiateOpen} onClose={() => setNegotiateOpen(false)} />

      <Footer />
    </div>
  );
}
