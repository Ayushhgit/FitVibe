import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyleForge } from '@/context/StyleForgeContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Brush, Search, UserRound, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ThemeToggle from '@/components/ThemeToggle';
import { useProfileModal } from '@/hooks/useProfileModal';
import { useSettingsModal } from '@/hooks/useSettingsModal';

const SavedOutfits: React.FC = () => {
  const { savedOutfits, toggleFavorite } = useStyleForge();
  const { openProfileModal } = useProfileModal();
  const { openSettingsModal } = useSettingsModal();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOutfits = savedOutfits.filter(outfit =>
    outfit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b py-4 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Brush className="h-6 w-6 text-fashion-purple" />
          <div className="font-bold text-2xl text-fashion-purple">StyleForge</div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={openProfileModal} 
            className="rounded-full transition-all duration-300 hover:bg-fashion-purple hover:text-white"
          >
            <UserRound className="h-5 w-5" />
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Saved Outfits</h1>
            <p className="text-muted-foreground mt-1">Browse and manage your saved outfit collections</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search outfits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredOutfits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">No outfits found</h2>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? "No outfits match your search. Try different keywords."
                : "You haven't saved any outfits yet. Create your first outfit!"}
            </p>
            {!searchTerm && (
              <Link to="/create">
                <Button className="bg-fashion-purple hover:bg-fashion-purple/90">
                  Create an Outfit
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOutfits.map((outfit) => (
              <Card key={outfit.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold truncate">{outfit.name}</h3>
                    <span className="text-sm text-fashion-purple font-semibold">
                      Score: {outfit.score.total}
                    </span>
                  </div>
                  <div className="h-36 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                    <div className="flex flex-wrap justify-center gap-2 p-2">
                      {outfit.items.map((item) => (
                        <div key={item.id} className="w-16 h-16 overflow-hidden rounded">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(outfit.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => toggleFavorite(outfit.id)}
                    className={`${
                      outfit.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    } transition-colors`}
                    aria-label={outfit.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart size={16} fill={outfit.isFavorite ? "currentColor" : "none"} />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedOutfits;
