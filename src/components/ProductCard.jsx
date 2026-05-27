import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index = 0 }) {
  const { cart, addToCart } = useCart();
  const inCart = cart.find(c => c.product_id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="card-3d group relative bg-card rounded-xl overflow-hidden border border-iron_ore/10"
    >
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block overflow-hidden relative aspect-[4/3]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 img-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-granite-noir text-white px-3 py-1 font-heading text-[10px] tracking-widest uppercase rounded-sm">
            Sold Out
          </div>
        )}
        {product.comparePrice && product.inStock && (
          <div className="absolute top-3 right-3 bg-savanna-ochre text-white px-3 py-1 font-heading text-[10px] tracking-widest uppercase rounded-sm">
            {Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-5">
        <p className="font-heading text-[10px] tracking-[0.15em] uppercase text-iron_ore mb-2">
          {product.category}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-savanna-ochre transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-heading font-bold text-xl text-savanna-ochre">
            ${product.price.toLocaleString()}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-iron_ore line-through">
              ${product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
          disabled={!product.inStock}
          className="w-full py-3 px-6 font-heading text-xs tracking-[0.15em] uppercase font-semibold rounded-lg transition-all bg-savanna-ochre text-white hover:bg-savanna-ochre/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {inCart ? (
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Add Another
            </span>
          ) : (
            "Add to Cart"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}