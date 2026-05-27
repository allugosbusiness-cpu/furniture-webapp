import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function OrderConfirmed() {
  const orderData = JSON.parse(sessionStorage.getItem("lastOrder") || "{}");

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-savanna-ochre/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c17028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 className="font-heading font-bold text-3xl text-foreground tracking-tight mb-3">
            Order Confirmed
          </h2>
          <p className="text-muted-foreground font-body mb-8">
            Thank you for your order! We'll contact you shortly at{" "}
            <strong>{orderData.email || "your email"}</strong> to confirm your delivery details.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-savanna-ochre text-white px-8 py-4 font-heading tracking-wider uppercase text-sm hover:bg-savanna-ochre/90 transition-all rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}