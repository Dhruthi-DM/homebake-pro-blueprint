import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Phone } from 'lucide-react';
import MenuDrawer from './MenuDrawer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-golden rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-script font-bold text-bakery-brown">
              HomeBake
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
            >
              Home
            </button>
            <MenuDrawer>
              <button className="text-bakery-brown hover:text-bakery-golden transition-colors duration-300">
                Menu
              </button>
            </MenuDrawer>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('order')}
              className="btn-golden flex items-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-background/95 backdrop-blur-sm rounded-2xl shadow-soft">
            <nav className="flex flex-col space-y-4 px-4">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
              >
                Home
              </button>
              <MenuDrawer>
                <button className="text-left py-2 text-bakery-brown hover:text-bakery-golden transition-colors duration-300 w-full">
                  Menu
                </button>
              </MenuDrawer>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-left py-2 text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left py-2 text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 text-bakery-brown hover:text-bakery-golden transition-colors duration-300"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection('order')}
                className="btn-golden flex items-center justify-center space-x-2 mt-4"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;