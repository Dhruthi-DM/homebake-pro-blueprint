import React, { useState } from 'react';
import { Calendar, Clock, MessageCircle, Check, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrderForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: 'morning',
    item: '',
    flavor: '',
    eggPreference: 'eggless',
    quantity: '1',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const items = [
    'Chocolate Fudge Cake',
    'Vanilla Sponge Cake',
    'Red Velvet Cake',
    'Carrot Cake',
    'Fudgy Brownies',
    'Vanilla Cupcakes',
    'Chocolate Cupcakes',
    'Chocolate Chip Cookies',
    'Artisan Bread',
    'Custom Order'
  ];

  const flavors = [
    'Chocolate',
    'Vanilla',
    'Strawberry',
    'Red Velvet',
    'Carrot',
    'Lemon',
    'Coffee',
    'Butterscotch',
    'Black Forest',
    'Fruit Mix'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Order Submitted Successfully!",
        description: "We'll contact you within 2 hours to confirm your order.",
      });

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: 'morning',
        item: '',
        flavor: '',
        eggPreference: 'eggless',
        quantity: '1',
        notes: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'd like to place an order:
    
📝 Order Details:
• Name: ${formData.name || 'Not provided'}
• Phone: ${formData.phone || 'Not provided'}
• Item: ${formData.item || 'Not specified'}
• Flavor: ${formData.flavor || 'Not specified'}
• Quantity: ${formData.quantity || '1'}
• Egg Preference: ${formData.eggPreference}
• Date Needed: ${formData.date || 'Not specified'}
• Time: ${formData.time}
• Special Notes: ${formData.notes || 'None'}

Please confirm availability and pricing. Thank you!`;

    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="order" className="py-20 bg-bakery-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-script font-bold text-bakery-brown mb-4">
              Place Your Order
            </h2>
            <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 2 hours to confirm your order
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="card-bakery">
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                        placeholder="+91 99999 99999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bakery-brown mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Select Item *
                      </label>
                      <select
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      >
                        <option value="">Choose an item</option>
                        {items.map(item => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Flavor *
                      </label>
                      <select
                        name="flavor"
                        value={formData.flavor}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      >
                        <option value="">Choose flavor</option>
                        {flavors.map(flavor => (
                          <option key={flavor} value={flavor}>{flavor}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Quantity *
                      </label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Egg Preference *
                      </label>
                      <select
                        name="eggPreference"
                        value={formData.eggPreference}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      >
                        <option value="eggless">Eggless</option>
                        <option value="with-egg">With Egg</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Preferred Time
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      >
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bakery-brown mb-2">
                      Date Needed *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bakery-brown mb-2">
                      Special Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      placeholder="Any special requirements, decorations, or messages..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-golden py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Order...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Check className="w-5 h-5" />
                        <span>Submit Order</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* WhatsApp Order & Info */}
            <div className="space-y-6">
              {/* WhatsApp Order */}
              <div className="card-bakery">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-script font-bold text-bakery-brown mb-2">
                    Quick Order via WhatsApp
                  </h3>
                  <p className="text-bakery-brown/60 mb-6">
                    For faster service, order directly through WhatsApp
                  </p>
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Order on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Order Information */}
              <div className="card-bakery">
                <div className="p-8">
                  <h3 className="text-xl font-script font-bold text-bakery-brown mb-4">
                    Order Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-bakery-golden/20 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-bakery-golden" />
                      </div>
                      <div>
                        <div className="font-medium text-bakery-brown">Order Timeline</div>
                        <div className="text-sm text-bakery-brown/60">2-24 hours advance notice required</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-bakery-golden/20 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-bakery-golden" />
                      </div>
                      <div>
                        <div className="font-medium text-bakery-brown">Confirmation</div>
                        <div className="text-sm text-bakery-brown/60">We'll call within 2 hours to confirm</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-bakery-golden/20 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-bakery-golden" />
                      </div>
                      <div>
                        <div className="font-medium text-bakery-brown">Order Updates</div>
                        <div className="text-sm text-bakery-brown/60">Email & SMS notifications included</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;