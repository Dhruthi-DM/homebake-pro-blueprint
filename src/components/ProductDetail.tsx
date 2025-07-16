import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Minus, Plus, Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface ProductDetailProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const sizeOptions = [
  { label: "Small (600gm)", value: "small", price: 0 },
  { label: "Medium (1200gm)", value: "medium", price: 300 },
  { label: "Medium Plus (1500gm)", value: "medium-plus", price: 500 },
  { label: "Large (2000gm)", value: "large", price: 800 },
  { label: "Extra Large (3000gm)", value: "xl", price: 1200 },
];

const eggOptions = [
  { label: "With Egg", value: "egg" },
  { label: "Eggless", value: "eggless" },
];

// Mock reviews data
const reviews = [
  {
    name: "Nimanshu misra",
    rating: 5,
    text: "Lovely Chocolate Birthday Cake/ Generative Everyone in the birthday party appreciated the taste and look of the cake.",
    daysAgo: 1
  },
  {
    name: "Shashikala Deuki",
    rating: 5,
    text: "I wanted different decoration and it was delivered on time, looked perfect and tasted divine, highly recommend!",
    daysAgo: 2
  },
  {
    name: "Simran Thakur",
    rating: 5,
    text: "Nice and wonderful 💝",
    daysAgo: 3
  }
];

// Mock related products
const relatedProducts = [
  { name: "Champagne Bubble Cake", price: 3600, image: "/src/assets/chocolate-cake.jpg" },
  { name: "Coffee Walnut Cake", price: 1345, image: "/src/assets/chocolate-cake.jpg" },
  { name: "Designer Chocolate Mousse Cake", price: 1095, image: "/src/assets/chocolate-cake.jpg" },
  { name: "Red Velvet Jar Cake (Pack of 2)", price: 600, image: "/src/assets/cupcakes.jpg" },
];

const ProductDetail = ({ item, isOpen, onClose }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState("small");
  const [selectedEggOption, setSelectedEggOption] = useState("egg");
  const [specialMessage, setSpecialMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  if (!item) return null;

  const selectedSizeData = sizeOptions.find(size => size.value === selectedSize);
  const finalPrice = item.price + (selectedSizeData?.price || 0);

  const handleAddToCart = () => {
    const orderDetails = `Hi! I'd like to order:

🎂 *${item.name}*
📦 Size: ${selectedSizeData?.label}
🥚 Option: ${selectedEggOption === 'egg' ? 'With Egg' : 'Eggless'}
📝 Special Message: ${specialMessage || 'None'}
🔢 Quantity: ${quantity}
💰 Total Price: ₹${(finalPrice * quantity).toLocaleString()}

Please let me know the availability and delivery details. Thank you!`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Order Details Sent!",
      description: "Redirecting to WhatsApp to complete your order."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold text-warm-800 mb-2">
                {item.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({item.rating})</span>
                </div>
                <div className="flex gap-2">
                  {item.isEggless && (
                    <Badge className="bg-orange-500 text-white">Eggless Available</Badge>
                  )}
                  {item.isVegan && (
                    <Badge className="bg-green-500 text-white">Vegan</Badge>
                  )}
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Product Image and Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Description */}
              <div className="p-4 bg-warm-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                  <span>⏱️ Prep Time: {item.preparationTime}</span>
                  <span>📅 Category: {item.category}</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="space-y-6">
              <div className="text-3xl font-bold text-warm-800">
                ₹{finalPrice.toLocaleString()}
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label} {size.price > 0 && `(+₹${size.price})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Egg Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <Select value={selectedEggOption} onValueChange={setSelectedEggOption}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eggOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Or Special Notes (Max: 50 Characters)
                </label>
                <Textarea
                  value={specialMessage}
                  onChange={(e) => setSpecialMessage(e.target.value.slice(0, 50))}
                  placeholder="E.g. Happy Birthday!!!"
                  className="resize-none"
                  rows={3}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {specialMessage.length}/50 characters
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-warm-600 hover:bg-warm-700 text-white py-3 text-lg"
              >
                Order via WhatsApp - ₹{(finalPrice * quantity).toLocaleString()}
              </Button>

              {/* Delivery Info */}
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <strong>Standard deliveries are limited to city limits only.</strong><br />
                Reach out to <strong>9876543210</strong> for extended delivery.
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <img src="https://developers.google.com/static/site-assets/logo-google-g_48dp.png" alt="Google" className="w-5 h-5" />
              Google Reviews
              <span className="text-sm font-normal text-gray-600">4.9 ⭐⭐⭐⭐⭐ (1200+)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((review, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-warm-200 rounded-full flex items-center justify-center text-sm font-medium">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.daysAgo} day{review.daysAgo > 1 ? 's' : ''} ago</div>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* You May Also Like */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">YOU MAY ALSO LIKE</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h4>
                    <p className="text-warm-600 font-semibold">₹{product.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;