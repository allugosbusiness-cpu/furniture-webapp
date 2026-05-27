import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

export default function NegotiateModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', offerPrice: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const negotiableProducts = products.filter(p => p.negotiable && p.inStock);

  const resetForm = () => {
    setStep(1);
    setSelectedProduct(null);
    setForm({ name: '', email: '', phone: '', offerPrice: '', message: '' });
    setSending(false);
    setSent(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Build WhatsApp message
    const message = encodeURIComponent(
      `🤝 *New Deal Negotiation!*\n\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `*Customer Details:*\n` +
      `👤 Name: ${form.name}\n` +
      `📧 Email: ${form.email}\n` +
      `📞 Phone: ${form.phone}\n\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `*Interested In:*\n` +
      `🪑 ${selectedProduct.name}\n` +
      `💰 Listed Price: $${selectedProduct.price.toLocaleString()}\n` +
      `💵 My Offer: $${parseInt(form.offerPrice).toLocaleString()}\n\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `*Message:*\n${form.message || "I'd like to negotiate on this piece."}\n\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `🕐 ${new Date().toLocaleString("en-ZW", { timeZone: "Africa/Harare" })}`
    );

    const whatsappUrl = `https://wa.me/263782082093?text=${message}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.open(whatsappUrl, "_blank");
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
          >
            <div className="bg-[hsl(30,20%,95%)] rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-iron_ore/10">
                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground">
                    {sent ? "Offer Sent! 🎉" : step === 1 ? "Negotiate a Deal" : "Make Your Offer"}
                  </h2>
                  {!sent && (
                    <p className="text-muted-foreground text-sm mt-1">
                      {step === 1
                        ? "Select a piece you're interested in"
                        : `Offering on: ${selectedProduct?.name}`}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-iron_ore/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {sent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p className="font-heading font-semibold text-lg mb-2">Offer Sent to Owner!</p>
                    <p className="text-muted-foreground text-sm">
                      They'll get back to you via WhatsApp shortly.
                    </p>
                  </div>
                ) : step === 1 ? (
                  /* Step 1: Select Product */
                  <div className="space-y-3">
                    {negotiableProducts.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No negotiable products available right now.</p>
                    ) : (
                      negotiableProducts.map(product => (
                        <button
                          key={product.id}
                          onClick={() => selectProduct(product)}
                          className="w-full flex items-center gap-4 p-4 rounded-xl border border-iron_ore/10 hover:border-savanna-ochre/30 hover:bg-savanna-ochre/5 transition-all text-left group"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-iron_ore/10">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-heading font-semibold text-sm group-hover:text-savanna-ochre transition-colors">{product.name}</p>
                            <p className="text-xs text-iron_ore mt-0.5">{product.category}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-heading font-bold text-savanna-ochre">${product.price.toLocaleString()}</p>
                            <span className="text-[10px] uppercase tracking-wider text-green-600">Negotiable</span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                ) : (
                  /* Step 2: Offer Form */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Selected Product Summary */}
                    <div className="flex items-center gap-3 p-3 bg-savanna-ochre/5 rounded-xl border border-savanna-ochre/20">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-semibold text-sm">{selectedProduct.name}</p>
                        <p className="text-xs text-iron_ore">Listed: ${selectedProduct.price.toLocaleString()}</p>
                      </div>
                      <button type="button" onClick={() => setStep(1)} className="text-xs text-savanna-ochre font-heading uppercase tracking-wider hover:underline">
                        Change
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        required
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="col-span-2 md:col-span-1 h-12 px-4 border-2 border-iron_ore/20 bg-transparent text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        required
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="col-span-2 md:col-span-1 h-12 px-4 border-2 border-iron_ore/20 bg-transparent text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                      />
                      <input
                        type="tel"
                        placeholder="Phone *"
                        required
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        className="col-span-2 h-12 px-4 border-2 border-iron_ore/20 bg-transparent text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-iron_ore mb-1.5 font-heading">
                        Your Offer Price ($)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 1500"
                        required
                        min="1"
                        max={selectedProduct.price}
                        value={form.offerPrice}
                        onChange={e => setForm({...form, offerPrice: e.target.value})}
                        className="w-full h-12 px-4 border-2 border-iron_ore/20 bg-transparent text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                      />
                      <p className="text-xs text-iron_ore mt-1">
                        Listed price: <span className="text-savanna-ochre font-semibold">${selectedProduct.price.toLocaleString()}</span>
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm text-iron_ore mb-1.5 font-heading">
                        Message (optional)
                      </label>
                      <textarea
                        placeholder="Any details about your offer..."
                        value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        rows={3}
                        className="w-full p-4 border-2 border-iron_ore/20 bg-transparent text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg resize-none"
                      />
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={sending}
                      className="w-full py-3.5 bg-savanna-ochre text-white font-heading text-sm tracking-wider uppercase font-semibold rounded-lg hover:bg-savanna-ochre/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? "Sending Offer..." : "Send Offer via WhatsApp"}
                    </motion.button>

                    <p className="text-xs text-center text-iron_ore">
                      Your offer will be sent directly to the owner via WhatsApp
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}