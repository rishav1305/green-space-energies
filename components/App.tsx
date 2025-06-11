'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X, Sun, Shield, Users, Zap, TrendingUp, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, MessageSquare, Send, Leaf, Battery, Globe } from 'lucide-react';

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroSlides = [
    {
      title: "POWERING TOMORROW WITH CLEAN SOLAR ENERGY",
      subtitle: "SUSTAINABLE | EFFICIENT | FUTURE-READY",
      description: "Leading the green revolution with cutting-edge solar solutions. We deliver sustainable energy systems that reduce costs while protecting our planet for future generations."
    },
    {
      title: "HARNESS THE SUN'S UNLIMITED POWER",
      subtitle: "SUSTAINABLE | EFFICIENT | FUTURE-READY",
      description: "Transform sunlight into savings with our advanced solar technology. Join thousands of satisfied customers who have made the switch to clean, renewable energy."
    },
    {
      title: "SOLAR SOLUTIONS FOR A GREENER FUTURE",
      subtitle: "SUSTAINABLE | EFFICIENT | FUTURE-READY",
      description: "From residential rooftops to large-scale installations, we provide comprehensive solar solutions that help you achieve energy independence and environmental stewardship."
    }
  ];

  const whyChooseUs = [
    {
      number: "01",
      icon: <Shield className="h-12 w-12 text-green-600 mb-4" />,
      title: "ECO-FRIENDLY & SUSTAINABLE SOLUTIONS",
      description: "At Green Space Energies, sustainability is at our core. Our solar solutions reduce carbon footprint by up to 80% while providing clean, renewable energy for decades. We're committed to building a greener future for generations to come."
    },
    {
      number: "02",
      icon: <Sun className="h-12 w-12 text-green-600 mb-4" />,
      title: "PREMIUM SOLAR TECHNOLOGY & QUALITY",
      description: "We use only the highest quality solar panels and inverters that comply with international standards including IEC, UL, BIS, and MNRE certifications. Our premium equipment ensures maximum efficiency and 25+ year performance warranty."
    },
    {
      number: "03",
      icon: <Users className="h-12 w-12 text-green-600 mb-4" />,
      title: "24/7 MONITORING & CUSTOMER SUPPORT",
      description: "Our dedicated support team provides round-the-clock assistance for all your solar energy needs. With real-time performance monitoring and predictive maintenance, we ensure your system operates at peak efficiency."
    },
    {
      number: "04",
      icon: <Zap className="h-12 w-12 text-green-600 mb-4" />,
      title: "SMART ENERGY MANAGEMENT SYSTEMS",
      description: "Our intelligent solar solutions include smart inverters, battery storage, and energy management systems that optimize power generation, storage, and consumption for maximum savings and grid independence."
    },
    {
      number: "05",
      icon: <Globe className="h-12 w-12 text-green-600 mb-4" />,
      title: "AI-POWERED PERFORMANCE OPTIMIZATION",
      description: "Advanced analytics and artificial intelligence monitor your solar system's health in real-time. Our predictive algorithms identify potential issues before they occur, maximizing uptime and energy generation."
    }
  ];

  const products = [
    {
      title: "Utility Scale Solar",
      icon: <Sun className="h-8 w-8 text-green-600" />,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      description: "Large-scale solar farms and commercial installations"
    },
    {
      title: "Rooftop Solar",
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=300&fit=crop",
      description: "Residential and commercial rooftop solutions"
    },
    {
      title: "Solar Street Light",
      icon: <Zap className="h-8 w-8 text-green-600" />,
      image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=400&h=300&fit=crop",
      description: "Smart LED street lighting with solar power"
    },
    {
      title: "Solar Carport",
      icon: <Battery className="h-8 w-8 text-green-600" />,
      image: "https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=400&h=300&fit=crop",
      description: "Covered parking with integrated solar panels"
    }
  ];

  const testimonials = [
    {
      text: "Your crew did a marvelous job. Very efficient, courteous. An all around fine bunch of guys!",
      author: "Dinesh"
    },
    {
      text: "Five Stars!!! Our experience was fantastic! From the info session to the final inspection every step was perfectly painless and professionally executed.",
      author: "Sneha Arora"
    },
    {
      text: "Very impressed with Green Space Energies. On-time and very quick installation. The installation crews and office personnel were very professional, friendly and easy to work with.",
      author: "Pratik Garg"
    },
    {
      text: "Excellent service at every step, from initial contact to go-live. Friendly, professional and highly knowledgeable staff. I cannot imagine how any part of the process could have gone better.",
      author: "Mayank Tiwari"
    }
  ];

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Contact form validation
  const validateForm = () => {
    const errors: ContactFormErrors = {};

    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }

    if (!contactForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(contactForm.phone.replace(/\s/g, ''))) {
      errors.phone = 'Phone number is invalid';
    }

    if (!contactForm.subject.trim()) {
      errors.subject = 'Subject is required';
    }

    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setFormErrors({});
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof ContactFormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-2xl font-bold text-green-800 cursor-pointer"
              >
                <span className="text-green-600">Green Space</span> Energies
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-700 hover:text-green-700 transition-colors">Home</button>
              <a href="#about" className="text-gray-700 hover:text-green-700 transition-colors">About Us</a>
              <a href="#products" className="text-gray-700 hover:text-green-700 transition-colors">Products</a>
              <a href="#why-us" className="text-gray-700 hover:text-green-700 transition-colors">Why Green Space</a>
              <a href="#projects" className="text-gray-700 hover:text-green-700 transition-colors">Projects</a>
              <a href="#contact" className="text-green-700 font-semibold">Contact Us</a>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="block px-3 py-2 text-gray-700 w-full text-left">Home</button>
                <a href="#about" className="block px-3 py-2 text-gray-700">About Us</a>
                <a href="#products" className="block px-3 py-2 text-gray-700">Products</a>
                <a href="#why-us" className="block px-3 py-2 text-gray-700">Why Green Space</a>
                <a href="#projects" className="block px-3 py-2 text-gray-700">Projects</a>
                <a href="#contact" className="block px-3 py-2 text-green-700 font-semibold">Contact Us</a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-[600px] bg-gradient-to-r from-green-800 via-green-700 to-green-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Sun className="h-6 w-6 text-yellow-300" />
              <p className="text-sm font-semibold text-yellow-300">
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg mb-8 text-gray-200">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-green-900 px-8 py-4 rounded-md text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Sun className="h-5 w-5" />
                <span>Get Solar Quote</span>
              </a>
              <a
                href="tel:+919870572461"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-4 rounded-md text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Expert</span>
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-yellow-500' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sun className="h-6 w-6 text-green-600" />
              <p className="text-green-600 font-semibold">ABOUT US</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              YOUR TRUSTED SOLAR ENERGY PARTNER
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Green Space Energies is a leading provider of solar energy solutions, committed to accelerating the world's transition to sustainable, clean energy. With years of expertise and a customer-first approach, we deliver cutting-edge solar solutions that power homes and businesses while protecting our environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-6">
                <Shield className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                To accelerate the world's transition to sustainable energy through innovative solar solutions and exceptional customer service.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-6">
                <Users className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold">Our Team</h3>
              </div>
              <p className="text-gray-600">
                Our expert team of engineers and technicians brings years of experience in solar technology and renewable energy solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold">Our Impact</h3>
              </div>
              <p className="text-gray-600">
                We've helped thousands of customers reduce their carbon footprint and achieve energy independence through solar power.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-green-600" />
              <p className="text-green-600 font-semibold">OUR PRODUCTS</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              COMPREHENSIVE SOLAR SOLUTIONS
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              From large-scale solar farms to residential installations, we offer a complete range of solar energy solutions tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href="#contact" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                      Learn More
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {product.icon}
                    <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
                  </div>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-green-600" />
              <p className="text-green-600 font-semibold">WHY CHOOSE SOLAR</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              LEADING THE CLEAN ENERGY REVOLUTION
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Join the solar revolution and experience the benefits of clean, renewable energy. Our comprehensive solar solutions
              help you achieve energy independence while contributing to a sustainable future for our planet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-green-50 p-8 rounded-lg border border-green-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-green-600">
                    {item.number}
                  </div>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">Get in touch with us for all your solar energy needs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+91 98705 72461"
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="How can we help you?"
                  />
                  {formErrors.subject && <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Please describe your requirements..."
                  ></textarea>
                  {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-green-600 mt-1" />
                    <div>
                      <p className="text-gray-700">
                        H.No.6, Khasra No.184,<br />
                        Near Bus Stand Laldora Extention,<br />
                        Vill. Garhi Randhala Delhi-110081
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-green-600" />
                    <div className="space-y-1">
                      <a href="tel:+919870572461" className="text-gray-700 hover:text-green-600 transition-colors block">
                        +91 98705 72461
                      </a>
                      <a href="tel:+918700102879" className="text-gray-700 hover:text-green-600 transition-colors block">
                        +91 87001 02879
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-green-600" />
                    <a href="mailto:gspaceenergies@gmail.com" className="text-gray-700 hover:text-green-600 transition-colors">
                      gspaceenergies@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919870572461?text=Hello%20Green%20Space%20Energies!%20I%20would%20like%20to%20inquire%20about%20solar%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        title="Chat with us on WhatsApp"
      >
        <MessageSquare className="h-6 w-6" />
      </a>
    </div>
  );
}

export default App;
