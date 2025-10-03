"use client"

import React, { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  currentTestimonial?: number;
  setCurrentTestimonial?: (index: number) => void;
  isInView?: boolean;
  variants?: Variants;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Tumaini Abrazack",
    role: "Construction Manager",
    company: "XYZ",
    content: "92 Hardware has been our go-to supplier for over 3 years. Their quality products and exceptional service have helped us complete projects on time and within budget.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Kipkoech",
    role: "DIY Enthusiast",
    company: "XYZ",
    content: "As someone who loves home improvement projects, I appreciate their knowledgeable staff and wide selection. They always have what I need and offer great advice.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    role: "Electrical Contractor",
    company: "XYZ",
    content: "The electrical supplies at 92 Hardware are top-notch. Fast delivery, competitive prices, and genuine products. Highly recommend for all electrical needs.",
    rating: 5,
  }
];

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

const TestimonialsSection = forwardRef<HTMLDivElement, TestimonialsSectionProps>(
  ({ testimonials = defaultTestimonials, currentTestimonial = 0, setCurrentTestimonial, isInView = false, variants = staggerContainer }, ref) => {
    return (
      <div ref={ref} className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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
                  onClick={() => setCurrentTestimonial && setCurrentTestimonial(index)}
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
    );
  }
);

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;