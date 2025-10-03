"use client"

import React, { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Cpu, Settings, Wrench, CheckCircle, ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

interface ServicesSectionProps {
  services?: Service[];
  isInView?: boolean;
  variants?: Variants;
}

const defaultServices: Service[] = [
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

const ServicesSection = forwardRef<HTMLDivElement, ServicesSectionProps>(
  ({ services = defaultServices, isInView = false, variants = staggerContainer }, ref) => {
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
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Services</span>
            </motion.h2>
            <motion.p variants={slideUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond just selling hardware, we provide comprehensive solutions for all your project needs
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 + (featureIndex * 0.1) }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;