
import React from 'react';
import WardrobeFilter from './WardrobeFilter';
import WardrobeItem from './WardrobeItem';
import { useStyleForge } from '@/context/StyleForgeContext';
import { ScrollArea } from '@/components/ui/scroll-area';

const Wardrobe: React.FC = () => {
  const { filteredItems } = useStyleForge();

  return (
    <div className="h-full flex flex-col border rounded-lg bg-card">
      <h2 className="text-lg font-bold p-4 border-b">Your Wardrobe</h2>
      <WardrobeFilter />
      <ScrollArea className="flex-1">
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredItems.map(item => (
            <WardrobeItem key={item.id} item={item} />
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No items found in this category
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Wardrobe;
