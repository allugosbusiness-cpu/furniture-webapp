import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { getProduct } from '../data/products';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="relative z-10">
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-savanna-ochre/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c17028" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <h2 className="font-heading font-bold text-2xl mb-3">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">Start adding some furniture pieces to your collection.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-savanna-ochre text-white px-8 py-3 font-heading text-sm tracking-wider uppercase font-semibold rounded-lg hover:bg-savanna-ochre/90 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <p className="text-savanna-ochre font-heading text-xs tracking-[0.4em] uppercase mb-3">Your Collection</p>
        <h1 className="font-heading font-bold text-foreground mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)' }}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="space-y-4">
            <AnimatePresence>
              {cart.map(item => {
                const p = getProduct(item.product_id);
                if (!p) return null;
                const itemTotal = (item.negotiated_price || p.price) * item.quantity;

                return (
                  <motion.div
                    key={item.product_id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, padding: 0, margin: 0 }}
                    className="flex gap-4 p-4 lg:p-6 bg-card rounded-xl border border-iron_ore/10"
                  >
                    <div className="w-24 h-20 lg:w-28 lg:h-24 rounded-lg overflow-hidden shrink-0 bg-iron_ore/10">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="font-heading font-semibold text-sm lg:text-base truncate">{p.name}</h3>
                        <p className="text-xs uppercase tracking-wider text-iron_ore mt-0.5">{p.category}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-iron_ore/30 rounded-md hover:bg-iron_ore/10 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                          </button>
                          <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-iron_ore/30 rounded-md hover:bg-iron_ore/10 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading font-bold text-savanna-ochre">${itemTotal.toLocaleString()}</span>
                          <button
                            onClick={() => removeFromCart(item.product_id)}
                            className="text-red-400 hover:text-red-500 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="bg-granite-noir text-stone-clay p-6 lg:p-8 rounded-xl h-fit sticky top-28">
            <h3 className="font-heading font-bold text-xl mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.map(item => {
                const p = getProduct(item.product_id);
                if (!p) return null;
                return (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-iron_ore">{p.name} × {item.quantity}</span>
                    <span className="text-savanna-ochre font-semibold">
                      ${((item.negotiated_price || p.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="border-t-2 border-iron_ore/20 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-heading font-semibold text-lg">Total</span>
                <span className="font-heading font-bold text-2xl text-savanna-ochre">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full py-3.5 bg-savanna-ochre text-white text-center font-heading text-sm tracking-wider uppercase font-semibold rounded-lg hover:bg-savanna-ochre/90 transition-all"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/products"
              className="block w-full py-3.5 mt-3 border border-white/20 text-stone-clay text-center font-heading text-sm tracking-wider uppercase font-semibold rounded-lg hover:bg-white/5 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}