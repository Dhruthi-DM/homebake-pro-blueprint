import React, { useState, useEffect } from 'react';
import { Star, Clock, Leaf, Heart, ShoppingBag } from 'lucide-react';
import MenuDrawer from './MenuDrawer';
import ProductDetail from './ProductDetail';

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
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  // Default celebration cakes with placeholder images
  const celebrationCakes: MenuItem[] = [
    {
      id: 'ombre-cake',
      name: 'Ombre Cake - Colorful Cake',
      description: 'A stunning colorful ombre cake with beautiful gradient layers',
      price: 1400,
      category: 'Celebration Cakes',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=300&fit=crop',
      isEggless: true,
      isVegan: false,
      preparationTime: '2-3 hours',
      rating: 4.8,
      isActive: true
    },
    {
      id: 'butterscotch-cake',
      name: 'Butterscotch Cake',
      description: 'Butterscotch cake is an iconic cake at liliyum, This caramel butterscotch cake is soft, creamy and holds a delicious taste in it.',
      price: 945,
      category: 'Celebration Cakes',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&h=300&fit=crop',
      isEggless: true,
      isVegan: false,
      preparationTime: '1-2 hours',
      rating: 4.7,
      isActive: true
    },
    {
      id: 'belgian-chocolate-vanilla',
      name: 'Belgian Chocolate Vanilla Cake',
      description: 'This choco vanilla cake has 2 layers of vanilla sponge and in between them is chocolate sponge covered with delicious chocolate buttercream',
      price: 1095,
      category: 'Celebration Cakes',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop',
      isEggless: false,
      isVegan: false,
      preparationTime: '2-3 hours',
      rating: 4.9,
      isActive: true
    },
    {
      id: 'origami-cake',
      name: 'Origami Cake For Wifes Birthday',
      description: 'Beautifully crafted origami-themed cake perfect for special occasions',
      price: 3400,
      category: 'Celebration Cakes',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&h=300&fit=crop',
      isEggless: false,
      isVegan: false,
      preparationTime: '3-4 hours',
      rating: 4.8,
      isActive: true
    },
    {
      id: 'romantic-anniversary',
      name: 'Romantic Anniversary Buttercream Cake',
      description: 'This romantic cake design will bring your love full circle and brighten up your day by adding some those famous rose-tinted glasses',
      price: 1195,
      category: 'Celebration Cakes',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=300&fit=crop',
      isEggless: true,
      isVegan: false,
      preparationTime: '2-3 hours',
      rating: 4.6,
      isActive: true
    },
    {
      id: 'abstract-blue',
      name: 'Abstract Blue Cake',
      description: 'Roots and wings is the theme of this abstract blue cake. With gold splatters around the walls, the entire design centers on elegance and class.',
      price: 1195,
      category: 'Celebration Cakes',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&h=300&fit=crop',
      isEggless: false,
      isVegan: false,
      preparationTime: '2-3 hours',
      rating: 4.7,
      isActive: true
    }
  ];

  // Default brownies
  const brownies: MenuItem[] = [
    {
      id: 'chocolate-walnut-brownie',
      name: 'Chocolate Walnut Brownie',
      description: 'Rich chocolate brownie with crunchy walnuts',
      price: 750,
      category: 'Brownies',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=300&fit=crop',
      isEggless: false,
      isVegan: false,
      preparationTime: '30 mins',
      rating: 4.5,
      isActive: true
    },
    {
      id: 'dark-chocolate-brownie',
      name: 'Dark Chocolate Brownie',
      description: 'Intense dark chocolate brownie for chocolate lovers',
      price: 650,
      category: 'Brownies',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&h=300&fit=crop',
      isEggless: false,
      isVegan: false,
      preparationTime: '30 mins',
      rating: 4.4,
      isActive: true
    },
    {
      id: 'milk-chocolate-brownie',
      name: 'Milk Chocolate Brownie',
      description: 'Smooth and creamy milk chocolate brownie',
      price: 650,
      category: 'Brownies',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=300&fit=crop',
      isEggless: false,
      isVegan: false,
      preparationTime: '30 mins',
      rating: 4.3,
      isActive: true
    },
    {
      id: 'brownie-cake',
      name: 'Brownie Cake',
      description: 'Combination of brownie and cake in one delicious treat',
      price: 800,
      category: 'Brownies',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&h=300&fit=crop',
      isEggless: true,
      isVegan: false,
      preparationTime: '1 hour',
      rating: 4.6,
      isActive: true
    }
  ];

  // Load menu items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("menuItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setMenuItems(items.filter((item: MenuItem) => item.isActive));
    }
  }, []);

  // Combine default items with saved items
  const allItems = [...celebrationCakes, ...brownies, ...menuItems];
  
  // Show top 6 bestsellers (highest rated items)
  const bestsellers = allItems
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const scrollToOrder = () => {
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openProductDetail = (item: MenuItem) => {
    setSelectedItem(item);
    setIsProductDetailOpen(true);
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
            <div 
              key={product.id} 
              className="card-bakery group cursor-pointer"
              onClick={() => openProductDetail(product)}
            >
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
                <button 
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Heart className="w-4 h-4 text-bakery-brown hover:text-red-500 transition-colors duration-300" />
                </button>

                {/* Quick Order Overlay */}
                <div className="absolute inset-0 bg-bakery-brown/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToOrder();
                    }}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToOrder();
                  }}
                  className="w-full btn-soft flex items-center justify-center space-x-2 group"
                >
                  <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Celebration Cakes Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-script font-bold text-bakery-brown mb-4">
              🎂 Celebration Cakes
            </h3>
            <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto">
              Make every celebration memorable with our exquisite cake collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {celebrationCakes.map((cake) => (
              <div 
                key={cake.id} 
                className="card-bakery group cursor-pointer"
                onClick={() => openProductDetail(cake)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {cake.isEggless && (
                      <span className="bg-bakery-golden/90 text-white text-xs px-2 py-1 rounded-full">
                        Eggless
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-bakery-golden font-medium bg-bakery-golden/10 px-2 py-1 rounded-full">
                      {cake.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-bakery-golden fill-current" />
                      <span className="text-xs text-bakery-brown">{cake.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-script font-bold text-bakery-brown mb-2 line-clamp-1">
                    {cake.name}
                  </h4>
                  
                  <p className="text-bakery-brown/60 text-sm mb-3 line-clamp-2">
                    {cake.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-bakery-brown">From ₹{cake.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToOrder();
                      }}
                      className="btn-soft text-sm px-3 py-1"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brownies Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-script font-bold text-bakery-brown mb-4">
              🍫 Brownies
            </h3>
            <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto">
              Indulge in our rich and fudgy brownies, perfect for chocolate lovers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brownies.map((brownie) => (
              <div 
                key={brownie.id} 
                className="card-bakery group cursor-pointer"
                onClick={() => openProductDetail(brownie)}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={brownie.image}
                    alt={brownie.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-bakery-golden font-medium bg-bakery-golden/10 px-2 py-1 rounded-full">
                      {brownie.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-bakery-golden fill-current" />
                      <span className="text-xs text-bakery-brown">{brownie.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-script font-bold text-bakery-brown mb-2 line-clamp-1">
                    {brownie.name}
                  </h4>
                  
                  <p className="text-bakery-brown/60 text-sm mb-3 line-clamp-2">
                    {brownie.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-bakery-brown">₹{brownie.price}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToOrder();
                      }}
                      className="btn-soft text-sm px-3 py-1"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button - Centered */}
        <div className="flex justify-center mt-16">
          <MenuDrawer>
            <button className="btn-golden text-lg px-8 py-4 flex items-center gap-2 mx-auto">
              🍰 View Full Menu
            </button>
          </MenuDrawer>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetail
        item={selectedItem}
        isOpen={isProductDetailOpen}
        onClose={() => {
          setIsProductDetailOpen(false);
          setSelectedItem(null);
        }}
      />
    </section>
  );
};

export default Bestsellers;