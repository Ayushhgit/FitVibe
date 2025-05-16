import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Wardrobe from '@/components/Wardrobe';
import OutfitCanvas from '@/components/OutfitCanvas';
import SavedOutfits from '@/components/SavedOutfits';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 pt-28">
        <div className="h-[calc(100vh-8rem)] lg:col-span-1">
          <Wardrobe />
        </div>
        <div className="h-[calc(100vh-8rem)] lg:col-span-1">
          <OutfitCanvas />
        </div>
        <div className="h-[calc(100vh-8rem)] lg:col-span-1">
          <SavedOutfits />
        </div>
      </main>
    </div>
  );
};

export default Index;
