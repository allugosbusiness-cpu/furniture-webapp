import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { getProduct } from '../data/products';

export default function Checkout() {
  const { cart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState("hub_collection");
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    navigate('/cart', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    const customerName = formData.get("name");
    const customerEmail = formData.get("email");
    const customerPhone = formData.get("phone");
    const deliveryMethod = formData.get("delivery");
    const deliveryAddress = formData.get("address") || "";
    const deliveryCity = formData.get("city") || "";
    const notes = formData.get("notes") || "";

    const order = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      delivery: deliveryMethod,
      address: deliveryAddress,
      city: deliveryCity,
      notes: notes,
      items: [...cart],
      total: cartTotal,
      date: new Date().toISOString()
    };

    sessionStorage.setItem("lastOrder", JSON.stringify(order));

    // Build WhatsApp message
    const productLines = cart.map(item => {
      const p = getProduct(item.product_id);
      if (!p) return "";
      const lineTotal = (item.negotiated_price || p.price) * item.quantity;
      return `• ${p.name} × ${item.quantity} — $${lineTotal.toLocaleString()}`;
    }).join("\n");

    const deliveryInfo = deliveryMethod === "regional_delivery"
      ? `📍 Delivery: ${deliveryAddress}, ${deliveryCity}`
      : "📍 Collection: Harare Showroom (Free)";

    const message = encodeURIComponent(
      `🪑 *New Furniture Order!*\n\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `*Customer Details:*\n` +
      `👤 Name: ${customerName}\n` +
      `📧 Email: ${customerEmail}\n` +
      `📞 Phone: ${customerPhone}\n\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `*Order Summary:*\n${productLines}\n\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `*Total: $${cartTotal.toLocaleString()}*\n\n` +
      `${deliveryInfo}\n` +
      `${notes ? `📝 Notes: ${notes}` : ""}\n\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `🕐 ${new Date().toLocaleString("en-ZW", { timeZone: "Africa/Harare" })}`
    );

    // Send via WhatsApp (open WhatsApp Web with pre-filled message)
    const whatsappUrl = `https://wa.me/263775585364?text=${message}`;

    // Clear cart
    clearCart();

    // Navigate to confirmation, then open WhatsApp
    navigate("/order-confirmed");
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 500);
  };

  return (
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 min-h-screen">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-heading text-xs tracking-[0.2em] uppercase transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Cart
        </Link>

        <p className="text-savanna-ochre font-heading text-xs tracking-[0.4em] uppercase mb-3">Finalize Your Order</p>
        <h1 className="font-heading font-bold text-foreground mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
            {/* Left: Fields */}
            <div className="space-y-10">
              {/* Your Details */}
              <section>
                <h3 className="font-heading font-bold text-xl text-foreground mb-6 pb-3 border-b-2 border-iron_ore/10">
                  Your Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    required
                    className="md:col-span-2 h-12 px-4 border-2 border-input bg-background text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    className="h-12 px-4 border-2 border-input bg-background text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    required
                    className="h-12 px-4 border-2 border-input bg-background text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                  />
                </div>
              </section>

              {/* Logistics */}
              <section>
                <h3 className="font-heading font-bold text-xl text-foreground mb-6 pb-3 border-b-2 border-iron_ore/10">
                  Local Logistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      delivery === "hub_collection"
                        ? "border-savanna-ochre bg-savanna-ochre/5"
                        : "border-iron_ore/20 hover:border-iron_ore/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="hub_collection"
                      checked={delivery === "hub_collection"}
                      onChange={() => setDelivery("hub_collection")}
                      className="hidden"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`mb-3 ${delivery === "hub_collection" ? "text-savanna-ochre" : "text-muted-foreground"}`}>
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/>
                    </svg>
                    <h4 className="font-heading font-bold text-foreground mb-1">Hub Collection</h4>
                    <p className="text-muted-foreground text-sm font-body">Pick up from our Harare showroom. Free of charge.</p>
                  </label>
                  <label
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      delivery === "regional_delivery"
                        ? "border-savanna-ochre bg-savanna-ochre/5"
                        : "border-iron_ore/20 hover:border-iron_ore/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="regional_delivery"
                      checked={delivery === "regional_delivery"}
                      onChange={() => setDelivery("regional_delivery")}
                      className="hidden"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`mb-3 ${delivery === "regional_delivery" ? "text-savanna-ochre" : "text-muted-foreground"}`}>
                      <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v3"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="18" r="2.5"/>
                    </svg>
                    <h4 className="font-heading font-bold text-foreground mb-1">Regional Delivery</h4>
                    <p className="text-muted-foreground text-sm font-body">Door-to-door delivery across Zimbabwe.</p>
                  </label>
                </div>

                {/* Delivery Address Fields (animated) */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={delivery === "regional_delivery" ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Delivery Address"
                      className="md:col-span-2 h-12 px-4 border-2 border-input bg-background text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className="h-12 px-4 border-2 border-input bg-background text-foreground font-body text-sm outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                    />
                  </div>
                </motion.div>
              </section>

              {/* Notes */}
              <section>
                <h3 className="font-heading font-bold text-xl text-foreground mb-6 pb-3 border-b-2 border-iron_ore/10">
                  Additional Notes
                </h3>
                <textarea
                  name="notes"
                  placeholder="Any special requests or notes for your order..."
                  className="w-full h-28 p-4 border-2 border-input bg-background text-foreground font-body text-sm resize-none outline-none focus:border-savanna-ochre transition-colors rounded-lg"
                />
              </section>
            </div>

            {/* Right: Order Summary */}
            <div className="bg-granite-noir text-stone-clay p-6 lg:p-8 rounded-xl h-fit sticky top-28">
              <h3 className="font-heading font-bold text-xl mb-6">Your Deal</h3>
              <div className="space-y-4 mb-6">
                {cart.map(item => {
                  const p = getProduct(item.product_id);
                  if (!p) return null;
                  return (
                    <div key={item.product_id} className="flex justify-between items-start text-sm">
                      <div>
                        <p className="text-stone-clay font-medium">{p.name}</p>
                        <p className="text-iron_ore text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-savanna-ochre font-semibold">
                        ${((item.negotiated_price || p.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t-2 border-iron_ore/20 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-heading font-semibold">Total</span>
                  <span className="font-heading font-bold text-2xl text-savanna-ochre">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-savanna-ochre text-white font-heading text-sm tracking-wider uppercase font-semibold rounded-lg hover:bg-savanna-ochre/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </button>
              <p className="text-iron_ore text-xs text-center mt-4 font-body">
                We'll contact you to confirm payment details
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}