import React from 'react';
import { useStyleForge } from '@/context/StyleForgeContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Trash2 } from 'lucide-react';

const SavedOutfits: React.FC = () => {
  const { savedOutfits, toggleFavorite, removeOutfit } = useStyleForge();

  if (savedOutfits.length === 0) {
    return (
      <div className="h-full flex flex-col border rounded-lg 
        bg-gradient-to-bl from-purple-400 to-pink-400 
        dark:from-purple-600 dark:to-pink-600 shadow-md">
        <h2 className="text-lg font-bold p-4 text-white border-b border-white/30">Saved Outfits</h2>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-white/80 italic">No saved outfits yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border rounded-lg 
      bg-gradient-to-bl from-purple-400 to-pink-400 
      dark:from-purple-600 dark:to-pink-600 shadow-md">
      <h2 className="text-lg text-white font-bold p-4 border-b border-white/30">Saved Outfits</h2>
      <ScrollArea className="flex-1">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedOutfits.map((outfit) => (
            <Card
              key={outfit.id}
              className="overflow-hidden hover:shadow-lg transition-shadow border-none bg-white/80 dark:bg-black/30 backdrop-blur-md"
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold truncate text-gray-800 dark:text-white">{outfit.name}</h3>
                  <span className="text-sm font-semibold text-purple-600 dark:text-pink-300">
                    Score: {outfit.score.total}
                  </span>
                </div>
                <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center overflow-hidden">
                  <div className="flex space-x-2 px-2">
                    {outfit.items.slice(0, 4).map((item) => (
                      <div key={item.id} className="w-10 h-10 overflow-hidden rounded">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {outfit.items.length > 4 && (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                          +{outfit.items.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0 flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  {new Date(outfit.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(outfit.id)}
                    className={`${
                      outfit.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    } transition-colors`}
                    aria-label={outfit.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart size={16} fill={outfit.isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => removeOutfit(outfit.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    aria-label="Remove outfit"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SavedOutfits;
