import React, { useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { motion, useInView, Variants, useMotionValue, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin, BrickWall, Layers, ShoppingCart, ArrowRight, Sparkles, Star } from 'lucide-react';

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

export default function BuildingBlocks() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [addedBlockId, setAddedBlockId] = useState<number | null>(null);

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const blocksRef = useRef(null);
  const contactRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const isBlocksInView = useInView(blocksRef, { once: true, margin: '-100px' });
  const isContactInView = useInView(contactRef, { once: true, margin: '-100px' });

  const scrollY = useMotionValue(0);
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

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

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const blockTypes: Product[] = [
    {
      id: 1,
      name: 'Standard Concrete Block',
      price: 'TSh 5,000/Block',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1657007508392-d68322544f70?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
      category: 'Structural',
    },
    {
      id: 2,
      name: 'Paving Block',
      price: 'TSh 3,000/Block',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1691762523478-88af52155f5a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
      category: 'Paving',
    },
    {
      id: 3,
      name: 'Hollow Concrete Block',
      price: 'TSh 5,000/Block',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1650460533962-601b36580ef4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0',
      category: 'Non-Structural',
    },
  ];

  const services = [
    {
      icon: BrickWall,
      title: 'Custom Block Manufacturing',
      description: 'We produce concrete blocks tailored to your project specifications, ensuring strength and durability.',
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      icon: Layers,
      title: 'Bulk Production',
      description: 'High-volume production for large-scale construction projects with fast turnaround times.',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  const addToCart = (block: Product) => {
    console.log('BuildingBlocks.tsx: Adding to cart:', block.name);
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === block.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === block.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...block, quantity: 1 }];
    });
    setAddedBlockId(block.id);
    setTimeout(() => setAddedBlockId(null), 1000);
  };

  const updateCartQuantity = (blockId: number, newQuantity: number) => {
    console.log('BuildingBlocks.tsx: Updating quantity for blockId:', blockId, 'to:', newQuantity);
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== blockId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === blockId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (blockId: number) => {
    console.log('BuildingBlocks.tsx: Removing from cart, blockId:', blockId);
    setCartItems(prev => prev.filter(item => item.id !== blockId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace('TSh ', '').replace('/Block', '').replace(',', ''));
        return total + price * item.quantity;
      }, 0)
      .toLocaleString('en-TZ', { style: 'currency', currency: 'TZS' });
  };

  const completeOrder = () => {
    console.log('BuildingBlocks.tsx: Completing order with cart:', cartItems);
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    let message = "Hello! I'd like to place an order:%0A%0A";
    cartItems.forEach(item => {
      message += `• ${item.name} - ${item.price} x ${item.quantity}%0A`;
    });
    message += `%0ATotal: ${getTotalPrice()}%0A%0APlease confirm availability and delivery details. Thank you!`;
    const phoneNumber = '255658597924';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setCartItems([]);
  };

  const handleSearch = (query: string) => {
    console.log('BuildingBlocks.tsx: Handling search with query:', query);
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
    } else {
      const results = blockTypes.filter(block =>
        block.name.toLowerCase().includes(query.toLowerCase()) ||
        block.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const filteredBlocks = searchResults.length > 0 ? searchResults : blockTypes;

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

      <div ref={heroRef} className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial="hidden"
            animate={isHeroInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
              <span className="text-purple-300 font-semibold text-lg tracking-wider">BUILDING BLOCKS</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Quality <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Concrete Blocks</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed"
            >
              High-quality concrete blocks manufactured to meet your construction needs in Tanzania
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="#blocks">
                <motion.button
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Explore Blocks
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  className="group border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-4 px-8 rounded-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 opacity-20"
        >
          <BrickWall className="h-12 w-12 text-white" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-32 right-16 opacity-20"
        >
          <Layers className="h-16 w-16 text-white" />
        </motion.div>
      </div>

      <div ref={servicesRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center mb-6">
              <BrickWall className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-purple-600 font-semibold text-lg">Our Services</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Manufacturing <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Excellence</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Custom solutions for your construction projects
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <service.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div id="blocks" ref={blocksRef} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isBlocksInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center mb-6">
              <Layers className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-purple-600 font-semibold text-lg">Our Blocks</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Block Types</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our range of high-quality concrete blocks
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isBlocksInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlocks.map((block, index) => (
              <motion.div
                key={block.id}
                custom={index}
                variants={fadeInUp}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden rounded-xl mb-4">
                  <motion.img
                    src={block.image}
                    alt={block.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {block.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{block.category}</p>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(block.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{block.rating}</span>
                </div>
                <p className="text-purple-600 font-semibold text-lg mb-4">{block.price}</p>
                <motion.button
                  onClick={() => addToCart(block)}
                  className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-full shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={addedBlockId === block.id}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {addedBlockId === block.id ? 'Added!' : 'Add to Cart'}
                    <ShoppingCart className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isBlocksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <motion.button
                onClick={completeOrder}
                className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Complete Order
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.button>
            </motion.div>
          )}
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div ref={contactRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isContactInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach out for more information about our manufacturing services
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isContactInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Phone,
                title: 'Call Us',
                description: '+255 712 345 678',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: Mail,
                title: 'Email Us',
                description: 'info@92hardware.co.tz',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                description: 'Mbezi Beach, Dar es Salaam',
                gradient: 'from-purple-500 to-pink-500',
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
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
          >
            <Link href="/contact">
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
            </Link>
            <Link href="/directions">
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
            </Link>
          </motion.div>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <Footer />
    </div>
  );
}
