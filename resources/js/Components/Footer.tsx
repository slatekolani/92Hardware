import React from 'react';
import { Phone, Mail, MapPin, Hammer, Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Wrench className="h-8 w-8 text-purple-400 mr-2" />
          <span className="text-2xl font-bold">92 Hardware</span>
        </div>
        <p className="text-gray-400">Your trusted partner for all hardware needs in Tanzania</p>
        <div className="mt-8 text-sm text-gray-500">
          © 2025 92 Hardware. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
  );
}