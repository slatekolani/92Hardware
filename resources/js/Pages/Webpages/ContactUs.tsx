import React, { useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { motion, useInView, Variants, useMotionValue, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight, Sparkles, Clock } from 'lucide-react';

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

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);
  const mapRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isFormInView = useInView(formRef, { once: true, margin: '-100px' });
  const isContactInView = useInView(contactRef, { once: true, margin: '-100px' });
  const isMapInView = useInView(mapRef, { once: true, margin: '-100px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-100px' });

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

  const products: Product[] = [
    { id: 1, name: 'Professional Drill Set', price: 'TSh 350,000', rating: 4.8, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', category: 'Power Tools' },
    { id: 2, name: 'Heavy Duty Hammer', price: 'TSh 50,000', rating: 4.9, image: 'https://images.unsplash.com/photo-1607870411590-d5e9e06da09a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0', category: 'Hand Tools' },
    { id: 3, name: 'Wire Stripper Tool', price: 'TSh 30,000', rating: 4.7, image: 'https://images.unsplash.com/photo-1726084396629-2175d5810dad?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0', category: 'Electrical' },
    { id: 4, name: 'Adjustable Wrench Set', price: 'TSh 70,000', rating: 4.6, image: 'https://plus.unsplash.com/premium_photo-1723874673961-a099a9ec566d?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0', category: 'Hand Tools' },
    { id: 5, name: 'Concrete Block Standard', price: 'TSh 5,000', rating: 4.5, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', category: 'Building Materials' },
    { id: 6, name: 'PVC Pipe 2 inch', price: 'TSh 25,000', rating: 4.4, image: 'https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0', category: 'Plumbing' },
    { id: 7, name: 'Power Saw', price: 'TSh 200,000', rating: 4.7, image: 'https://plus.unsplash.com/premium_photo-1677480019971-80d7fbb25b7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0', category: 'Power Tools' },
    { id: 8, name: 'Screwdriver Set', price: 'TSh 40,000', rating: 4.6, image: 'https://plus.unsplash.com/premium_photo-1683140705462-11ed388653cf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0', category: 'Hand Tools' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log('ContactUs.tsx: Form input changed:', { [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('ContactUs.tsx: Form submitted:', formData);
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }
    const message = `Hello!%0AName: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}%0A%0APlease get back to me. Thank you!`;
    const phoneNumber = '255712345678';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleSearch = (query: string) => {
    console.log('ContactUs.tsx: Handling search with query:', query);
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

  const addToCart = (product: Product) => {
    console.log('ContactUs.tsx: Adding to cart:', product.name);
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
    console.log('ContactUs.tsx: Updating quantity for product:', productId, 'to:', newQuantity);
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
    console.log('ContactUs.tsx: Removing from cart:', productId);
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
    console.log('ContactUs.tsx: Completing order with cart:', cartItems);
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    let message = "Hello! I'd like to place an order:%0A%0A";
    cartItems.forEach(item => {
      message += `• ${item.name} - ${item.price} x ${item.quantity}%0A`;
    });
    message += `%0ATotal: ${getTotalPrice()}%0A%0APlease confirm availability and delivery details. Thank you!`;
    const phoneNumber = '255712345678';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  console.log('ContactUs.tsx: Rendering component, formData:', formData, 'cartItems:', cartItems, 'searchQuery:', searchQuery);

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
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}
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
              <span className="text-purple-300 font-semibold text-lg tracking-wider">GET IN TOUCH</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Connect with <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">92 Hardware</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed"
            >
              We're here to assist with all your hardware needs in Tanzania. Reach out today!
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contact">
                <motion.button
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  className="group border-2 border-white text-white hover:bg-white hover:text-purple-900 font-bold py-4 px-8 rounded-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Products
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 opacity-20"
        >
          <Phone className="h-12 w-12 text-white" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-32 right-16 opacity-20"
        >
          <Mail className="h-16 w-16 text-white" />
        </motion.div>
      </div>

      <div ref={formRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isFormInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Send Us a <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Message</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below, and our team will get back to you promptly
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isFormInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="max-w-lg mx-auto"
          >
            <motion.div
              variants={scaleIn}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {formSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-center mb-6 font-semibold"
                >
                  Message sent! We'll contact you soon.
                </motion.p>
              )}
              <div className="space-y-6">
                <motion.div variants={fadeInUp}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Your name"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Your email"
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={5}
                    placeholder="Your message"
                  ></textarea>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <motion.button
                    onClick={handleSubmit}
                    className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div ref={contactRef} className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isContactInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Contact Details</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-200 max-w-3xl mx-auto">
              Reach out to us directly through your preferred channel
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
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${contact.gradient} text-white mb-6 shadow-lg`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <contact.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {contact.title}
                </h3>
                <p className="text-gray-200 text-lg font-medium">{contact.description}</p>
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      <div ref={mapRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isMapInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16

">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Location</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at Mbezi Beach, Dar es Salaam, Tanzania
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isMapInView ? 'visible' : 'hidden'}
            variants={scaleIn}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1569336415962-a510168d7d3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Map of Mbezi Beach, Dar es Salaam"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <motion.div
              className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={isMapInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-1">Mbezi Beach</div>
              <div className="text-sm text-gray-600 font-medium">Dar es Salaam, Tanzania</div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div ref={ctaRef} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isCtaInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Connect?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Whether you have a question or need assistance, our team is here to help
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isCtaInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
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
            className="flex flex-col sm:flex-row gap-6 justify-center"
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
          <motion.div
            variants={fadeInUp}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 mr-3" />
                <h3 className="text-2xl font-bold">Operating Hours</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold mb-2">Monday - Friday</div>
                  <div className="text-purple-100">8:00 AM - 6:00 PM</div>
                </div>
                <div>
                  <div className="font-bold mb-2">Saturday</div>
                  <div className="text-purple-100">8:00 AM - 4:00 PM</div>
                </div>
                <div>
                  <div className="font-bold mb-2">Sunday</div>
                  <div className="text-purple-100">Closed</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <Footer />
    </div>
  );
}
