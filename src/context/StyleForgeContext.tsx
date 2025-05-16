import React, { createContext, useState, useContext, useEffect } from 'react';
import { ClothingItem, Outfit, StyleScore, ClothingCategory, DraggableItem, Position } from '../types/fashion';
import { clothingItems } from '../data/WardrobeData';
import { calculateStyleScore } from '../utils/styleScorer';
import { useToast } from '@/hooks/use-toast';

interface StyleForgeContextProps {
  wardrobeItems: ClothingItem[];
  filteredItems: ClothingItem[];
  outfitItems: DraggableItem[];
  selectedCategory: ClothingCategory | 'all';
  styleScore: StyleScore;
  savedOutfits: Outfit[];
  filterCategory: (category: ClothingCategory | 'all') => void;
  addItemToOutfit: (item: ClothingItem) => void;
  removeItemFromOutfit: (itemId: string) => void;
  updateItemPosition: (itemId: string, position: Position) => void;
  saveOutfit: (name: string) => void;
  toggleFavorite: (outfitId: string) => void;
  clearOutfit: () => void;
}

const StyleForgeContext = createContext<StyleForgeContextProps | undefined>(undefined);

export const StyleForgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wardrobeItems] = useState<ClothingItem[]>(clothingItems);
  const [filteredItems, setFilteredItems] = useState<ClothingItem[]>(clothingItems);
  const [outfitItems, setOutfitItems] = useState<DraggableItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | 'all'>('all');
  const [styleScore, setStyleScore] = useState<StyleScore>({ total: 0, combos: [] });
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    // Recalculate score whenever outfit changes
    const clothingItems = outfitItems.map(item => ({
      id: item.id,
      name: item.name,
      category: item.category,
      imageUrl: item.imageUrl,
      seasons: item.seasons,
      styles: item.styles,
      colors: item.colors
    }));
    
    const newScore = calculateStyleScore(clothingItems);
    setStyleScore(newScore);
  }, [outfitItems]);

  const filterCategory = (category: ClothingCategory | 'all') => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredItems(wardrobeItems);
    } else {
      setFilteredItems(wardrobeItems.filter(item => item.category === category));
    }
  };

  const addItemToOutfit = (item: ClothingItem) => {
    // Check if we already have this item in the outfit
    if (outfitItems.some(existingItem => existingItem.id === item.id)) {
      toast({
        title: "Already added",
        description: `${item.name} is already in your outfit.`,
        variant: "destructive"
      });
      return;
    }
    
    // Set initial position for the item
    const draggableItem: DraggableItem = {
      ...item,
      position: { x: 0, y: 0 } // Default position, will be updated when dragged
    };
    
    setOutfitItems(prev => [...prev, draggableItem]);
    
    // Show a toast notification
    toast({
      title: "Item Added",
      description: `${item.name} added to your outfit.`
    });
  };

  const removeItemFromOutfit = (itemId: string) => {
    setOutfitItems(prev => prev.filter(item => item.id !== itemId));
    
    // Show a toast notification
    const item = outfitItems.find(item => item.id === itemId);
    if (item) {
      toast({
        title: "Item Removed",
        description: `${item.name} removed from your outfit.`
      });
    }
  };

  const updateItemPosition = (itemId: string, position: Position) => {
    setOutfitItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, position } 
          : item
      )
    );
  };

  const saveOutfit = (name: string) => {
    if (outfitItems.length === 0) {
      toast({
        title: "Can't Save Empty Outfit",
        description: "Add some items to your outfit before saving.",
        variant: "destructive"
      });
      return;
    }

    const newOutfit: Outfit = {
      id: `outfit-${Date.now()}`,
      name: name || `Outfit #${savedOutfits.length + 1}`,
      items: outfitItems.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        imageUrl: item.imageUrl,
        seasons: item.seasons,
        styles: item.styles,
        colors: item.colors
      })),
      score: styleScore,
      createdAt: new Date(),
      isFavorite: false
    };

    setSavedOutfits(prev => [newOutfit, ...prev]);
    toast({
      title: "Outfit Saved",
      description: `"${newOutfit.name}" has been saved to your collection.`
    });
  };

  const toggleFavorite = (outfitId: string) => {
    setSavedOutfits(prev => 
      prev.map(outfit => 
        outfit.id === outfitId 
          ? { ...outfit, isFavorite: !outfit.isFavorite } 
          : outfit
      )
    );
    
    const outfit = savedOutfits.find(outfit => outfit.id === outfitId);
    if (outfit) {
      toast({
        title: outfit.isFavorite ? "Removed from Favorites" : "Added to Favorites",
        description: `"${outfit.name}" ${outfit.isFavorite ? "removed from" : "added to"} favorites.`
      });
    }
  };

  const clearOutfit = () => {
    if (outfitItems.length === 0) return;
    
    setOutfitItems([]);
    toast({
      title: "Outfit Cleared",
      description: "All items removed from your current outfit."
    });
  };

  return (
    <StyleForgeContext.Provider
      value={{
        wardrobeItems,
        filteredItems,
        outfitItems,
        selectedCategory,
        styleScore,
        savedOutfits,
        filterCategory,
        addItemToOutfit,
        removeItemFromOutfit,
        updateItemPosition,
        saveOutfit,
        toggleFavorite,
        clearOutfit
      }}
    >
      {children}
    </StyleForgeContext.Provider>
  );
};

export const useStyleForge = () => {
  const context = useContext(StyleForgeContext);
  if (context === undefined) {
    throw new Error('useStyleForge must be used within a StyleForgeProvider');
  }
  return context;
};
