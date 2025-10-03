import React, { useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import Navigation from '@/Components/Navigation';
import Footer from '@/Components/Footer';
import { motion, useInView, Variants, TargetAndTransition, useMotionValue, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin, Wrench, Shield, Users, Heart, Award, Target, TrendingUp, Zap, Clock, Building2, CheckCircle, Star, ArrowRight, Sparkles, Eye, Lightbulb, Rocket, Globe } from 'lucide-react';


export default function About() {
  const [activeTimeline, setActiveTimeline] = useState<number>(0);

  // References for scroll animation triggers
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const achievementsRef = useRef(null);
  const cultureRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const isStoryInView = useInView(storyRef, { once: true, margin: '-100px' });
  const isMissionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const isTeamInView = useInView(teamRef, { once: true, margin: '-100px' });
  const isAchievementsInView = useInView(achievementsRef, { once: true, margin: '-100px' });
  const isCultureInView = useInView(cultureRef, { once: true, margin: '-100px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-100px' });

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

  const timelineData = [
    {
      year: "1998",
      title: "The Beginning",
      description: "92 Hardware was founded in Mbezi Beach with a vision to provide quality tools to local contractors.",
      icon: Rocket
    },
    {
      year: "2005",
      title: "Expansion",
      description: "Opened our first warehouse and expanded product range to include building materials.",
      icon: Building2
    },
    {
      year: "2012",
      title: "Manufacturing",
      description: "Started our own concrete block manufacturing facility to serve growing demand.",
      icon: Award
    },
    {
      year: "2018",
      title: "Digital Transformation",
      description: "Launched online platform and delivery service across Dar es Salaam.",
      icon: Globe
    },
    {
      year: "2025",
      title: "Industry Leader",
      description: "Serving 5000+ customers with 10,000+ products and nationwide reach.",
      icon: TrendingUp
    }
  ];

  const values = [
    {
      icon: Wrench,
      title: "Quality First",
      description: "We never compromise on the quality of our products. Every item is sourced from trusted manufacturers.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "Building lasting relationships through honest business practices and transparent pricing.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Your success is our success. We provide expert guidance for every project, big or small.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Community Support",
      description: "Empowering Tanzania's builders, contractors, and DIY enthusiasts to create amazing things.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly improving our services and products to meet evolving construction needs.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Striving for perfection in everything we do, from product selection to customer service.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const team = [
    {
      name: "Technical Experts",
      role: "Product Specialists",
      description: "Our certified technicians have decades of combined experience in construction and hardware.",
      image: "https://images.unsplash.com/photo-1519085360753-afccb6ee7714?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      stats: { years: "15+", projects: "1000+" }
    },
    {
      name: "Customer Support",
      role: "Service Champions",
      description: "Dedicated team ensuring seamless shopping experience from inquiry to delivery.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      stats: { response: "< 1hr", satisfaction: "98%" }
    },
    {
      name: "Logistics Team",
      role: "Delivery Experts",
      description: "Efficient nationwide delivery network ensuring your materials arrive on time, every time.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3a8dd22?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      stats: { deliveries: "500+/mo", onTime: "99%" }
    }
  ];

  const achievements = [
    { number: "25+", label: "Years in Business", icon: Clock },
    { number: "5000+", label: "Happy Customers", icon: Users },
    { number: "10,000+", label: "Products Available", icon: Building2 },
    { number: "98%", label: "Satisfaction Rate", icon: Star }
  ];

  const culture = [
    {
      title: "Innovation Driven",
      description: "We embrace new technologies and methods to serve you better",
      icon: Lightbulb,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Safety First",
      description: "All our products meet international safety standards",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Sustainability",
      description: "Committed to eco-friendly practices and sustainable sourcing",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Continuous Learning",
      description: "Our team stays updated with latest industry trends",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        searchQuery=""
        setSearchQuery={() => {}}
        searchResults={[]}
        handleSearch={() => {}}
        cartItems={[]}
        addToCart={() => {}}
        updateCartQuantity={() => {}}
        removeFromCart={() => {}}
        getTotalItems={() => 0}
        getTotalPrice={() => 'TSh 0'}
        completeOrder={() => {}}
      />

      {/* Enhanced Hero Section */}
      <div ref={heroRef} className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'ur[](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}
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
              <span className="text-purple-300 font-semibold text-lg tracking-wider">OUR STORY</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Building <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Tanzania's Future</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed"
            >
              For over 25 years, we've been empowering builders, contractors, and DIY enthusiasts 
              with quality tools and unwavering support
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
             
              
              <Link href="/ContactUs">
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
          <Building2 className="h-16 w-16 text-white" />
        </motion.div>
      </div>

      {/* Story Section */}
      <div ref={storyRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="92 Hardware Store"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isStoryInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-4xl font-bold text-purple-600 mb-1">25+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Strong</div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-50 blur-2xl"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              variants={fadeInRight}
            >
              <motion.div variants={fadeInUp} className="flex items-center mb-6">
                <Eye className="h-6 w-6 text-purple-600 mr-3" />
                <span className="text-purple-600 font-semibold text-lg">Our Story</span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                From Humble Beginnings to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Industry Leader</span>
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 1998 in the heart of Mbezi Beach, Dar es Salaam, 92 Hardware began as a small family-owned shop with a simple mission: provide quality tools that local contractors could trust and afford.
                </p>
                <p>
                  What started with a handful of essential tools has grown into Tanzania's premier hardware destination, serving thousands of customers from individual DIY enthusiasts to major construction companies.
                </p>
                <p>
                  Today, we're proud to operate our own manufacturing facility, produce concrete blocks, and maintain one of the largest hardware inventories in East Africa. But what hasn't changed is our commitment to personal service and community support.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-2 gap-6 mt-8"
              >
                {[
                  { icon: CheckCircle, text: "Locally Owned & Operated" },
                  { icon: CheckCircle, text: "Expert Staff Training" },
                  { icon: CheckCircle, text: "Quality Guaranteed" },
                  { icon: CheckCircle, text: "Community Focused" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <item.icon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div ref={missionRef} className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Mission */}
            <motion.div
              variants={fadeInLeft}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Target className="h-8 w-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                To empower Tanzania's builders and creators with premium quality tools, materials, and expert guidance at honest prices. We're committed to being more than just a supplier—we're your construction partner.
              </p>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeInRight}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Eye className="h-8 w-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-200 text-lg leading-relaxed">
                To be East Africa's most trusted hardware brand, setting the standard for quality, innovation, and customer care. We envision a future where every builder in Tanzania has access to world-class tools and support.
              </p>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Pattern */}
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
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Interactive Timeline */}
      <div ref={timelineRef} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isTimelineInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Journey</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              25 years of growth, innovation, and unwavering commitment to excellence
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 via-blue-600 to-purple-600"></div>

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <motion.div 
                  className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}
                  whileHover={{ scale: 1.05, x: index % 2 === 0 ? -10 : 10 }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {item.year}
                      </span>
                      <item.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>

                {/* Center Icon */}
                <motion.div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl z-10"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Spacer */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div ref={valuesRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Core <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Values</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">
                  {/* Icon */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} text-white mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <value.icon className="h-8 w-8" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Achievements Section */}
      <div ref={achievementsRef} className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isAchievementsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <motion.div 
                  className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <achievement.icon className="h-10 w-10 text-purple-300" />
                </motion.div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={isAchievementsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {achievement.number}
                </motion.div>
                <div className="text-gray-300">{achievement.label}</div>
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

      {/* Company Culture Section */}
      <div ref={cultureRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isCultureInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Culture</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              What makes working with us special
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isCultureInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {culture.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group text-center"
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className={`${item.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <item.icon className={`h-10 w-10 ${item.color}`} />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Contact CTA Section */}
      <div ref={ctaRef} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Build Together?</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Whether you're starting a new project or need expert advice, our team is here to help you succeed
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              { 
                icon: Phone, 
                title: "Call Us", 
                description: "+255 712 345 678",
                color: "text-green-600",
                bgColor: "bg-green-100",
                gradient: "from-green-500 to-emerald-500"
              },
              { 
                icon: Mail, 
                title: "Email Us", 
                description: "info@92hardware.co.tz",
                color: "text-blue-600",
                bgColor: "bg-blue-100",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                icon: MapPin, 
                title: "Visit Us", 
                description: "Mbezi Beach, Dar es Salaam",
                color: "text-purple-600",
                bgColor: "bg-purple-100",
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
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/ContactUs">
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