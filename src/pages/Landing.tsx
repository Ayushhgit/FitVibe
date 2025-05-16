import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { Brush, Sparkles, Shirt, Heart, User, Settings } from 'lucide-react';
import { useProfileModal } from '@/hooks/useProfileModal';
import { useSettingsModal } from '@/hooks/useSettingsModal';

const Landing = () => {
  const { openProfileModal } = useProfileModal();
  const { openSettingsModal } = useSettingsModal();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b py-4 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brush className="h-6 w-6 text-fashion-purple" />
          <div className="font-bold text-2xl text-fashion-purple">StyleForge</div>
          <span className="hidden sm:block text-sm px-3 py-1 bg-gradient-to-r from-fashion-purple/20 to-fashion-purple-light/20 rounded-full">
            Beta
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={openProfileModal} 
            className="rounded-full transition-all duration-300 hover:bg-fashion-purple hover:text-white"
          >
            <User className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={openSettingsModal}
            className="rounded-full transition-all duration-300 hover:bg-fashion-purple hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        <section className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Create Your Perfect 
                <span className="text-fashion-purple"> Style</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                Mix and match clothing items to create stunning outfits. Discover your personal style and save your favorite looks.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/create">
                  <Button className="bg-fashion-purple hover:bg-fashion-purple/90 text-lg px-8 py-6 h-auto">
                    Start Creating
                  </Button>
                </Link>
                <Link to="/saved">
                  <Button variant="outline" className="text-lg px-8 py-6 h-auto">
                    View Saved Outfits
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-fashion-soft-pink via-fashion-soft-blue to-fashion-soft-peach rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl" />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <Shirt className="h-32 w-32 text-fashion-purple animate-float" />
                </div>
                <div className="absolute top-12 right-16">
                  <Sparkles className="h-8 w-8 text-fashion-purple-light animate-float" />
                </div>
                <div className="absolute bottom-20 left-12">
                  <Sparkles className="h-6 w-6 text-fashion-purple-light animate-float" />
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 transform rotate-12">
                <div className="bg-fashion-purple text-white py-2 px-6 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span>Style Score: 95</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-10 -left-4 transform -rotate-6">
                <div className="bg-white dark:bg-gray-800 py-2 px-6 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>Summer Vibes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brush className="h-8 w-8 text-fashion-purple" />,
                title: "Drag & Drop",
                description: "Easily drag clothing items from the wardrobe onto the canvas."
              },
              {
                icon: <Sparkles className="h-8 w-8 text-fashion-purple" />,
                title: "Get Scored",
                description: "Receive real-time style scores based on your outfit combinations."
              },
              {
                icon: <Heart className="h-8 w-8 text-fashion-purple" />,
                title: "Save Favorites",
                description: "Save your favorite outfits to revisit and share later."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="bg-card rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="bg-fashion-purple/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-gray-500">
        <p>© 2025 StyleForge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
