import React, { useState } from 'react';
import { X, Instagram, Camera, ExternalLink } from 'lucide-react';
import chocolateCake from '../assets/chocolate-cake.jpg';
import brownies from '../assets/brownies.jpg';
import cupcakes from '../assets/cupcakes.jpg';
import cookies from '../assets/cookies.jpg';
import bread from '../assets/bread.jpg';
import heroImage from '../assets/hero-bakery.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { id: 1, src: chocolateCake, alt: 'Chocolate Fudge Cake', category: 'Cakes' },
    { id: 2, src: brownies, alt: 'Fudgy Brownies', category: 'Brownies' },
    { id: 3, src: cupcakes, alt: 'Vanilla Cupcakes', category: 'Cupcakes' },
    { id: 4, src: cookies, alt: 'Chocolate Chip Cookies', category: 'Cookies' },
    { id: 5, src: bread, alt: 'Artisan Bread', category: 'Bread' },
    { id: 6, src: heroImage, alt: 'Bakery Setup', category: 'Behind the Scenes' },
    { id: 7, src: chocolateCake, alt: 'Custom Birthday Cake', category: 'Custom Orders' },
    { id: 8, src: cupcakes, alt: 'Wedding Cupcakes', category: 'Special Events' },
    { id: 9, src: brownies, alt: 'Caramel Brownies', category: 'Brownies' },
  ];

  const categories = ['All', 'Cakes', 'Cupcakes', 'Cookies', 'Brownies', 'Bread', 'Custom Orders'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-20 bg-bakery-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-script font-bold text-bakery-brown mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-bakery-brown/70 max-w-2xl mx-auto mb-8">
            Take a peek at some of our delicious creations and see why our customers keep coming back for more
          </p>
          
          {/* Instagram CTA */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <a
              href="https://instagram.com/homebake"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow us on Instagram</span>
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-bakery-golden text-white shadow-warm'
                  : 'bg-background text-bakery-brown hover:bg-bakery-golden/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-card hover:shadow-warm transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-bakery-brown/0 group-hover:bg-bakery-brown/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <Camera className="w-12 h-12 text-white mx-auto mb-2" />
                  <p className="text-white font-medium">{image.alt}</p>
                  <p className="text-white/80 text-sm">{image.category}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-bakery-golden/90 text-white text-xs px-3 py-1 rounded-full">
                {image.category}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-bakery max-w-2xl mx-auto">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-bakery-golden rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-script font-bold text-bakery-brown mb-2">
                Share Your Experience
              </h3>
              <p className="text-bakery-brown/60 mb-6">
                Tag us @homebake in your photos and we'll feature you in our gallery!
              </p>
              <button className="btn-golden">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Our Instagram
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={selectedImage}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;