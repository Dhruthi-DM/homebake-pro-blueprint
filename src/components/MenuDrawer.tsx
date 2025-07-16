import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { 
  X, 
  Search, 
  Star, 
  Clock, 
  Leaf, 
  Heart, 
  ShoppingBag,
  Filter,
  Menu as MenuIcon,
  Eye
} from "lucide-react";
import ProductDetail from "./ProductDetail";

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

const categories = [
  { id: "all", name: "All", emoji: "🍰" },
  { id: "Celebration Cakes", name: "Celebration Cakes", emoji: "🎂" },
  { id: "Brownies", name: "Brownies", emoji: "🍫" },
  { id: "Cupcakes", name: "Cupcakes", emoji: "🧁" },
  { id: "Cookies", name: "Cookies", emoji: "🍪" },
  { id: "Breads", name: "Breads", emoji: "🍞" },
  { id: "Jar Cakes", name: "Jar Cakes", emoji: "🫙" },
  { id: "Tarts", name: "Tarts", emoji: "🥧" },
  { id: "Seasonal", name: "Seasonal", emoji: "🎃" }
];

interface MenuDrawerProps {
  children: React.ReactNode;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  // Load menu items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem("menuItems");
    if (savedItems) {
      const items = JSON.parse(savedItems);
      setMenuItems(items.filter((item: MenuItem) => item.isActive));
    }
  }, [isOpen]); // Reload when drawer opens

  // Filter items based on category and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToOrder = () => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById('order');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const openWhatsApp = (item: MenuItem) => {
    const message = `Hi! I'd like to order ${item.name} for ₹${item.price}. Please let me know the availability and delivery details.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const openProductDetail = (item: MenuItem) => {
    setSelectedItem(item);
    setIsProductDetailOpen(true);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] bg-gradient-warm">
        <DrawerHeader className="border-b border-warm-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-script text-bakery-brown flex items-center gap-2">
              <MenuIcon className="w-6 h-6" />
              Our Menu
            </DrawerTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for cakes, brownies, cookies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/90 border-warm-200"
            />
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden">
          {/* Category Filter - Sticky */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-warm-200 p-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map(category => {
                const count = category.id === "all" 
                  ? menuItems.length 
                  : menuItems.filter(item => item.category === category.id).length;
                
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap flex items-center gap-2"
                  >
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-1">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍰</div>
                <h3 className="text-xl font-semibold text-bakery-brown mb-2">
                  No items found
                </h3>
                <p className="text-bakery-brown/60">
                  Try adjusting your search or category filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map(item => (
                  <Card 
                    key={item.id} 
                    className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() => openProductDetail(item)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {item.isEggless && (
                          <Badge className="bg-bakery-golden/90 text-white text-xs">
                            Eggless
                          </Badge>
                        )}
                        {item.isVegan && (
                          <Badge className="bg-green-500/90 text-white text-xs flex items-center gap-1">
                            <Leaf className="w-3 h-3" />
                            Vegan
                          </Badge>
                        )}
                      </div>

                      {/* Heart Icon */}
                      <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
                        <Heart className="w-4 h-4 text-bakery-brown hover:text-red-500 transition-colors duration-300" />
                      </button>

                      {/* Quick Order Overlay */}
                      <div className="absolute inset-0 bg-bakery-brown/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openWhatsApp(item);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToOrder();
                            }}
                            variant="secondary"
                          >
                            Order Form
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-bakery-golden border-bakery-golden">
                          {item.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-bakery-golden fill-current" />
                          <span className="text-sm text-bakery-brown font-medium">{item.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-script font-bold text-bakery-brown mb-2">
                        {item.name}
                      </h3>
                      
                      <p className="text-bakery-brown/60 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-bakery-brown">₹{item.price}</span>
                        <div className="flex items-center gap-1 text-bakery-brown/60">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{item.preparationTime}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openWhatsApp(item);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          WhatsApp
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToOrder();
                          }}
                          className="flex-1"
                        >
                          Order Form
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-warm-200 p-4 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-bakery-brown/60">
              {filteredItems.length} items found
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToOrder}
              >
                Custom Order
              </Button>
              <Button
                size="sm"
                onClick={() => window.open('https://wa.me/', '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Chat with Us
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
      
      {/* Product Detail Modal */}
      <ProductDetail
        item={selectedItem}
        isOpen={isProductDetailOpen}
        onClose={() => {
          setIsProductDetailOpen(false);
          setSelectedItem(null);
        }}
      />
    </Drawer>
  );
};

export default MenuDrawer;