import React, { useState, useRef } from 'react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { motion, useInView, Variants } from 'framer-motion';
import { Wrench, Hammer, Zap, Filter, Phone, Mail, MapPin, ArrowRight, Sparkles, Star, Check, ShoppingCart } from 'lucide-react';

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

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Contact {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isCategoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' });
  const isProductsInView = useInView(productsRef, { once: true, margin: '-100px' });
  const isContactInView = useInView(contactRef, { once: true, margin: '-100px' });

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
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

  const categories: Category[] = [
    { name: "All", icon: Filter, color: "bg-purple-600" },
    { name: "Power Tools", icon: Zap, color: "bg-blue-600" },
    { name: "Hand Tools", icon: Hammer, color: "bg-green-600" },
    { name: "Plumbing", icon: Wrench, color: "bg-red-600" },
    { name: "Electrical", icon: Zap, color: "bg-yellow-600" },
    { name: "Building Materials", icon: Wrench, color: "bg-indigo-600" },
  ];

  const addToCart = (product: Product) => {
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
    setTimeout(() => setAddedProductId(null), 1500);
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
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

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Scroll to products section
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredProducts = searchResults.length > 0
    ? searchResults
    : selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);

  const isAdded = (productId: number) => addedProductId === productId;

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
      <div ref={heroRef} className="relative h-[500px] md:h-[600px] overflow-hidden">
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
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="flex items-center justify-center mb-4 md:mb-6">
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-purple-400 mr-2" />
              <span className="text-purple-300 font-semibold text-sm md:text-lg tracking-wider">OUR PRODUCTS</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6"
            >
              Quality <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Tools & Materials</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-base md:text-xl lg:text-2xl opacity-90 mb-6 md:mb-10 leading-relaxed px-4"
            >
              Discover our extensive range of hardware solutions for builders and DIY enthusiasts
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
            >
              <button
                onClick={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-xl transition-colors flex items-center justify-center"
              >
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button
                onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-3 md:py-4 px-6 md:px-8 rounded-full transition-colors"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <div ref={categoriesRef} className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={stagger}
            className="text-center mb-8 md:mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Browse by <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Category</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Find the perfect tools and materials for your project
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={stagger}
            className="flex flex-wrap justify-center gap-2 md:gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category.name}
                variants={fadeIn}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full transition-all text-sm md:text-base font-medium ${
                  selectedCategory === category.name
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Products Section */}
      <div ref={productsRef} className="py-12 md:py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
            variants={stagger}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div variants={fadeIn} className="flex items-center justify-center mb-3 md:mb-4">
              <Wrench className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mr-2" />
              <span className="text-purple-600 font-semibold text-sm md:text-lg">Our Inventory</span>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Explore Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Products</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              High-quality tools and materials for every construction need
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((product) => {
              const isDisabled = isAdded(product.id);
              return (
                <motion.div
                  key={product.id}
                  variants={fadeIn}
                  className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="relative h-40 md:h-48 overflow-hidden rounded-lg md:rounded-xl mb-3 md:mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-2">{product.category}</p>
                  <div className="flex items-center mb-2 md:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 md:h-4 md:w-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-xs md:text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <p className="text-purple-600 font-semibold text-base md:text-lg mb-3 md:mb-4">{product.price}</p>
                  
                  <button
                    onClick={() => addToCart(product)}
                    disabled={isDisabled}
                    className={`w-full font-medium py-2.5 md:py-3 px-4 rounded-full transition-colors flex items-center justify-center text-sm md:text-base ${
                      isDisabled
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {isDisabled ? (
                      <>
                        <Check className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isContactInView ? "visible" : "hidden"}
            variants={stagger}
            className="text-center mb-8 md:mb-12"
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Need <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Assistance?</span>
            </motion.h2>
            <motion.p variants={fadeIn} className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Our team is here to help you find the right tools for your project
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isContactInView ? "visible" : "hidden"}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {[
              { 
                icon: Phone, 
                title: "Call Us", 
                description: "+255 712 345 678",
                color: "bg-green-600"
              },
              { 
                icon: Mail, 
                title: "Email Us", 
                description: "info@92hardware.co.tz",
                color: "bg-blue-600"
              },
              { 
                icon: MapPin, 
                title: "Visit Us", 
                description: "Mbezi Beach, Dar es Salaam",
                color: "bg-purple-600"
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl ${contact.color} text-white mb-4 md:mb-6`}>
                  <contact.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                  {contact.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg font-medium">{contact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}