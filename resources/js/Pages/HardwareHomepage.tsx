import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import HeroCarousel from '@/Components/HeroCarousel';
import StatsSection from '@/Components/StatsSection';
import FeaturesSection from '@/Components/FeaturesSection';
import WhyChooseUsSection from '@/Components/WhyChooseUsSection';
import CategoriesSection from '@/Components/CategoriesSection';
import FeaturedProductsSection from '@/Components/FeaturedProductsSection';
import TestimonialsSection from '@/Components/TestimonialsSection';
import ServicesSection from '@/Components/ServicesSection';
import VideoSection from '@/Components/VideoSection';
import ContactSection from '@/Components/ContactSection';
import { motion, useInView } from 'framer-motion';
import { Award, Building2, Cpu, Hammer, Settings, Shield, ThumbsUp, TrendingUp, Truck, Users, Wrench, Zap } from 'lucide-react';

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  // References for scroll animation triggers
  const featuresRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const isFeaturesInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const isCategoriesInView = useInView(categoriesRef, { once: true, margin: '-100px' });
  const isProductsInView = useInView(productsRef, { once: true, margin: '-100px' });
  const isWhyChooseUsInView = useInView(whyChooseUsRef, { once: true, margin: '-100px' });
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-100px' });
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const isContactInView = useInView(contactRef, { once: true, margin: '-100px' });

  // Data
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

  // Testimonial timer effect
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, []);

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

      <HeroCarousel />

      <StatsSection 
        stats={stats}
        isInView={isStatsInView}
        ref={statsRef}
      />

      <FeaturesSection 
        isInView={isFeaturesInView}
        ref={featuresRef}
      />

      <WhyChooseUsSection 
        features={whyChooseUsFeatures}
        isInView={isWhyChooseUsInView}
        ref={whyChooseUsRef}
      />

      <CategoriesSection 
        categories={categories}
        isInView={isCategoriesInView}
        ref={categoriesRef}
      />

      <FeaturedProductsSection 
        products={featuredProducts}
        addToCart={addToCart}
        isInView={isProductsInView}
        ref={productsRef}
      />

      <TestimonialsSection 
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
        isInView={isTestimonialsInView}
        ref={testimonialsRef}
      />

      <ServicesSection 
        services={services}
        isInView={isServicesInView}
        ref={servicesRef}
      />

      <VideoSection 
        isVideoPlaying={isVideoPlaying}
        setIsVideoPlaying={setIsVideoPlaying}
      />

      <ContactSection 
        isInView={isContactInView}
        ref={contactRef}
      />

      <Footer />
    </div>
  );
}