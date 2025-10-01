import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronRight,
  Hammer,
  Wrench,
  Minus,
  Plus,
  Trash2,
  Package,
  Sparkles,
  Check,
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Product[];
  handleSearch: (query: string) => void;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => string;
  completeOrder: () => void;
}

export default function Navigation({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSearch,
  cartItems,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getTotalItems,
  getTotalPrice,
  completeOrder,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleQuantityChange = (productId: number, value: string) => {
    const newQuantity = parseInt(value) || 0;
    updateCartQuantity(productId, newQuantity);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
    setSearchQuery('');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with glow effect */}
          <div className="flex items-center group">
            <Link href="/HomePage">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 text-white p-3 rounded-xl shadow-lg">
                  <img
                    src="/Logo/92hardwarelogo.jpeg"
                    alt="92 Hardware Logo"
                    className="h-10 w-10 object-contain"
                  />
                </div>
              </motion.div>
            </Link>
            <div className="ml-4 hidden md:block">
              <span className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                92 Hardware
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span className="text-xs text-purple-300 font-medium">Premium Tools & Materials</span>
              </div>
            </div>
          </div>

          {/* Desktop Menu with hover effects */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { name: 'Home', href: '/HomePage' },
              { name: 'Products', href: '/Products' },
            ].map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className="relative px-4 py-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-white font-semibold text-sm">
                    {item.name}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}

            {/* Enhanced Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <motion.div
                className="px-4 py-2 cursor-pointer group relative"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10 text-white font-semibold text-sm flex items-center">
                  Services
                  <motion.div
                    animate={{ rotate: isServicesDropdownOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.div>
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-2 w-72 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl ring-1 ring-purple-500/50 overflow-hidden"
                  >
                    <div className="p-2">
                      <Link href="/BuildingBlocks">
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 transition-all group cursor-pointer"
                        >
                          <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-12 h-12 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                            <Hammer className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white group-hover:text-purple-300 transition-colors">
                              Building Blocks
                            </div>
                            <div className="text-xs text-gray-400 group-hover:text-gray-300">
                              Custom concrete blocks & materials
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                        </motion.div>
                      </Link>
                      <Link href="/HardwareDealership">
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all group cursor-pointer"
                        >
                          <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                            <Wrench className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-white group-hover:text-blue-300 transition-colors">
                              Hardware Dealership
                            </div>
                            <div className="text-xs text-gray-400 group-hover:text-gray-300">
                              Complete hardware solutions
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                        </motion.div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { name: 'About', href: '/About' },
              { name: 'Contact', href: '/ContactUs' },
            ].map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className="relative px-4 py-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 text-white font-semibold text-sm">
                    {item.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Search & Cart */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search Button */}
            <motion.button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 rounded-xl bg-purple-600/20 text-white hover:bg-purple-600/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Enhanced Search */}
            <div className="relative hidden md:block">
              <motion.div
                initial={{ width: 200 }}
                whileFocus={{ width: 280 }}
                className="relative"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  placeholder="Search products..."
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-purple-500/30 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                />
                <Search className="h-5 w-5 text-purple-400 absolute left-3 top-3" />
              </motion.div>
              <AnimatePresence>
                {searchQuery && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {searchResults.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative group"
                      >
                        <div
                          className="px-4 py-3 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 cursor-pointer flex items-center transition-all"
                          onClick={() => handleAddToCart(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg mr-3 ring-2 ring-purple-500/30"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                              {product.name}
                            </div>
                            <div className="text-xs text-purple-400 font-bold">
                              {product.price}
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Plus className="h-4 w-4" />
                          </motion.div>
                        </div>
                        {addedToCart === product.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-500 text-white p-2 rounded-full"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Cart */}
            <div className="relative">
              <motion.button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-purple-500/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-6 w-6 text-white" />
                <AnimatePresence>
                  {getTotalItems() > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg ring-2 ring-slate-900"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <AnimatePresence>
                {isCartOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-96 bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-2 text-purple-400" />
                          Shopping Cart
                        </h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsCartOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </div>
                      {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                          <Package className="h-16 w-16 text-gray-600 mx-auto mb-3" />
                          <p className="text-gray-400">Your cart is empty</p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                          {cartItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-700/50 transition-all border border-purple-500/10"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg ring-2 ring-purple-500/30"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-bold text-white">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-purple-400 font-semibold">
                                  {item.price}
                                </p>
                                <div className="flex items-center mt-2 bg-slate-900/50 rounded-lg p-1 w-fit">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                      updateCartQuantity(item.id, item.quantity - 1)
                                    }
                                    className="p-1 rounded-md hover:bg-purple-600 transition-colors"
                                  >
                                    <Minus className="h-4 w-4 text-white" />
                                  </motion.button>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(item.id, e.target.value)
                                    }
                                    className="w-10 text-center bg-transparent text-white border-0 text-sm font-bold focus:outline-none"
                                  />
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                      updateCartQuantity(item.id, item.quantity + 1)
                                    }
                                    className="p-1 rounded-md hover:bg-purple-600 transition-colors"
                                  >
                                    <Plus className="h-4 w-4 text-white" />
                                  </motion.button>
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-lg transition-all"
                              >
                                <Trash2 className="h-5 w-5" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      {cartItems.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-purple-500/30">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-300 font-semibold">Total:</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                              {getTotalPrice()}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={completeOrder}
                            className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all relative overflow-hidden group"
                          >
                            <span className="relative z-10">Complete Order</span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-purple-600/20 text-white hover:bg-purple-600/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-slate-900 to-slate-800 border-t border-purple-500/30 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {[
                { name: 'Home', href: '/HomePage' },
                { name: 'Products', href: '/Products' },
              ].map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="block px-4 py-3 text-base font-semibold text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 rounded-lg transition-all"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
              <div className="px-4 py-3">
                <div className="text-base font-bold text-white mb-3">Services</div>
                <div className="space-y-2">
                  <Link href="/BuildingBlocks">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center p-2 text-sm text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg transition-all"
                    >
                      <Hammer className="h-4 w-4 mr-3 text-purple-400" />
                      Building Blocks Manufacturing
                    </motion.div>
                  </Link>
                  <Link href="/HardwareDealership">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center p-2 text-sm text-gray-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-all"
                    >
                      <Wrench className="h-4 w-4 mr-3 text-blue-400" />
                      Hardware Dealership
                    </motion.div>
                  </Link>
                </div>
              </div>
              {[
                { name: 'About', href: '/About' },
                { name: 'Contact', href: '/ContactUs' },
              ].map((item, index) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 2) * 0.05 }}
                    className="block px-4 py-3 text-base font-semibold text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 rounded-lg transition-all"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Panel */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-slate-900 to-slate-800 border-t border-purple-500/30 overflow-hidden"
          >
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  placeholder="Search products..."
                  className="w-full pl-11 pr-10 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all"
                  autoFocus
                />
                <Search className="h-5 w-5 text-purple-400 absolute left-3 top-3.5" />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                )}
              </div>
              <AnimatePresence>
                {searchQuery && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 space-y-2 max-h-96 overflow-y-auto custom-scrollbar"
                  >
                    {searchResults.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        <div
                          className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20 cursor-pointer transition-all border border-purple-500/10"
                          onClick={() => {
                            handleAddToCart(product);
                            setIsMobileSearchOpen(false);
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-lg ring-2 ring-purple-500/30"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">
                              {product.name}
                            </div>
                            <div className="text-xs text-purple-400 font-bold">
                              {product.price}
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </motion.div>
                        </div>
                        {addedToCart === product.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 text-white p-2 rounded-full shadow-lg"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                {searchQuery && searchResults.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center py-8"
                  >
                    <Package className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">No products found</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #60a5fa);
        }
      `}</style>
    </motion.nav>
  );
}