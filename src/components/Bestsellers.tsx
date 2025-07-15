import React, { useState, useEffect } from 'react';
import { Star, Clock, Leaf, Heart, ShoppingBag } from 'lucide-react';
import MenuDrawer from './MenuDrawer';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isEggless: boolean;
  isVegan: boolean;
  preparationTime: string;
  rating: number;
  isActive: boolean;
}

const Bestsellers = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Load menu items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("menuItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setMenuItems(items.filter((item: MenuItem) => item.isActive));
    }
  }, []);

  // Show top 6 bestsellers (highest rated items)
  const bestsellers = menuItems
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

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
          {bestsellers.map((product) => (
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
                  <span className="text-2xl font-bold text-bakery-brown">₹{product.price}</span>
                  <div className="flex items-center space-x-1 text-bakery-brown/60">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{product.preparationTime}</span>
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
          <MenuDrawer>
            <button className="btn-golden text-lg px-8 py-4 flex items-center gap-2">
              🍰 View Full Menu
            </button>
          </MenuDrawer>
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;