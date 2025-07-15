import React from 'react';
import { Heart, Award, Users, Clock } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-script font-bold text-bakery-brown mb-6">
                Meet the Baker
              </h2>
              <p className="text-lg text-bakery-brown/70 mb-6">
                Hi! I'm Sarah, and I've been baking from my heart for over 8 years. What started as a hobby during college has now become my passion and profession.
              </p>
              <p className="text-bakery-brown/70 mb-8">
                Every cake, cookie, and treat that leaves my kitchen is made with premium ingredients, no preservatives, and lots of love. I believe that homemade should taste like home - warm, comforting, and made just for you.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-bakery-golden mb-2">1000+</div>
                  <div className="text-bakery-brown/60">Cakes Baked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-bakery-golden mb-2">500+</div>
                  <div className="text-bakery-brown/60">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-bakery-golden mb-2">4.9★</div>
                  <div className="text-bakery-brown/60">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-bakery-golden mb-2">8</div>
                  <div className="text-bakery-brown/60">Years Experience</div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-bakery-golden/10 p-6 rounded-2xl border-l-4 border-bakery-golden">
                <p className="text-bakery-brown italic text-lg">
                  "Baking isn't just about mixing ingredients - it's about creating moments of joy and bringing people together."
                </p>
                <div className="mt-4 text-bakery-brown/70">
                  - Sarah, Head Baker & Founder
                </div>
              </div>
            </div>

            {/* Image and Features */}
            <div className="space-y-8">
              {/* Baker Image */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-warm rounded-2xl shadow-card overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-bakery-golden rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-script font-bold text-bakery-brown mb-2">Sarah's Kitchen</h3>
                      <p className="text-bakery-brown/60">Where every treat is made with love</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-4 p-4 bg-bakery-cream rounded-xl">
                  <div className="w-12 h-12 bg-bakery-golden rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-bakery-brown">Premium Quality</h4>
                    <p className="text-sm text-bakery-brown/60">Only the finest ingredients in every recipe</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-bakery-cream rounded-xl">
                  <div className="w-12 h-12 bg-bakery-golden rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-bakery-brown">Custom Orders</h4>
                    <p className="text-sm text-bakery-brown/60">Personalized cakes for every special occasion</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-bakery-cream rounded-xl">
                  <div className="w-12 h-12 bg-bakery-golden rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-bakery-brown">Fresh Daily</h4>
                    <p className="text-sm text-bakery-brown/60">Baked fresh to order, never pre-made</p>
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

export default About;