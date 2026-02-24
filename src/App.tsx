import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Plus, 
  Minus, 
  MapPin, 
  Phone, 
  Clock, 
  ChevronRight,
  Menu,
  Trash2,
  Truck,
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, Product, ProductOption } from './constants';
import { ProductCard } from './component/product-card';

interface CartItem {
  productId: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
}



export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const deliveryFee = deliveryMethod === 'delivery' ? 7 : 0;
  const total = subtotal + deliveryFee;

  const addToCart = (product: Product, option: ProductOption) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.weight === option.weight
      );
      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        weight: option.weight,
        price: option.price,
        quantity: 1,
        image: product.image
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, weight: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.productId === productId && item.weight === weight) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.weight === weight)));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-brand-primary text-white py-2 px-4 text-center text-sm font-medium">
        Authentic African Groceries Delivered in Birmingham • Free Pickup Available
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-stone-600"
              >
                <Menu size={24} />
              </button>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-brand-primary leading-tight">PRADOM</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-1">Global Limited</span>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search for rice, beans, spices..."
                  className="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-full focus:ring-2 focus:ring-brand-primary transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end text-xs text-stone-500">
                <span className="font-semibold text-stone-900">Birmingham, UK</span>
                <span>Open: 9AM - 8PM</span>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-brand-primary text-white rounded-full hover:bg-red-900 transition-colors shadow-md"
              >
                <ShoppingBag size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="md:hidden p-4 bg-white border-b border-stone-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 bg-stone-100 border-none rounded-xl focus:ring-2 focus:ring-brand-primary text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12 relative rounded-3xl overflow-hidden bg-brand-primary h-[300px] sm:h-[400px] flex items-center">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop" 
              alt="Supermarket background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 px-8 sm:px-16 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-6xl font-display font-bold text-white mb-4 leading-tight">
                Authentic African <br />
                <span className="text-red-200 italic">Quality</span> Groceries
              </h1>
              <p className="text-red-50 text-lg mb-8 max-w-md">
                Fresh, raw, and authentic ingredients sourced directly for your kitchen in Birmingham.
              </p>
              <button className="bg-white text-brand-primary hover:bg-red-50 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg">
                Shop Now
              </button>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedCategory("All")}
              className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === "All" 
                ? "bg-brand-primary text-white shadow-md" 
                : "bg-white text-stone-600 border border-stone-200 hover:border-brand-primary"
              }`}
            >
              All Products
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? "bg-brand-primary text-white shadow-md" 
                  : "bg-white text-stone-600 border border-stone-200 hover:border-brand-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-stone-900">{selectedCategory}</h2>
              <p className="text-stone-500 text-sm">Showing {filteredProducts.length} authentic items</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-stone-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-stone-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">No products found</h3>
              <p className="text-stone-500">Try adjusting your search or category filter.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex flex-col mb-6">
                <span className="text-2xl font-display font-bold text-white leading-tight">PRADOM</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-1">Global Limited</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Your number one destination for authentic African groceries in Birmingham. We pride ourselves on quality and authenticity.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">
                  <Phone size={18} className="text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer">
                  <MapPin size={18} className="text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Delivery Information</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Store Info</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin size={18} className="text-red-600 shrink-0" />
                  <span>Birmingham, United Kingdom</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="text-red-600 shrink-0" />
                  <span>+44 (0) 121 XXX XXXX</span>
                </li>
                <li className="flex gap-3">
                  <Clock size={18} className="text-red-600 shrink-0" />
                  <span>Mon - Sat: 9:00 - 20:00<br />Sun: 11:00 - 17:00</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-sm mb-4">Get updates on new arrivals and special offers.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-brand-accent"
                />
                <button className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-16 pt-8 text-center text-xs">
            <p>© 2026 PRADOM GLOBAL LIMITED. All rights reserved. Registered in England & Wales.</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-brand-primary" />
                  <h2 className="text-xl font-bold">Your Basket</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="bg-stone-50 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag size={40} className="text-stone-300" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">Your basket is empty</h3>
                    <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-brand-primary text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-900 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={`${item.productId}-${item.weight}`} className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-bold text-stone-900 leading-tight">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.productId, item.weight)}
                              className="text-stone-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-stone-500 mb-3">{item.weight}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border border-stone-200 rounded-lg">
                              <button 
                                onClick={() => updateQuantity(item.productId, item.weight, -1)}
                                className="p-1 hover:bg-stone-50 text-stone-600"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-3 text-sm font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.productId, item.weight, 1)}
                                className="p-1 hover:bg-stone-50 text-stone-600"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="font-bold text-brand-primary">£{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-stone-50 border-t border-stone-100">
                  <div className="space-y-4 mb-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setDeliveryMethod('delivery')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                          deliveryMethod === 'delivery' 
                          ? 'border-brand-primary bg-red-50 text-brand-primary font-bold' 
                          : 'border-stone-200 bg-white text-stone-500'
                        }`}
                      >
                        <Truck size={18} />
                        <span>Delivery</span>
                      </button>
                      <button 
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                          deliveryMethod === 'pickup' 
                          ? 'border-brand-primary bg-red-50 text-brand-primary font-bold' 
                          : 'border-stone-200 bg-white text-stone-500'
                        }`}
                      >
                        <Store size={18} />
                        <span>Pickup</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-stone-600">
                        <span>Subtotal</span>
                        <span>£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-stone-600">
                        <span>{deliveryMethod === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}</span>
                        <span>{deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-stone-900 pt-2 border-t border-stone-200">
                        <span>Total</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-red-900 transition-all shadow-lg flex items-center justify-center gap-2">
                    Checkout Now
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-full max-w-[280px] bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xl font-display font-bold text-brand-primary leading-tight">PRADOM</span>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-red-600 -mt-1">Global Limited</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  <p className="px-4 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider">Categories</p>
                  <button 
                    onClick={() => { setSelectedCategory("All"); setIsMenuOpen(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium ${selectedCategory === "All" ? "bg-red-50 text-brand-primary" : "text-stone-600"}`}
                  >
                    All Products
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setIsMenuOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium ${selectedCategory === cat ? "bg-red-50 text-brand-primary" : "text-stone-600"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-stone-100">
                <div className="flex items-center gap-3 text-sm text-stone-500">
                  <MapPin size={16} className="text-brand-accent" />
                  <span>Birmingham, UK</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

