import React, { useState, useEffect } from 'react';
import { DraggableItem } from '@/types/fashion';
import { useStyleForge } from '@/context/StyleForgeContext';
import { X } from 'lucide-react';

interface OutfitItemProps {
  item: DraggableItem;
}

const OutfitItem: React.FC<OutfitItemProps> = ({ item }) => {
  const { removeItemFromOutfit, updateItemPosition } = useStyleForge();
  const [position, setPosition] = useState(item.position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Update local position when item position changes
  useEffect(() => {
    setPosition(item.position);
  }, [item.position]);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    
    // Calculate the offset from the pointer position to the top-left of the item
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
    
    // Set the drag image to be transparent (trick to make the original item invisible during drag)
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e: React.DragEvent) => {
    if (!e.clientX || !e.clientY) return; // Sometimes drag events fire with 0,0 coords
    
    // Calculate new position, accounting for the initial click offset
    const rect = e.currentTarget.closest('.relative')?.getBoundingClientRect();
    if (!rect) return;
    
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    updateItemPosition(item.id, position);
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: isDragging ? 100 : 10,
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'transform 0.2s ease-out',
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
  };

  return (
    <div 
      className="absolute" 
      style={style}
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div className="relative group">
        <div className="p-1 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-full h-full object-cover rounded"
            />
            
            <button 
              onClick={() => removeItemFromOutfit(item.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove item"
            >
              <X size={10} />
            </button>
          </div>
        </div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-medium bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full shadow whitespace-nowrap opacity-80">
          {item.name}
        </div>
      </div>
    </div>
  );
};

export default OutfitItem;
