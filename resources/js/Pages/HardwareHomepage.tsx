import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { motion, useInView, Variants, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Wrench, Hammer, Zap, Star, Truck, Shield, Clock, Users, Award, ThumbsUp, TrendingUp, Building2, Cpu, Settings, Quote, ChevronDown, PlayCircle, CheckCircle, ArrowRight, Sparkles, Target, Eye, Heart } from 'lucide-react';

// Define interfaces for product and cart item
interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
}

interface Stat {
  number: string;
  label: string;
  suffix: string;
}

export default function HardwareHomepage() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  // References for scroll animation triggers
  const featuresRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const contactRef = useRef(null);

  const isFeaturesInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const isCategoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' });
  const isProductsInView = useInView(productsRef, { once: true, margin: '-100px' });
  const isWhyChooseUsInView = useInView(whyChooseUsRef, { once: true, margin: '-100px' });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const isContactInView = useInView(contactRef, { once: true, margin: '-100px' });

  // Motion values for scroll effects
  const scrollY = useMotionValue(0);
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  // Animation variants with explicit typing
  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -100, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 100, rotate: 5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
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

  const floatingAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    floating: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const testimonialVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: -90,
      transition: { duration: 0.5 },
    },
  };

  const countUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Professional Tools & Equipment",
      subtitle: "Everything you need for your construction and maintenance projects",
      cta: "Shop Tools"
    },
    {
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Quality Building Materials",
      subtitle: "From screws to lumber - we have all your construction needs covered",
      cta: "View Materials"
    },
    {
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "Expert Hardware Solutions",
      subtitle: "Over 25 years of experience serving contractors and DIY enthusiasts",
      cta: "Contact Us"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Building Blocks Manufacturing",
      subtitle: "High-quality concrete blocks and construction materials manufactured on-site",
      cta: "View Blocks"
    }
  ];

  const categories = [
    { name: "Power Tools", icon: Zap, image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Hand Tools", icon: Hammer, image: "https://plus.unsplash.com/premium_photo-1683140705462-11ed388653cf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2NyZXdkcml2ZXIlMjBzZXR8ZW58MHx8MHx8fDA%3D" },
    { name: "Plumbing", icon: Wrench, image: "https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UFZDJTIwUGlwZXxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Electrical", icon: Zap, image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Building Materials", icon: Building2, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
    { name: "Safety Equipment", icon: Shield, image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&auto=format&fit=crop&q=60" }
  ];

  const featuredProducts: Product[] = [
    { id: 1, name: "Professional Drill Set", price: "TSh 350,000", rating: 4.8, image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", category: "Power Tools" },
    { id: 2, name: "Heavy Duty Hammer", price: "TSh 50,000", rating: 4.9, image: "https://images.unsplash.com/photo-1607870411590-d5e9e06da09a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Hand Tools" },
    { id: 3, name: "Wire Stripper Tool", price: "TSh 30,000", rating: 4.7, image: "https://images.unsplash.com/photo-1726084396629-2175d5810dad?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Electrical" },
    { id: 4, name: "Adjustable Wrench Set", price: "TSh 70,000", rating: 4.6, image: "https://plus.unsplash.com/premium_photo-1723874673961-a099a9ec566d?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "Hand Tools" },
    { id: 5, name: "Concrete Block Standard", price: "TSh 5,000", rating: 4.5, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80", category: "Building Materials" },
    { id: 6, name: "PVC Pipe 2 inch", price: "TSh 25,000", rating: 4.4, image: "https://plus.unsplash.com/premium_photo-1661577094877-725f859aff3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UFZDJTIwUGlwZXxlbnwwfHwwfHx8MA%3D%3D", category: "Plumbing" },
    { id: 7, name: "Power Saw", price: "TSh 200,000", rating: 4.7, image: "https://plus.unsplash.com/premium_photo-1677480019971-80d7fbb25b7e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UG93ZXIlMjBzYXd8ZW58MHx8MHx8fDA%3D", category: "Power Tools" },
    { id: 8, name: "Screwdriver Set", price: "TSh 40,000", rating: 4.6, image: "https://plus.unsplash.com/premium_photo-1683140705462-11ed388653cf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2NyZXdkcml2ZXIlMjBzZXR8ZW58MHx8MHx8fDA%3D", category: "Hand Tools" }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Mwangi",
      role: "Construction Manager",
      company: "BuildRight Ltd",
      content: "92 Hardware has been our go-to supplier for over 3 years. Their quality products and exceptional service have helped us complete projects on time and within budget.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Sarah Kipkoech",
      role: "DIY Enthusiast",
      company: "Homeowner",
      content: "As someone who loves home improvement projects, I appreciate their knowledgeable staff and wide selection. They always have what I need and offer great advice.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616c94ad389?w=400&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      role: "Electrical Contractor",
      company: "Power Solutions Co.",
      content: "The electrical supplies at 92 Hardware are top-notch. Fast delivery, competitive prices, and genuine products. Highly recommend for all electrical needs.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60"
    }
  ];

  const services: Service[] = [
    {
      id: 1,
      title: "Custom Manufacturing",
      description: "We manufacture building blocks and custom hardware solutions tailored to your specific project requirements.",
      icon: Cpu,
      features: ["Concrete Blocks", "Custom Metal Parts", "Specialized Tools", "Project Consultation"]
    },
    {
      id: 2,
      title: "Installation Services",
      description: "Professional installation services for all your hardware needs with certified technicians.",
      icon: Settings,
      features: ["Electrical Installation", "Plumbing Setup", "Tool Assembly", "Safety Inspection"]
    },
    {
      id: 3,
      title: "Maintenance & Repair",
      description: "Keep your tools and equipment in perfect condition with our maintenance and repair services.",
      icon: Wrench,
      features: ["Tool Repair", "Equipment Servicing", "Parts Replacement", "Performance Testing"]
    }
  ];

  const stats: Stat[] = [
    { number: "25", label: "Years Experience", suffix: "+" },
    { number: "5000", label: "Happy Customers", suffix: "+" },
    { number: "10000", label: "Products Available", suffix: "+" },
    { number: "24", label: "Hour Support", suffix: "/7" }
  ];

  const whyChooseUsFeatures = [
    {
      icon: Award,
      title: "Industry Leader",
      description: "25+ years of excellence in hardware supply and manufacturing",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: ThumbsUp,
      title: "Quality Guaranteed",
      description: "100% authentic products from trusted manufacturers worldwide",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Competitive Pricing",
      description: "Best prices in Tanzania with flexible payment options",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery in Dar es Salaam, nationwide shipping available",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Professional consultation and technical support for all projects",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Warranty Protection",
      description: "Comprehensive warranty coverage on all products and services",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const results = featuredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

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
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('TSh ', '').replace(/,/g, ''));
      return total + (price * item.quantity);
    }, 0).toLocaleString('en-TZ', { style: 'currency', currency: 'TZS' });
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, []);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', updateScrollY);
    return () => window.removeEventListener('scroll', updateScrollY);
  }, [scrollY]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

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

      {/* Enhanced Hero Carousel */}
      <div className="relative h-96 md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
              <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="max-w-4xl"
                >
                  <motion.h1 
                    className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p 
                    className="text-lg md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.button 
                    className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-700 hover:from-purple-700 hover:via-pink-700 hover:to-blue-800 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center">
                      {slide.cta}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Enhanced Carousel Controls */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/20"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/20"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>

        {/* Enhanced Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentSlide ? 'bg-white shadow-lg' : 'bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 opacity-20"
        >
          <Sparkles className="h-8 w-8 text-white" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-32 right-16 opacity-20"
        >
          <Settings className="h-12 w-12 text-white" />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="py-16 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={countUpVariants}
                className="text-center text-white"
              >
                <motion.div
                  className="text-4xl md:text-6xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {stat.number}
                  <span className="text-purple-300">{stat.suffix}</span>
                </motion.div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-32 right-32 w-16 h-16 border border-white rounded-full"></div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div ref={featuresRef} className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isFeaturesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Truck, title: "Free Delivery", description: "On orders over TSh 250,000", color: "text-purple-600", bgColor: "bg-purple-100", gradient: "from-purple-500 to-pink-500" },
              { icon: Shield, title: "Quality Guarantee", description: "100% authentic products", color: "text-blue-700", bgColor: "bg-blue-100", gradient: "from-blue-500 to-cyan-500" },
              { icon: Clock, title: "Fast Service", description: "Quick turnaround times", color: "text-green-600", bgColor: "bg-green-100", gradient: "from-green-500 to-emerald-500" },
              { icon: Users, title: "Expert Support", description: "Professional assistance", color: "text-orange-600", bgColor: "bg-orange-100", gradient: "from-orange-500 to-red-500" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="group text-center relative"
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className={`${feature.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className={`h-10 w-10 ${feature.color} z-10 relative`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-purple-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div ref={whyChooseUsRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isWhyChooseUsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideUp} className="flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-purple-600 font-semibold text-lg">Why Choose Us</span>
            </motion.div>
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Built for <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Excellence</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              With over 25 years of experience, we've become Tanzania's most trusted hardware partner. 
              Here's what makes us different.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isWhyChooseUsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyChooseUsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                  {/* Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <feature.icon className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isWhyChooseUsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.button
              className="group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                Experience the Difference
                <Heart className="ml-2 h-5 w-5 group-hover:text-red-300 transition-colors" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </motion.div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      {/* Enhanced Product Categories */}
      <div ref={categoriesRef} className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-white mb-6">
              Shop by <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Category</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find exactly what you need from our extensive product range
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="group cursor-pointer"
                whileHover={{ y: -10 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-500"></div>
                    
                    {/* Icon Overlay */}
                    <motion.div 
                      className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {category.name}
                    </h3>
                    
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                </div>
                
              </motion.div>
              
            ))}
            
          </motion.div>

        </div>
              
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
      </div>

      {/* Enhanced Featured Products */}
      <div ref={productsRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Featured <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Products</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our top picks for your projects - handpicked for quality and performance
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isProductsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={slideUp}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 relative overflow-hidden"
                whileHover={{ y: -8 }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <motion.img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Top Rated
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <p className="text-sm text-purple-600 font-medium">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                  </div>

                  <p className="text-2xl font-bold text-purple-600">{product.price}</p>

                  <motion.button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 relative overflow-hidden group-hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Add to Cart
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </div>

                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Animated Testimonials Section */}
      <div ref={testimonialsRef} className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isTestimonialsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={slideUp} className="flex items-center justify-center mb-6">
              <Quote className="h-8 w-8 text-purple-300 mr-3" />
              <span className="text-purple-300 font-semibold text-lg">Client Testimonials</span>
            </motion.div>
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Clients Say</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear from the professionals who trust us with their projects
            </motion.p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial="hidden"
                animate={index === currentTestimonial ? "visible" : "exit"}
                variants={testimonialVariants}
                className={`${index === currentTestimonial ? 'block' : 'hidden'} text-center`}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="h-6 w-6 text-yellow-400 fill-current mx-1" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <motion.p 
                    className="text-xl md:text-2xl text-white mb-8 leading-relaxed italic"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonial.content}"
                  </motion.p>

                  {/* Client Info */}
                  <motion.div 
                    className="flex items-center justify-center space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-4 border-white/30"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="text-left">
                      <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-purple-300">{testimonial.role}</p>
                      <p className="text-gray-300 text-sm">{testimonial.company}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (i * 10)}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Services</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond just selling hardware, we provide comprehensive solutions for all your project needs
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={slideUp}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden"
                whileHover={{ y: -8 }}
              >
                {/* Service Icon */}
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white mb-6 shadow-lg"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <service.icon className="h-8 w-8" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isServicesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 + (featureIndex * 0.1) }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <motion.button 
                  className="mt-8 group-hover:bg-purple-600 group-hover:text-white border-2 border-purple-600 text-purple-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-24 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Video Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden">
                    {!isVideoPlaying ? (
                      <motion.button
                        onClick={() => setIsVideoPlaying(true)}
                        className="group flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PlayCircle className="h-10 w-10 text-white group-hover:text-purple-300 transition-colors" />
                      </motion.button>
                    ) : (
                      <div className="text-white text-center">
                        <h3 className="text-2xl font-bold mb-2">Factory Tour Video</h3>
                        <p className="opacity-80">See our manufacturing process in action</p>
                      </div>
                    )}
                    
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 1, 0.3],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Eye className="h-6 w-6 text-purple-300 mr-3" />
                <span className="text-purple-300 font-semibold">Behind the Scenes</span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                See How We <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Craft Quality</span>
              </motion.h2>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Take a virtual tour of our manufacturing facility and witness our commitment to quality. 
                From raw materials to finished products, every step is carefully monitored to ensure 
                we deliver nothing but the best to our customers.
              </motion.p>

              <motion.div 
                className="grid grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                {[
                  { number: "50+", label: "Quality Checks" },
                  { number: "100%", label: "Satisfaction Rate" },
                  { number: "24/7", label: "Production" },
                  { number: "ISO", label: "Certified" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-purple-300">{item.number}</div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.button
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Schedule Factory Visit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Contact Section */}
      <div ref={contactRef} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isContactInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={slideUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? We're here to help with expert advice and quality products
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isContactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: Phone, title: "Phone", description: "+255 712 345 678", color: "text-purple-600", bgColor: "bg-purple-100" },
                  { icon: Mail, title: "Email", description: "info@92hardware.co.tz", color: "text-blue-600", bgColor: "bg-blue-100" },
                  { icon: MapPin, title: "Location", description: "Mbezi Beach, Dar es Salaam, Tanzania", color: "text-green-600", bgColor: "bg-green-100" },
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="group flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                    whileHover={{ x: 10, scale: 1.02 }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isContactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div 
                      className={`${contact.bgColor} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 15 }}
                    >
                      <contact.icon className={`h-8 w-8 ${contact.color}`} />
                    </motion.div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {contact.title}
                      </h4>
                      <p className="text-gray-600">{contact.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Operating Hours */}
              <motion.div
                className="mt-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="h-6 w-6 mr-2" />
                  Operating Hours
                </h4>
                <div className="space-y-2 text-white/90">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>8:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isContactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="John"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Doe"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                      <option>General Inquiry</option>
                      <option>Product Quote</option>
                      <option>Custom Manufacturing</option>
                      <option>Technical Support</option>
                      <option>Partnership</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                  </motion.div>

                  <motion.button
                    type="button"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert('Message sent! We will get back to you soon.')}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <Footer />
    </div>
  );
}