import React, { useState } from 'react';
import { useStyleForge } from '@/context/StyleForgeContext';
import { Position } from '@/types/fashion';
import OutfitItem from './OutfitItem';
import StyleScoreDisplay from './StyleScoreDisplay';

const OutfitCanvas: React.FC = () => {
  const { outfitItems, addItemToOutfit, styleScore, wardrobeItems } = useStyleForge();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Get the item id from the drag event
    const itemId = e.dataTransfer.getData('text/plain');
    if (!itemId) return;
    
    // Prevent adding duplicate items
    if (outfitItems.find(item => item.id === itemId)) return;

    // Find the item in the wardrobe and add it to the outfit
    const wardrobeItem = wardrobeItems.find(item => item.id === itemId);
    if (wardrobeItem) {
      addItemToOutfit(wardrobeItem);
    }
  };

  const canvasClasses = `outfit-canvas w-full h-full flex flex-col ${isDragOver ? 'drag-over' : ''}`;

  return (
    <div className={canvasClasses}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold">Your Creation</h2>
      </div>

      <div className="relative flex-1 p-4 overflow-hidden">
        {outfitItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <p className="mb-2">Drag items here to create your outfit</p>
            <p className="text-sm">Or click on items in your wardrobe</p>
          </div>
        ) : (
          <>
            {outfitItems.map(item => (
              <OutfitItem key={item.id} item={item} />
            ))}
          </>
        )}

        {outfitItems.length > 0 && (
          <div className="absolute bottom-4 right-4">
            <StyleScoreDisplay score={styleScore} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitCanvas;
