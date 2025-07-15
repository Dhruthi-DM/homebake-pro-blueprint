import React from 'react';
import { ArrowRight, Heart, Award } from 'lucide-react';
import heroImage from '../assets/hero-bakery.jpg';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Fresh baked goods"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bakery-cream/90 to-bakery-pink/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-bakery-golden/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce-in">
            <Award className="w-4 h-4 text-bakery-golden" />
            <span className="text-bakery-brown font-medium">Freshly Baked Daily</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-script font-bold text-bakery-brown mb-6 animate-fade-in text-shadow">
            Baked with Love,
            <br />
            <span className="text-bakery-golden">Delivered Fresh</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-bakery-brown/80 mb-8 max-w-2xl mx-auto animate-slide-up">
            From birthday cakes to daily treats — handcrafted with premium ingredients and delivered straight to your doorstep
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-bakery-golden" />
              <span className="text-bakery-brown font-medium">500+ Happy Customers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-bakery-golden" />
              <span className="text-bakery-brown font-medium">5-Star Reviews</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up">
            <button
              onClick={() => scrollToSection('bestsellers')}
              className="btn-golden flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>View Our Menu</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="btn-soft flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>Order Now</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex justify-center items-center space-x-8 opacity-70">
            <div className="text-center">
              <div className="text-2xl font-bold text-bakery-brown">100%</div>
              <div className="text-sm text-bakery-brown/60">Fresh</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-bakery-brown">24h</div>
              <div className="text-sm text-bakery-brown/60">Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-bakery-brown">0</div>
              <div className="text-sm text-bakery-brown/60">Preservatives</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-bakery-brown/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-bakery-brown/30 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;