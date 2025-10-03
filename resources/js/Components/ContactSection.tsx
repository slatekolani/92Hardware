"use client"

import React, { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  isInView?: boolean;
  variants?: Variants;
}

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

const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ isInView = false, variants = staggerContainer }, ref) => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
    };

    return (
      <div ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
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
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
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
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
      </div>
    );
  }
);

ContactSection.displayName = 'ContactSection';

export default ContactSection;