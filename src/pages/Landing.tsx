import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Shirt, Moon, Sun, UploadCloud, PlayCircle, Sparkles, TrendingUp, Users, Star, Instagram, Twitter, Facebook, X, Menu, CheckCircle, Palette, Brush, Wand2 } from 'lucide-react';

const Landing = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [typedText, setTypedText] = useState("Perfect Outfits");
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock data for outfits
  const outfits = [
    {
      id: 1,
      name: "Business Casual",
      category: "Work",
      image: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/shirt.svg",
      score: 94,
      tags: ["Professional", "Elegant", "Modern"]
    },
    {
      id: 2,
      name: "Weekend Getaway",
      category: "Casual",
      image: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/shirt.svg",
      score: 88,
      tags: ["Comfortable", "Trendy", "Relaxed"]
    },
    {
      id: 3,
      name: "Evening Elegance",
      category: "Formal",
      image: "https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/shirt.svg",
      score: 96,
      tags: ["Sophisticated", "Stylish", "Premium"]
    },
  ];
  
  // Features data
  const features = [
    {
      icon: <Wand2 className="w-10 h-10" />,
      title: "AI Style Scoring",
      description: "Get instant feedback on your outfit combinations with our advanced style algorithm.",
      color: "bg-violet-100",
      accentColor: "bg-violet-500"
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "Outfit Library",
      description: "Build your personal collection of high-scoring outfits for every occasion.",
      color: "bg-pink-100",
      accentColor: "bg-pink-500"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Style Analytics",
      description: "Track your style evolution and receive personalized improvement suggestions.",
      color: "bg-blue-100",
      accentColor: "bg-blue-500"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Community Feedback",
      description: "Share your looks and get feedback from our community of fashion enthusiasts.",
      color: "bg-green-100",
      accentColor: "bg-green-500"
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      quote: "FitVibe completely transformed my wardrobe. I feel more confident in my style choices now!",
      name: "Alex Johnson",
      role: "Marketing Professional"
    },
    {
      quote: "I've always struggled with putting outfits together. FitVibe makes it incredibly simple.",
      name: "Jamie Rodriguez",
      role: "Software Engineer"
    },
    {
      quote: "The scoring system is surprisingly accurate! It's like having a personal stylist.",
      name: "Taylor Smith",
      role: "Content Creator"
    }
  ];

  // Text typing effect
  useEffect(() => {
    const phrases = [
      "Perfect Outfits",
      "Confident Style",
      "Fashion Forward",
      "Unique Looks"
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setTypedText(current => current.substring(0, current.length - 1));
        typingSpeed = 50;
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex + 1));
        typingSpeed = 100;
      }
      
      currentCharIndex = isDeleting ? currentCharIndex - 1 : currentCharIndex + 1;
      
      if (!isDeleting && currentCharIndex === currentPhrase.length + 1) {
        isDeleting = true;
        typingSpeed = 1500; // pause at end
        currentCharIndex--;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // pause before typing next word
      }
      
      const timeoutId = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeoutId);
    };
    
    const initialTimeoutId = setTimeout(type, 1000);
    return () => clearTimeout(initialTimeoutId);
  }, []);
  
  // Toggle dark mode
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Create falling clothes elements
  const generateFallingClothes = () => {
    const clothesItems = [];
    const icons = [Shirt, 'shoe', 'glasses', 'hat', 'pants']; // Use component for Shirt, string for others (assuming no separate components)
    
    for (let i = 0; i < 15; i++) {
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const IconComponent = typeof randomIcon === 'string' ? null : randomIcon; // Check if it's a component

      const leftPos = Math.random() * 100;
      const animationDelay = Math.random() * 15;
      const animationDuration = 5 + Math.random() * 10;
      const size = 20 + Math.random() * 30;
      
      clothesItems.push(
        <div 
          className="falling-clothes" 
          key={i}
          style={{
            left: `${leftPos}%`,
            animationDelay: `${animationDelay}s`,
            animationDuration: `${animationDuration}s`,
            width: `${size}px`,
            height: `${size}px`
          }}
        >
          {IconComponent ? <IconComponent className="text-purple-400" /> : <i data-lucide={randomIcon} className="text-purple-400"></i>} {/* Use component or i tag */}
        </div>
      );
    }
    
    return clothesItems;
  };
  
  // Progress bar animation for features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(current => (current + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  // Set CSS variable for score meter
  const scoreCircleRef = useRef<SVGCircleElement>(null);
  useEffect(() => {
    if (scoreCircleRef.current) {
      scoreCircleRef.current.style.setProperty('--score', '94');
    }
  }, []);

  return (
    <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Header */}
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md rounded-full shadow-sm transition-all w-[95%] max-w-7xl">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-4">
              
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <Shirt className="h-7 w-7 text-fashion-purple" />
                <span className="text-xl font-bold text-gradient">FitVibe</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-fashion-purple transition-colors">Features</a>
                <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-fashion-purple transition-colors">How It Works</a>
                <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-fashion-purple transition-colors">Testimonials</a>
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-600" />
                  )}
                </button>

                {/* CTA Button */}
                <a
                  href="/create"
                  className="px-4 py-1.5 text-sm font-medium bg-gradient-1 text-white rounded-full shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Get Started
                </a>

                {/* Mobile Menu Toggle */}
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-gray-800 dark:text-white" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
              <div className="md:hidden bg-white dark:bg-gray-900 shadow rounded-b-lg px-4 py-4 animate__animated animate__fadeIn">
                <nav className="flex flex-col space-y-3 text-sm">
                  <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-fashion-purple transition-colors">Features</a>
                  <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-fashion-purple transition-colors">How It Works</a>
                  <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-fashion-purple transition-colors">Testimonials</a>
                  <a href="#" className="text-fashion-purple font-semibold">Log In</a>
                </nav>
              </div>
            )}
          </div>
        </header>


        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 text-center md:text-left slide-in-bottom" style={{animationDelay: '0.2s'}}>
                <div>
                  <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-fashion-purple text-sm font-semibold mb-4">
                    #ElevateYourStyle
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    Create <span className="text-gradient typing-animation">{typedText}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                    Upload your clothes, mix and match outfits, and get instant style scores from our AI-powered fashion assistant.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <a href="#" className="w-full sm:w-auto px-8 py-4 bg-gradient-1 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Start Styling Now
                  </a>
                  <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 rounded-full border border-gray-300 dark:border-gray-600 hover:border-fashion-purple dark:hover:border-fashion-purple transition-all duration-300">
                    <PlayCircle className="h-5 w-5" />
                    How It Works
                  </a>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">JD</div>
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">KL</div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">AZ</div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">+</div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Join <b>10,000+</b> fashion enthusiasts
                  </span>
                </div>
              </div>
              
              {/* Right Content - Interactive Demo */}
              <div className="relative clothes-container slide-in-bottom" style={{animationDelay: '0.4s'}}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animated-border mx-auto md:ml-auto md:mr-0 max-w-md">
                  {/* Score display UI */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="score-meter mb-4">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        {/* Background circle */}
                        <circle 
                          cx="100" 
                          cy="100" 
                          r="70" 
                          fill="none" 
                          stroke="#e5e7eb" 
                          strokeWidth="12"
                        />
                        
                        {/* Score indicator */}
                        <circle 
                          cx="100" 
                          cy="100" 
                          r="70" 
                          fill="none" 
                          stroke="url(#gradient)" 
                          strokeWidth="12"
                          className="score-meter-ring"
                          ref={scoreCircleRef}
                        />
                        
                        {/* Gradient definition */}
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                          <radialGradient id="beamGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#8b5cf680" />
                            <stop offset="100%" stopColor="#8b5cf600" />
                          </radialGradient>
                        </defs>
                        
                        {/* Light beam effect */}
                        <g className="score-beam">
                          <path d="M100,30 L100,10" stroke="url(#gradient)" strokeWidth="2" />
                          <path d="M100,190 L100,170" stroke="url(#gradient)" strokeWidth="2" />
                          <path d="M30,100 L10,100" stroke="url(#gradient)" strokeWidth="2" />
                          <path d="M190,100 L170,100" stroke="url(#gradient)" strokeWidth="2" />
                        </g>
                        
                        {/* Score text */}
                        <text 
                          x="100" 
                          y="90" 
                          textAnchor="middle" 
                          fontSize="40" 
                          fontWeight="bold" 
                          fill="#1f2937"
                          className="dark:fill-white"
                        >
                          94
                        </text>
                        <text 
                          x="100" 
                          y="120" 
                          textAnchor="middle" 
                          fontSize="14" 
                          fill="#4b5563"
                          className="dark:fill-gray-300"
                        >
                          STYLE SCORE
                        </text>
                      </svg>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-1">Business Casual</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-xs rounded-full">Professional</span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs rounded-full">Elegant</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 text-xs rounded-full">Modern</span>
                    </div>
                  </div>
                  
                  {/* AI feedback */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-purple-500" />
                      <span>AI Style Feedback</span>
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Great color coordination! The blazer adds a professional touch while the fit complements your body shape perfectly.
                    </p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                      Edit Outfit
                    </button>
                    <button className="flex-1 py-2 px-4 bg-gradient-1 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                      Save to Collection
                    </button>
                  </div>
                </div>
                
                {/* Falling clothes animation */}
                {generateFallingClothes()}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-fashion-purple text-sm font-semibold mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need For Perfect Outfits</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                FitVibe combines AI technology with fashion expertise to help you create stunning outfits that match your style.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`card-animated rounded-xl p-6 ${feature.color} dark:bg-gray-800/80 transition-all duration-300`}
                >
                  <div className={`w-16 h-16 rounded-xl ${feature.accentColor} bg-opacity-20 flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-fashion-purple text-sm font-semibold mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Create, Score, Improve. Repeat.</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get fashion feedback in seconds with our easy 3-step process.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-xl font-bold text-purple-600">1</div>
                <div className="pt-20 px-6">
                  <h3 className="text-xl font-bold mb-4">Upload Your Clothes</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Take photos or select items from our extensive fashion library to build your virtual wardrobe.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center">
                      <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        Drag and drop your clothes photos or browse
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center text-xl font-bold text-pink-600">2</div>
                <div className="pt-20 px-6">
                  <h3 className="text-xl font-bold mb-4">Create Your Outfit</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Mix and match different items to create complete outfits for any occasion.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <Shirt className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <i data-lucide="pants" className="h-8 w-8 text-gray-400"></i>
                      </div>
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <i data-lucide="shoe" className="h-8 w-8 text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-xl font-bold text-blue-600">3</div>
                <div className="pt-20 px-6">
                  <h3 className="text-xl font-bold mb-4">Get Your Style Score</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our AI analyzes your outfit and provides an instant style score with personalized feedback.
                  </p>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                        94
                      </div>
                      <div>
                        <p className="text-sm font-medium">Style Score</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Excellent color harmony</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outfits Showcase */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-fashion-purple text-sm font-semibold mb-4">
                Top Outfits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Style Inspirations</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Browse through our highest-rated outfit combinations for inspiration.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {outfits.map((outfit) => (
                <div key={outfit.id} className="outfit-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="h-60 bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Shirt className="h-24 w-24 text-fashion-purple" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{outfit.name}</h3>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                        {outfit.score}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{outfit.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {outfit.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full py-2 bg-transparent border border-fashion-purple text-fashion-purple hover:bg-fashion-purple hover:text-white rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-fashion-purple text-sm font-semibold mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Join thousands of satisfied users who've transformed their style with FitVibe.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Feature Spotlight */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-fashion-purple text-sm font-semibold mb-4">
                Spotlight
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Our Key Features</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore the powerful tools that make FitVibe the ultimate fashion assistant.
              </p>
            </div>
            
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                  {features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className={`mb-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeFeature === idx ? feature.color : 'bg-gray-50 dark:bg-gray-700/50'}`}
                      onClick={() => setActiveFeature(idx)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${activeFeature === idx ? feature.accentColor + ' bg-opacity-20' : 'bg-gray-200 dark:bg-gray-600'} flex items-center justify-center`}>
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{feature.title}</h3>
                          {activeFeature === idx && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="w-full mt-2">
                        <div 
                          className="progress-bar"
                          style={{ width: activeFeature === idx ? '100%' : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-7 md:pl-8">
                <div className="bg-gradient-2 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">
                    {features[activeFeature].title}
                  </h3>
                  <p className="mb-6">
                    {features[activeFeature].description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <CheckCircle className="h-6 w-6 mb-2" />
                      <h4 className="font-medium mb-1">Advanced Analysis</h4>
                      <p className="text-sm text-white/80">Detailed breakdown of style elements</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <CheckCircle className="h-6 w-6 mb-2" />
                      <h4 className="font-medium mb-1">Smart Suggestions</h4>
                      <p className="text-sm text-white/80">Personalized recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-1 rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-3 p-12 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Style?</h2>
                  <p className="text-xl opacity-90 mb-8">
                    Join thousands of fashion enthusiasts who've transformed their wardrobe with FitVibe.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#" className="px-8 py-4 bg-white text-fashion-purple font-medium rounded-full hover:bg-opacity-90 transition-all text-center">
                      Start Free Trial
                    </a>
                    <a href="#" className="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-all text-center">
                      Learn More
                    </a>
                  </div>
                </div>
                <div className="hidden md:block md:col-span-2 bg-white/10 backdrop-blur-md">
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white text-center">
                      <div className="text-4xl font-bold mb-2">10K+</div>
                      <p className="text-sm">Outfits Scored Daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-16 pb-8">
          <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-6">
            {/* Logo and tagline */}
            <div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shirt className="h-8 w-8 text-fashion-purple" />
                <span className="text-2xl font-bold text-gradient">FitVibe</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                AI-powered fashion scoring and style recommendations for the modern wardrobe.
              </p>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              <a href="www.instagram.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="www.x.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="www.facebook.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 dark:border-gray-800 w-full pt-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} FitVibe. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Landing;