import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProduct, products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { cart, addToCart } = useCart();

  if (!product) {
    return (
      <div className="relative z-10 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Product Not Found</h2>
          <Link to="/products" className="btn btn-primary bg-savanna-ochre text-white px-6 py-3 font-heading text-sm tracking-wider uppercase rounded-lg">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const inCart = cart.find(c => c.product_id === product.id);
  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="relative z-10">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-heading text-xs tracking-[0.2em] uppercase transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-iron_ore/10 relative group">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-granite-noir text-white px-4 py-1.5 font-heading text-xs tracking-widest uppercase rounded-md">
                  Sold Out
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <div key={i} className="w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-savanna-ochre transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-savanna-ochre mb-3">
              {product.category}
            </p>
            <h1 className="font-heading font-bold text-foreground mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-heading font-bold text-3xl md:text-4xl text-savanna-ochre">
                ${product.price.toLocaleString()}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-iron_ore line-through">
                  ${product.comparePrice.toLocaleString()}
                </span>
              )}
              {product.negotiable && (
                <span className="font-heading text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 bg-savanna-ochre/10 text-savanna-ochre rounded-md">
                  Negotiable
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-heading font-semibold text-lg mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="w-5 h-5 flex items-center justify-center bg-savanna-ochre/10 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c17028" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stock */}
            <div className="mb-8">
              {product.inStock ? (
                <span className="inline-flex items-center gap-2 text-green-600 text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-orange-600 text-sm">
                  <span className="w-2 h-2 bg-orange-600 rounded-full" />
                  Currently Unavailable
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
              disabled={!product.inStock}
              className="w-full md:w-auto px-10 py-4 bg-savanna-ochre text-white font-heading text-sm tracking-wider uppercase font-semibold rounded-lg hover:bg-savanna-ochre/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {inCart ? "Add Another to Cart" : "Add to Cart"}
            </motion.button>

            {/* Cart notice */}
            {inCart && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-savanna-ochre/5 border border-savanna-ochre/20 rounded-lg"
              >
                <p className="text-sm text-savanna-ochre flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {inCart.quantity} × {product.name} in your cart
                </p>
                <Link
                  to="/cart"
                  className="inline-block mt-2 text-savanna-ochre border border-savanna-ochre px-4 py-1.5 font-heading text-[10px] tracking-wider uppercase rounded-md hover:bg-savanna-ochre hover:text-white transition-all"
                >
                  View Cart
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="px-6 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-bold text-2xl mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}