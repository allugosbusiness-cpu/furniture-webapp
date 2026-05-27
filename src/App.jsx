import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ThreeScene from './components/ThreeScene';
import { CartProvider } from './context/CartContext';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmed = lazy(() => import('./pages/OrderConfirmed'));

function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-muted border-t-savanna-ochre rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground font-heading text-sm tracking-wider uppercase">Loading...</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="relative z-10 min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-heading font-bold text-7xl text-savanna-ochre mb-4">404</h1>
        <h2 className="font-heading font-bold text-2xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-savanna-ochre text-white px-8 py-3 font-heading text-sm tracking-wider uppercase font-semibold rounded-lg hover:bg-savanna-ochre/90 transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = window.location;
  window.scrollTo(0, 0);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="relative min-h-screen">
          {/* 3D Background */}
          <ThreeScene />

          {/* Content */}
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmed" element={<OrderConfirmed />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}