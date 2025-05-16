import React from 'react';
import { useStyleForge } from '@/context/StyleForgeContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart } from 'lucide-react';

const SavedOutfits: React.FC = () => {
  const { savedOutfits, toggleFavorite } = useStyleForge();

  if (savedOutfits.length === 0) {
    return (
      <div className="h-full flex flex-col border rounded-lg bg-card">
        <h2 className="text-lg font-bold p-4 border-b">Saved Outfits</h2>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground">No saved outfits yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border rounded-lg bg-card">
      <h2 className="text-lg font-bold p-4 border-b">Saved Outfits</h2>
      <ScrollArea className="flex-1">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedOutfits.map((outfit) => (
            <Card key={outfit.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold truncate">{outfit.name}</h3>
                  <span className="text-sm text-fashion-purple font-semibold">
                    Score: {outfit.score.total}
                  </span>
                </div>
                <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden">
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
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold">+{outfit.items.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0 flex justify-between">
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
      </ScrollArea>
    </div>
  );
};

export default SavedOutfits;
