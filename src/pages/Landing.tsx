import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Link } from 'react-router-dom';
import { 
  Shirt, Moon, Sun, UploadCloud, PlayCircle, Sparkles, TrendingUp, 
  Users, Star, Instagram, Twitter, Facebook, X, Menu, CheckCircle, 
  Palette, Brush, Wand2, Glasses, ShoppingBag, MessageCircle, 
  ChevronUp, Share2, Save, Plus, Circle, Layers, Gem, Bookmark,
  StarHalf, Youtube, Linkedin, Send, Cpu, Eye, Calendar, Gem as GemIcon
} from 'lucide-react';

const Landing = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const [typedText, setTypedText] = useState("Perfect Outfits");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: "👋 Hi there! I'm your AI style assistant. How can I help you with your fashion today?" }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Text typing effect
  useEffect(() => {
    const phrases = [
      "Perfect Outfits",
      "Confident Style",
      "Fashion Forward",
      "Unique Looks",
      "Personal Expression"
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
        typingSpeed = 1500;
        currentCharIndex--;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
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

  // Handle chat input
  const handleChatInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && chatInput.trim() !== '') {
      // Add user message
      setChatMessages(prev => [...prev, { type: 'user', text: chatInput }]);
      
      // Clear input
      setChatInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "What's your preferred style? Casual, professional, or something else?",
          "Blue and navy are great complementary colors! They create a harmonious look.",
          "For a business casual look, try pairing a blazer with dark jeans and loafers.",
          "Layering is key for fall fashion. Consider adding a lightweight jacket to your outfit.",
          "Accessories can transform a basic outfit. Have you tried adding a statement piece?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setChatMessages(prev => [...prev, { type: 'ai', text: randomResponse }]);
      }, 1000);
    }
  };

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-primary z-50 w-0" id="progress-bar"></div>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white dark:bg-neutral-900 p-8 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Shirt className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-gradient">FitVibe</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mb-8">
          <ul className="space-y-4">
            <li><a href="#features" className="block py-2 text-lg hover:text-primary transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="block py-2 text-lg hover:text-primary transition-colors">How It Works</a></li>
            <li><a href="#demo" className="block py-2 text-lg hover:text-primary transition-colors">Interactive Demo</a></li>
            <li><a href="#ai-analysis" className="block py-2 text-lg hover:text-primary transition-colors">AI Analysis</a></li>
            <li><a href="#testimonials" className="block py-2 text-lg hover:text-primary transition-colors">Testimonials</a></li>
            <li><a href="#pricing" className="block py-2 text-lg hover:text-primary transition-colors">Pricing</a></li>
          </ul>
        </nav>

        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg">Sign Up Free</button>
          <button className="w-full px-6 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium">Log In</button>

          <div className="flex justify-center space-x-4 mt-6">
            <a href="#" className="text-neutral-500 hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-white/80 dark:bg-neutral-900/80 rounded-full backdrop-blur-md transition-all duration-300 w-[95%] max-w-7xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Shirt className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold text-gradient">FitVibe</span>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/create">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg">Try Free</button>
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
                )}
              </button>

              <button 
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-1/4 left-1/4 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-gradient-to-br from-primary/15 to-secondary/15 animate-morph"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-gradient-to-br from-primary/15 to-secondary/15 animate-morph opacity-70"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero content */}
            <div className="fade-in-left">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                The AI-Powered Fashion Assistant
              </span>

              <h1 className="mb-6 font-bold text-4xl md:text-5xl lg:text-6xl">
                Create <span className="text-gradient typing-animation">{typedText}</span>
                <br />For Any Occasion
              </h1>

              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-xl">
                FitVibe uses advanced AI to analyze your clothing, create stunning outfit combinations, and provide personalized style recommendations with an instant style score.
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-12">
                <Link to="/create">
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg w-full sm:w-auto">Start Styling Now</button>
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/150?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-800" />
                  <img src="https://i.pravatar.cc/150?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-800" />
                  <img src="https://i.pravatar.cc/150?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-800" />
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-xs border-2 border-white dark:border-neutral-800">+58K</div>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Joined by <strong>58,000+</strong> fashion enthusiasts
                </span>
              </div>
            </div>

            {/* Hero interactive demo */}
            <div className="relative clothes-container fade-in-right">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 animated-border mx-auto md:ml-auto md:mr-0 max-w-md relative z-10">
                {/* Style score meter */}
                <div className="flex flex-col items-center mb-6">
                  <div className="score-meter mb-4">
                    <svg width="180" height="180" viewBox="0 0 180 180">
                      <circle 
                        cx="90" 
                        cy="90" 
                        r="80" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="12"
                      />
                      <circle 
                        cx="90" 
                        cy="90" 
                        r="80" 
                        fill="none" 
                        stroke="url(#score-gradient)" 
                        strokeWidth="12"
                        className="score-ring"
                        style={{ '--score-offset': '88' } as any}
                        id="score-ring"
                      />
                      <defs>
                        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#A55AFF" />
                          <stop offset="100%" stopColor="#FF96C8" />
                        </linearGradient>
                      </defs>
                      <text 
                        x="90" 
                        y="85" 
                        textAnchor="middle" 
                        fontSize="42" 
                        fontWeight="bold" 
                        fill="#1f2937"
                        className="dark:fill-white"
                        id="score-text"
                      >
                        94
                      </text>
                      <text 
                        x="90" 
                        y="115" 
                        textAnchor="middle" 
                        fontSize="16" 
                        fill="#6b7280"
                        className="dark:fill-neutral-400"
                      >
                        STYLE SCORE
                      </text>
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold mb-2">Business Professional</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs rounded-full">Professional</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-full">Sophisticated</span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-xs rounded-full">Confident</span>
                  </div>
                </div>

                {/* AI feedback */}
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 dark:bg-neutral-800/80 rounded-lg p-4 mb-6 border border-neutral-200 dark:border-neutral-700">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>AI Style Analysis</span>
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-grey-400">
                    <span className="font-medium text-neutral-900 dark:text-neutral-200">Exceptional color harmony!</span > The navy blazer pairs perfectly with the cream shirt and brown shoes. The fit accentuates your frame while maintaining professionalism.
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 py-3 px-4 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                    <Brush className="h-4 w-4" />
                    Refine Outfit
                  </button>
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg transition-opacity font-medium flex items-center justify-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Look
                  </button>
                </div>

                {/* Success banner (hidden by default) */}
                <div className="hidden mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg text-sm flex items-center gap-2 animate__animated animate__fadeIn" id="success-banner">
                  <CheckCircle className="h-5 w-5" />
                  <span>Outfit saved to your collection!</span>
                </div>
              </div>

              {/* Falling clothes animation */}
              <div id="falling-clothes"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat widget */}
      <div className="fixed bottom-6 right-6 z-50">
  <div 
    className="w-16 h-16 rounded-[2rem] bg-gradient-to-r from-purple-300 to-pink-300 flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
    onClick={() => setIsChatOpen(!isChatOpen)}
  >
    <MessageCircle className="h-6 w-6" />
  </div>

  <div 
    className={`absolute bottom-20 right-0 w-80 h-96 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
      isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
    }`}
  >
    <div className="bg-gradient-to-r from-purple-300 to-pink-300 p-4 text-white">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5" />
        <div>
          <h4 className="font-medium">Style Assistant</h4>
          <p className="text-xs opacity-90">Powered by FitVibe AI</p>
        </div>
      </div>
    </div>

    <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4" ref={chatMessagesRef}>
      {chatMessages.map((message, index) => (
        <div 
          key={index}
          className={`p-3 rounded-xl max-w-[80%] ${
            message.type === 'ai' 
              ? 'bg-pink-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100' 
              : 'bg-gradient-to-r from-purple-300 to-pink-300 text-white ml-auto'
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>

    <div className="p-4 border-t border-pink-200 dark:border-pink-700">
      <div className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyPress={handleChatInput}
          placeholder="Ask about style advice..."
          className="flex-1 px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-700"
        />
        <button className="p-2 text-pink-500 hover:text-pink-600 transition-colors">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</div>

{/* Back to top button */}
<a 
  href="#top" 
  className="fixed bottom-6 left-6 px-4 py-3 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full shadow-lg z-40 opacity-0 invisible transition-all duration-300"
  id="back-to-top"
>
  <ChevronUp className="h-6 w-6 text-white" />
</a>

    </div>
  );
};

export default Landing;