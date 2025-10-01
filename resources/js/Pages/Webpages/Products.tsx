import React, { useState, useRef } from 'react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { motion, useInView, Variants, TargetAndTransition, useMotionValue, useTransform } from 'framer-motion';
import { Wrench, Hammer, Zap, Filter, Phone, Mail, MapPin, ArrowRight, Sparkles, Star } from 'lucide-react';



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

export default function Products() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isCategoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' });
  const isProductsInView = useInView(productsRef, { once: true, margin: '-100px' });
  const isContactInView = useInView(contactRef, { once: true, margin: '-100px' });

  // Motion values for parallax
  const scrollY = useMotionValue(0);
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  // Animation variants
  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const products: Product[] = [
    { id: 1, name: "Professional Drill Set", price: "TSh 350,000", rating: 4.8, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", category: "Power Tools" },
    { id: 2, name: "Heavy Duty Hammer", price: "TSh 50,000", rating: 4.9, image: "https://images.unsplash.com/photo-1607870411590-d5e9e06da09a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0", category: "Hand Tools" },
    { id: 3, name: "Wire Stripper Tool", price: "TSh 30,000", rating: 4.7, image: "https://images.unsplash.com/photo-1726084396629-2175d5810dad?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0", category: "Electrical" },
    { id: 4, name: "Adjustable Wrench Set", price: "TSh 70,000", rating: 4.6, image: "https://plus.unsplash.com/premium_photo-1723874673961-a099a9ec566d?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0", category: "Hand Tools" },
    { id: 5, name: "Concrete Block Standard", price: "TSh 5,000", rating: 4.5, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", category: "Building Materials" },
    { id: 6, name: "PVC Pipe 2 inch", price: "TSh 25,000", rating: 4.4, image: "https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0", category: "Plumbing" },
    { id: 7, name: "Power Saw", price: "TSh 200,000", rating: 4.7, image: "https://plus.unsplash.com/premium_photo-1677480019971-80d7fbb25b7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0", category: "Power Tools" },
    { id: 8, name: "Screwdriver Set", price: "TSh 40,000", rating: 4.6, image: "https://plus.unsplash.com/premium_photo-1683140705462-11ed388653cf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0", category: "Hand Tools" },
  ];

  const categories = [
    { name: "All", icon: Filter, gradient: "from-purple-500 to-blue-500" },
    { name: "Power Tools", icon: Zap, gradient: "from-blue-500 to-cyan-500" },
    { name: "Hand Tools", icon: Hammer, gradient: "from-green-500 to-emerald-500" },
    { name: "Plumbing", icon: Wrench, gradient: "from-red-500 to-orange-500" },
    { name: "Electrical", icon: Zap, gradient: "from-yellow-500 to-orange-500" },
    { name: "Building Materials", icon: Wrench, gradient: "from-indigo-500 to-purple-500" },
  ];

  const addToCart = (product: Product) => {
    console.log('Products.tsx: Adding to cart:', product.name);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1000);
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    console.log('Products.tsx: Updating quantity for product:', productId, 'to:', newQuantity);
    if (newQuantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: number) => {
    console.log('Products.tsx: Removing from cart:', productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace('TSh ', '').replace(/,/g, ''));
        return total + price * item.quantity;
      }, 0)
      .toLocaleString('en-TZ', { style: 'currency', currency: 'TZS' });
  };

  const completeOrder = () => {
    console.log('Products.tsx: Completing order with cart:', cartItems);
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    let message = "Hello! I'd like to place an order:%0A%0A";
    cartItems.forEach(item => {
      message += `• ${item.name} - ${item.price} x ${item.quantity}%0A`;
    });
    message += `%0ATotal: ${getTotalPrice()}%0A%0APlease confirm availability and delivery details. Thank you!`;
    const phoneNumber = "255712345678";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSearch = (query: string) => {
    console.log('Products.tsx: Handling search with query:', query);
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const filteredProducts = searchResults.length > 0
    ? searchResults
    : selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        handleSearch={handleSearch}
        cartItems={cartItems}
        addToCart={addToCart}
        updateCartQuantity={updateCartQuantity}
        removeFromCart={removeFromCart}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
        completeOrder={completeOrder}
      />

      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div 
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
              <span className="text-purple-300 font-semibold text-lg tracking-wider">OUR PRODUCTS</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Quality <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Tools & Materials</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed"
            >
              Discover our extensive range of hardware solutions designed for builders, contractors, and DIY enthusiasts in Tanzania
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.button>
              
              <motion.button
                className="group border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-4 px-8 rounded-full transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 opacity-20"
        >
          <Wrench className="h-12 w-12 text-white" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-32 right-16 opacity-20"
        >
          <Hammer className="h-16 w-16 text-white" />
        </motion.div>
      </div>

      {/* Categories Section */}
      <div ref={categoriesRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Browse by <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Category</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect tools and materials for your project
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                custom={index}
                variants={fadeInUp}
                onClick={() => setSelectedCategory(category.name)}
                className={`group flex items-center px-6 py-3 rounded-full transition-all border border-gray-200 shadow-lg hover:shadow-2xl relative overflow-hidden ${
                  selectedCategory === category.name
                    ? `bg-gradient-to-r ${category.gradient} text-white`
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="h-5 w-5 mr-2" />
                {category.name}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      {/* Products Section */}
      <div ref={productsRef} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center mb-6">
              <Wrench className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-purple-600 font-semibold text-lg">Our Inventory</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Products</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-quality tools and materials for every construction need
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden rounded-xl mb-4">
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                </div>
                <p className="text-purple-600 font-semibold text-lg mb-4">{product.price}</p>
                
                <motion.button
                  onClick={() => addToCart(product)}
                  className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-full shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={addedProductId === product.id}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {addedProductId === product.id ? 'Added!' : 'Add to Cart'}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>

                {/* Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isContactInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Need <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Assistance?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team is here to help you find the right tools for your project
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isContactInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: Phone, 
                title: "Call Us", 
                description: "+255 712 345 678",
                gradient: "from-green-500 to-emerald-500"
              },
              { 
                icon: Mail, 
                title: "Email Us", 
                description: "info@92hardware.co.tz",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: MapPin, 
                title: "Visit Us", 
                description: "Mbezi Beach, Dar es Salaam",
                gradient: "from-purple-500 to-pink-500"
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${contact.gradient} text-white mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <contact.icon className="h-8 w-8" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {contact.title}
                </h3>
                <p className="text-gray-600 text-lg font-medium">{contact.description}</p>

                {/* Hover Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
          >
            <motion.button
              className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
            
            <motion.button
              className="group border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-4 px-10 rounded-full transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                <MapPin className="mr-2 h-5 w-5" />
                Get Directions
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <Footer />
    </div>
  );
}