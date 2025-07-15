import React from 'react';
import { Star, Clock, Leaf, Heart, ShoppingBag } from 'lucide-react';
import chocolateCake from '../assets/chocolate-cake.jpg';
import brownies from '../assets/brownies.jpg';
import cupcakes from '../assets/cupcakes.jpg';
import cookies from '../assets/cookies.jpg';
import bread from '../assets/bread.jpg';

const Bestsellers = () => {
  const products = [
    {
      id: 1,
      name: "Chocolate Fudge Cake",
      description: "Rich, moist chocolate cake with creamy fudge frosting",
      image: chocolateCake,
      price: "₹850",
      rating: 4.9,
      time: "24h",
      isEggless: true,
      isVegan: false,
      category: "Cakes"
    },
    {
      id: 2,
      name: "Fudgy Brownies",
      description: "Decadent brownies with chocolate chips and nuts",
      image: brownies,
      price: "₹450",
      rating: 4.8,
      time: "2h",
      isEggless: true,
      isVegan: false,
      category: "Brownies"
    },
    {
      id: 3,
      name: "Vanilla Cupcakes",
      description: "Fluffy vanilla cupcakes with buttercream frosting",
      image: cupcakes,
      price: "₹350",
      rating: 4.7,
      time: "4h",
      isEggless: false,
      isVegan: false,
      category: "Cupcakes"
    },
    {
      id: 4,
      name: "Chocolate Chip Cookies",
      description: "Classic cookies with premium chocolate chips",
      image: cookies,
      price: "₹280",
      rating: 4.9,
      time: "1h",
      isEggless: true,
      isVegan: false,
      category: "Cookies"
    },
    {
      id: 5,
      name: "Artisan Bread",
      description: "Freshly baked sourdough with crusty exterior",
      image: bread,
      price: "₹180",
      rating: 4.6,
      time: "6h",
      isEggless: false,
      isVegan: true,
      category: "Bread"
    }
  ];

  const scrollToOrder = () => {
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="bestsellers" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-script font-bold text-bakery-brown mb-4">
            Our Bestsellers
          </h2>
          <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto">
            Discover our most loved creations, crafted with premium ingredients and baked fresh daily
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card-bakery group">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isEggless && (
                    <span className="bg-bakery-golden/90 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Eggless
                    </span>
                  )}
                  {product.isVegan && (
                    <span className="bg-green-500/90 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                      <Leaf className="w-3 h-3" />
                      <span>Vegan</span>
                    </span>
                  )}
                </div>

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 group">
                  <Heart className="w-4 h-4 text-bakery-brown hover:text-red-500 transition-colors duration-300" />
                </button>

                {/* Quick Order Overlay */}
                <div className="absolute inset-0 bg-bakery-brown/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={scrollToOrder}
                    className="btn-golden transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  >
                    Quick Order
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-bakery-golden font-medium bg-bakery-golden/10 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-bakery-golden fill-current" />
                    <span className="text-sm text-bakery-brown font-medium">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-script font-bold text-bakery-brown mb-2">
                  {product.name}
                </h3>
                
                <p className="text-bakery-brown/60 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-bakery-brown">{product.price}</span>
                  <div className="flex items-center space-x-1 text-bakery-brown/60">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{product.time}</span>
                  </div>
                </div>

                <button
                  onClick={scrollToOrder}
                  className="w-full btn-soft flex items-center justify-center space-x-2 group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={scrollToOrder}
            className="btn-golden text-lg px-8 py-4"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;