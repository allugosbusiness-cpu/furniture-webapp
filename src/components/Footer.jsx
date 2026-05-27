import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-granite-noir text-stone-clay">
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-savanna-ochre to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-savanna-ochre/30">
                <img
                  src="https://media.base44.com/images/public/69fc87a79a7a77406ee0b76a/c9630ce08_logo.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-lg">
                Furniture <span className="text-savanna-ochre">Hub</span> ZW
              </span>
            </div>
            <p className="text-iron_ore text-sm leading-relaxed max-w-sm">
              Redefining the Zimbabwean retail landscape with premium, artisan-crafted furniture that blends tradition with modern design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-iron_ore text-sm hover:text-stone-clay transition-colors">Home</Link>
              <Link to="/products" className="text-iron_ore text-sm hover:text-stone-clay transition-colors">Products</Link>
              <Link to="/cart" className="text-iron_ore text-sm hover:text-stone-clay transition-colors">Cart</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-6">Contact</h4>
            <div className="flex flex-col gap-4 text-iron_ore text-sm">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-savanna-ochre shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-savanna-ochre shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+263 78 208 2093</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-savanna-ochre shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>info@furniturehubzw.co.zw</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-iron_ore/60 text-xs">
            &copy; {new Date().getFullYear()} Furniture Hub ZW. All rights reserved.
          </p>
          <p className="text-iron_ore/40 text-xs">
            Website designed by <a href="https://allugostech.com" target="_blank" rel="noopener noreferrer" className="text-savanna-ochre hover:text-savanna-ochre/80 transition-colors font-semibold">AllugosTech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}