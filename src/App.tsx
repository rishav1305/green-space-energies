import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X, Sun, Shield, Users, Zap, TrendingUp, Mail, Phone, MapPin, Facebook, Linkedin, Instagram, MessageSquare, Send, Leaf, Battery, Globe, Settings } from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
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
    const errors = {};

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

  const handleFormSubmit = async (e) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Navigation handler
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Render contact page
  if (currentPage === 'contact') {
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
                  onClick={() => handleNavigation('home')}
                  className="text-2xl font-bold text-green-800 cursor-pointer"
                >
                  <span className="text-green-600">Green Space</span> Energies
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-8">
                <button onClick={() => handleNavigation('home')} className="text-gray-700 hover:text-green-700 transition-colors">Home</button>
                <a href="#about" className="text-gray-700 hover:text-green-700 transition-colors">About Us</a>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-green-700 transition-colors">
                    Products <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <a href="/products/utility-scale" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Utility Scale Solar</a>
                      <a href="/products/rooftop" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Rooftop Solar</a>
                      <a href="/products/carport" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Solar Carport</a>
                      <a href="/products/street-light" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Solar Street Light</a>
                    </div>
                  </div>
                </div>
                <a href="#why-us" className="text-gray-700 hover:text-green-700 transition-colors">Why Green Space</a>
                <a href="#projects" className="text-gray-700 hover:text-green-700 transition-colors">Projects</a>
                <button onClick={() => handleNavigation('contact')} className="text-green-700 font-semibold">Contact Us</button>
              </nav>

              {/* Plant Monitoring Login */}
              <div className="hidden lg:flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors">
                  Plant Monitoring Login
                </button>
              </div>

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
                  <button onClick={() => handleNavigation('home')} className="block px-3 py-2 text-gray-700 w-full text-left">Home</button>
                  <a href="#about" className="block px-3 py-2 text-gray-700">About Us</a>
                  <a href="#products" className="block px-3 py-2 text-gray-700">Products</a>
                  <a href="#why-us" className="block px-3 py-2 text-gray-700">Why Green Space</a>
                  <a href="#projects" className="block px-3 py-2 text-gray-700">Projects</a>
                  <button onClick={() => handleNavigation('contact')} className="block px-3 py-2 text-green-700 font-semibold w-full text-left">Contact Us</button>
                  <button className="w-full text-left px-3 py-2 bg-green-700 text-white rounded-md mt-2 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Plant Monitoring Login</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Contact Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
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
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+91 98705 72461"
                    />
                    {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        formErrors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="rooftop-solar">Rooftop Solar Inquiry</option>
                      <option value="utility-scale">Utility Scale Solar</option>
                      <option value="solar-carport">Solar Carport</option>
                      <option value="solar-street-light">Solar Street Light</option>
                      <option value="maintenance">Maintenance Service</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.subject && <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your solar energy requirements..."
                  />
                  {formErrors.message && <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 text-white py-4 px-6 rounded-md hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-900 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        H. No. 6, Khasra No. 184, Near Bus Stand,<br />
                        Laldora Extension, Vill. Garhi Randhala,<br />
                        Delhi- 110081, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-900 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone Numbers</h3>
                      <p className="text-gray-600">
                        <a href="tel:+919870572461" className="hover:text-blue-900 transition-colors">
                          +91 98705 72461
                        </a><br />
                        <a href="tel:+918700102879" className="hover:text-blue-900 transition-colors">
                          +91 8700102879
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-900 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Address</h3>
                      <p className="text-gray-600">
                        <a href="mailto:gspaceenergies@gmail.com" className="hover:text-blue-900 transition-colors">
                          gspaceenergies@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14018.123456789!2d77.0!3d28.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05dd375c5a47%3A0x108adaa3abe4bd07!2sGarhi%20Randhala%2C%20Delhi%20110081!5e0!3m2!1sen!2sin!4v1609459200000!5m2!1sen!2sin"
                    width="100%"
                    height="256"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Green Space Energies Location"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    Visit our office for detailed consultation on your solar energy projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <button onClick={() => handleNavigation('home')} className="text-2xl font-bold text-green-800 cursor-pointer">
                <span className="text-green-600">Green Space</span> Energies
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              <button onClick={() => handleNavigation('home')} className="text-gray-700 hover:text-green-700 transition-colors">Home</button>
              <a href="#about" className="text-gray-700 hover:text-green-700 transition-colors">About Us</a>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-green-700 transition-colors">
                  Products <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <a href="/products/utility-scale" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Utility Scale Solar</a>
                    <a href="/products/rooftop" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Rooftop Solar</a>
                    <a href="/products/carport" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Solar Carport</a>
                    <a href="/products/street-light" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700">Solar Street Light</a>
                  </div>
                </div>
              </div>
              <a href="#why-us" className="text-gray-700 hover:text-green-700 transition-colors">Why Green Space</a>
              <a href="#projects" className="text-gray-700 hover:text-green-700 transition-colors">Projects</a>
              <button onClick={() => handleNavigation('contact')} className="text-green-700 font-semibold">Contact Us</button>
            </nav>

            {/* Plant Monitoring Login */}
            <div className="hidden lg:flex items-center space-x-2">
              <Settings className="h-5 w-5 text-green-600" />
              <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition-colors">
                Plant Monitoring Login
              </button>
            </div>

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
                <button onClick={() => handleNavigation('home')} className="block px-3 py-2 text-gray-700 w-full text-left">Home</button>
                <a href="#about" className="block px-3 py-2 text-gray-700">About Us</a>
                <a href="#products" className="block px-3 py-2 text-gray-700">Products</a>
                <a href="#why-us" className="block px-3 py-2 text-gray-700">Why Green Space</a>
                <a href="#projects" className="block px-3 py-2 text-gray-700">Projects</a>
                <button onClick={() => handleNavigation('contact')} className="block px-3 py-2 text-green-700 font-semibold w-full text-left">Contact Us</button>
                <button className="w-full text-left px-3 py-2 bg-green-700 text-white rounded-md mt-2 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Plant Monitoring Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-[600px] bg-gradient-to-r from-green-800 via-green-700 to-green-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />

        {/* Solar Panel Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Crect x='20' y='20' width='20' height='20' rx='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Floating Solar Icons */}
        <div className="absolute top-20 left-10 animate-pulse">
          <Sun className="h-16 w-16 text-yellow-300 opacity-20" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Leaf className="h-12 w-12 text-green-300 opacity-20" />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
          <Zap className="h-14 w-14 text-yellow-300 opacity-20" />
        </div>

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
              <button
                onClick={() => handleNavigation('contact')}
                className="bg-yellow-500 hover:bg-yellow-600 text-green-900 px-8 py-4 rounded-md text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Sun className="h-5 w-5" />
                <span>Get Solar Quote</span>
              </button>
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

      {/* Certification Badges */}
      <section className="py-8 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8 md:space-x-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-700 rounded-lg flex items-center justify-center mb-2">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm font-semibold text-green-800">DPIIT</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-700 rounded-lg flex items-center justify-center mb-2">
                <Users className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm font-semibold text-green-800">MSME</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-700 rounded-lg flex items-center justify-center mb-2">
                <Sun className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm font-semibold text-green-800">ISO</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-700 rounded-lg flex items-center justify-center mb-2">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm font-semibold text-green-800">GEM</p>
            </div>
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

      {/* About Us */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=300&h=400&fit=crop"
                  alt="Solar installation"
                  className="rounded-lg border-4 border-green-200"
                />
                <img
                  src="https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=300&h=400&fit=crop"
                  alt="Solar panels"
                  className="rounded-lg mt-8 border-4 border-green-200"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sun className="h-6 w-6 text-green-600" />
                <p className="text-green-600 font-semibold">ABOUT US</p>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                LEADING SOLAR ENERGY INNOVATORS
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are among the leading solar EPC companies in the National Capital Region, specializing in
                sustainable energy solutions that power homes, businesses, and communities with clean solar technology.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With a strong presence across Commercial and Residential markets, we serve clients in New Delhi,
                Bihar, Jharkhand, Uttar Pradesh, Uttarakhand, and Jammu & Kashmir, delivering world-class solar solutions.
              </p>
              <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-md font-semibold transition-colors flex items-center space-x-2">
                <Leaf className="h-5 w-5" />
                <span>Discover More</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="h-6 w-6 text-green-600" />
              <p className="text-green-600 font-semibold">SOLAR PRODUCTS</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              COMPREHENSIVE SOLAR SOLUTIONS
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From residential rooftop installations to large-scale utility projects, we offer complete solar solutions
              designed to meet your energy needs while maximizing savings and environmental benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow border border-green-100">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-green-700 bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
                    <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-green-700 flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Learn More</span>
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 bg-green-600 p-2 rounded-lg">
                    {product.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Users className="h-6 w-6 text-green-600" />
              <p className="text-green-600 font-semibold">CLIENT FEEDBACK</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              WHAT OUR CLIENTS SAY
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-blue-900 font-semibold">
                  -{testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            SIGN UP FOR NEWSLETTER & GET LATEST NEWS & UPDATE
          </h2>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-md text-gray-900"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                <span className="text-orange-500">Green Space</span> Energies
              </div>
              <p className="text-gray-300 mb-4">
                Green Space Energies Private Limited<br />
                H. No. 6, Khasra No. 184, Near Bus Stand,<br />
                Laldora Extension, Vill. Garhi Randhala,<br />
                Delhi- 110081, India.
              </p>
              <p className="text-gray-300 mb-2">
                <a href="tel:+919870572461" className="hover:text-white transition-colors">
                  +91 98705 72461
                </a>
              </p>
              <p className="text-gray-300 mb-2">
                <a href="tel:+918700102879" className="hover:text-white transition-colors">
                  +91 8700102879
                </a>
              </p>
              <p className="text-gray-300 mb-4">
                <a href="mailto:gspaceenergies@gmail.com" className="hover:text-white transition-colors">
                  gspaceenergies@gmail.com
                </a>
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <a href="https://wa.me/919870572461" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#products" className="text-gray-300 hover:text-white">Products</a></li>
                <li><a href="#projects" className="text-gray-300 hover:text-white">Projects</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><button onClick={() => handleNavigation('contact')} className="text-gray-300 hover:text-white">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-300 mb-4">
                Get the latest updates via email. Any time you may unsubscribe
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © Green Space Energies 2025 | All Rights Reserved
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/sitemap" className="text-gray-400 hover:text-white">Sitemap</a>
              <a href="/help" className="text-gray-400 hover:text-white">Help</a>
            </div>
          </div>
        </div>
      </footer>

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
