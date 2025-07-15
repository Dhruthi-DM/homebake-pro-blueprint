import React from 'react';
import { Heart, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-bakery-brown text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-bakery-golden rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-script font-bold">HomeBake</span>
            </div>
            <p className="text-white/70 mb-6">
              Crafting delicious moments, one bake at a time. Made with love, delivered with care.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/homebake"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-bakery-golden transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/homebake"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-bakery-golden transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/homebake"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-bakery-golden transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-white/70 hover:text-bakery-golden transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('bestsellers')}
                  className="text-white/70 hover:text-bakery-golden transition-colors duration-300"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="text-white/70 hover:text-bakery-golden transition-colors duration-300"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white/70 hover:text-bakery-golden transition-colors duration-300"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-white/70 hover:text-bakery-golden transition-colors duration-300"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Products</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-white/70">Custom Cakes</span>
              </li>
              <li>
                <span className="text-white/70">Cupcakes</span>
              </li>
              <li>
                <span className="text-white/70">Brownies</span>
              </li>
              <li>
                <span className="text-white/70">Cookies</span>
              </li>
              <li>
                <span className="text-white/70">Artisan Bread</span>
              </li>
              <li>
                <span className="text-white/70">Seasonal Specials</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-bakery-golden" />
                <span className="text-white/70">+91 99999 99999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-bakery-golden" />
                <span className="text-white/70">orders@homebake.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-bakery-golden" />
                <span className="text-white/70">Mumbai Central & Suburbs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-bakery-golden" />
                <span className="text-white/70">9 AM - 8 PM Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © {currentYear} HomeBake. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-bakery-golden transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-bakery-golden transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-bakery-golden transition-colors duration-300 text-sm">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;