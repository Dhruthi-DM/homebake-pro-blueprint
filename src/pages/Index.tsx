import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Bestsellers from '../components/Bestsellers';
import OrderForm from '../components/OrderForm';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Bestsellers />
      <OrderForm />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
