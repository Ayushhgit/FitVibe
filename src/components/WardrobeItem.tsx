
import React from 'react';
import { ClothingItem } from '@/types/fashion';
import { useStyleForge } from '@/context/StyleForgeContext';
import { Card, CardContent } from '@/components/ui/card';

interface WardrobeItemProps {
  item: ClothingItem;
}

const WardrobeItem: React.FC<WardrobeItemProps> = ({ item }) => {
  const { addItemToOutfit } = useStyleForge();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', item.id);
  };

  const categoryColors = {
    tops: 'bg-red-100 text-red-700',
    bottoms: 'bg-blue-100 text-blue-700',
    shoes: 'bg-yellow-100 text-yellow-700',
    accessories: 'bg-purple-100 text-purple-700',
    outerwear: 'bg-green-100 text-green-700'
  };

  const categoryColor = categoryColors[item.category] || 'bg-gray-100 text-gray-700';

  return (
    <Card 
      className="fashion-item hover:bg-gradient-to-br hover:from-white hover:to-fashion-purple-light/30 overflow-hidden"
      draggable
      onDragStart={handleDragStart}
      onClick={() => addItemToOutfit(item)}
    >
      <CardContent className="p-3 flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium truncate w-full">{item.name}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${categoryColor}`}>
            {item.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WardrobeItem;
