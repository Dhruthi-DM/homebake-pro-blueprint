import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi! I'd like to know more about your bakery services.`;
    const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+919999999999';
  };

  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-script font-bold text-bakery-brown mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto">
            Have questions about our products or want to place a custom order? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-bakery">
                <div className="p-8">
                  <h3 className="text-2xl font-script font-bold text-bakery-brown mb-6">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-bakery-golden rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-bakery-brown">Phone</h4>
                        <p className="text-bakery-brown/60">+91 99999 99999</p>
                        <button
                          onClick={handleCallClick}
                          className="text-bakery-golden hover:text-bakery-orange transition-colors duration-300 text-sm"
                        >
                          Call now
                        </button>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-bakery-brown">WhatsApp</h4>
                        <p className="text-bakery-brown/60">Quick responses & easy ordering</p>
                        <button
                          onClick={handleWhatsAppClick}
                          className="text-green-500 hover:text-green-600 transition-colors duration-300 text-sm"
                        >
                          Message us
                        </button>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-bakery-golden rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-bakery-brown">Email</h4>
                        <p className="text-bakery-brown/60">orders@homebake.com</p>
                        <a
                          href="mailto:orders@homebake.com"
                          className="text-bakery-golden hover:text-bakery-orange transition-colors duration-300 text-sm"
                        >
                          Send email
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-bakery-golden rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-bakery-brown">Delivery Area</h4>
                        <p className="text-bakery-brown/60">Mumbai Central & Suburbs</p>
                        <p className="text-bakery-golden text-sm">Free delivery above ₹500</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="card-bakery">
                <div className="p-8">
                  <h3 className="text-xl font-script font-bold text-bakery-brown mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-bakery-golden" />
                    Business Hours
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-bakery-brown">Monday - Friday</span>
                      <span className="text-bakery-brown/60">9:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-bakery-brown">Saturday</span>
                      <span className="text-bakery-brown/60">9:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-bakery-brown">Sunday</span>
                      <span className="text-bakery-brown/60">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-bakery-golden/10 rounded-lg">
                    <p className="text-sm text-bakery-brown">
                      <strong>Note:</strong> Orders placed after 6 PM will be processed the next day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-bakery">
              <div className="p-8">
                <h3 className="text-2xl font-script font-bold text-bakery-brown mb-6">
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-bakery-brown mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                        placeholder="+91 99999 99999"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bakery-brown mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-bakery-brown mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-bakery-golden/50 transition-all duration-300"
                      placeholder="Tell us about your requirements, questions, or feedback..."
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
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;