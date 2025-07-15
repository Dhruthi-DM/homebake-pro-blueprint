import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Save, Image as ImageIcon, FileText, Download } from "lucide-react";
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
  createdAt: string;
}

const categories = [
  "Celebration Cakes",
  "Brownies",
  "Cupcakes", 
  "Cookies",
  "Breads",
  "Jar Cakes",
  "Tarts",
  "Seasonal"
];

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    isEggless: false,
    isVegan: false,
    preparationTime: "",
    rating: 4.5,
    isActive: true
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Load menu items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("menuItems");
    if (savedItems) {
      setMenuItems(JSON.parse(savedItems));
    } else {
      // Initialize with default items if none exist
      const defaultItems: MenuItem[] = [
        {
          id: "1",
          name: "Chocolate Fudge Cake",
          description: "Rich, moist chocolate cake with creamy fudge frosting",
          price: 850,
          category: "Celebration Cakes",
          image: "/src/assets/chocolate-cake.jpg",
          isEggless: true,
          isVegan: false,
          preparationTime: "24h",
          rating: 4.9,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          name: "Fudgy Brownies",
          description: "Decadent brownies with chocolate chips and nuts",
          price: 450,
          category: "Brownies",
          image: "/src/assets/brownies.jpg",
          isEggless: true,
          isVegan: false,
          preparationTime: "2h",
          rating: 4.8,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          name: "Vanilla Cupcakes",
          description: "Fluffy vanilla cupcakes with buttercream frosting",
          price: 350,
          category: "Cupcakes",
          image: "/src/assets/cupcakes.jpg",
          isEggless: false,
          isVegan: false,
          preparationTime: "4h",
          rating: 4.7,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "4",
          name: "Chocolate Chip Cookies",
          description: "Classic cookies with premium chocolate chips",
          price: 280,
          category: "Cookies",
          image: "/src/assets/cookies.jpg",
          isEggless: true,
          isVegan: false,
          preparationTime: "1h",
          rating: 4.9,
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: "5",
          name: "Artisan Bread",
          description: "Freshly baked sourdough with crusty exterior",
          price: 180,
          category: "Breads",
          image: "/src/assets/bread.jpg",
          isEggless: false,
          isVegan: true,
          preparationTime: "6h",
          rating: 4.6,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      setMenuItems(defaultItems);
      localStorage.setItem("menuItems", JSON.stringify(defaultItems));
    }
  }, []);

  // Save menu items to localStorage whenever menuItems changes
  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  const handleAddItem = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || "/src/assets/placeholder.jpg",
      isEggless: formData.isEggless,
      isVegan: formData.isVegan,
      preparationTime: formData.preparationTime,
      rating: formData.rating,
      isActive: formData.isActive,
      createdAt: new Date().toISOString()
    };

    setMenuItems([...menuItems, newItem]);
    resetForm();
    setIsAddModalOpen(false);
    toast({
      title: "Success",
      description: "Menu item added successfully!"
    });
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      isEggless: item.isEggless,
      isVegan: item.isVegan,
      preparationTime: item.preparationTime,
      rating: item.rating,
      isActive: item.isActive
    });
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    const updatedItems = menuItems.map(item => 
      item.id === editingItem.id 
        ? {
            ...item,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image,
            isEggless: formData.isEggless,
            isVegan: formData.isVegan,
            preparationTime: formData.preparationTime,
            rating: formData.rating,
            isActive: formData.isActive
          }
        : item
    );

    setMenuItems(updatedItems);
    setEditingItem(null);
    resetForm();
    toast({
      title: "Success",
      description: "Menu item updated successfully!"
    });
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Menu item deleted successfully!"
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      isEggless: false,
      isVegan: false,
      preparationTime: "",
      rating: 4.5,
      isActive: true
    });
  };

  const exportMenu = () => {
    const dataStr = JSON.stringify(menuItems, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'menu-items.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-warm-800">Menu Management</h2>
          <p className="text-warm-600">Manage your bakery menu items</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportMenu} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Menu
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
              </DialogHeader>
              <MenuItemForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
        >
          All ({menuItems.length})
        </Button>
        {categories.map(category => {
          const count = menuItems.filter(item => item.category === category).length;
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({count})
            </Button>
          );
        })}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {item.isEggless && (
                  <Badge className="bg-orange-500 text-white">Eggless</Badge>
                )}
                {item.isVegan && (
                  <Badge className="bg-green-500 text-white">Vegan</Badge>
                )}
                {!item.isActive && (
                  <Badge variant="destructive">Inactive</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <span className="text-lg font-bold text-primary">₹{item.price}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center mb-3">
                <Badge variant="outline">{item.category}</Badge>
                <span className="text-sm text-gray-500">⭐ {item.rating}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditItem(item)}
                  className="flex-1"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          <MenuItemForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );

  function MenuItemForm({ isEdit = false }) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Chocolate Fudge Cake"
            />
          </div>
          <div>
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="e.g., 850"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Describe your delicious creation..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="preparationTime">Preparation Time</Label>
            <Input
              id="preparationTime"
              value={formData.preparationTime}
              onChange={(e) => setFormData({...formData, preparationTime: e.target.value})}
              placeholder="e.g., 24h, 2h"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="eggless"
              checked={formData.isEggless}
              onCheckedChange={(checked) => setFormData({...formData, isEggless: checked})}
            />
            <Label htmlFor="eggless">Eggless</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="vegan"
              checked={formData.isVegan}
              onCheckedChange={(checked) => setFormData({...formData, isVegan: checked})}
            />
            <Label htmlFor="vegan">Vegan</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => {
            if (isEdit) {
              setEditingItem(null);
            } else {
              setIsAddModalOpen(false);
            }
            resetForm();
          }}>
            Cancel
          </Button>
          <Button onClick={isEdit ? handleUpdateItem : handleAddItem}>
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? "Update" : "Add"} Item
          </Button>
        </div>
      </div>
    );
  }
};

export default MenuManager;