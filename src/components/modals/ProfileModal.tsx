import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserRound, Settings, Award, Heart, Clock, X, Pencil } from 'lucide-react';
import { useProfileModal } from '@/hooks/useProfileModal';
import { useStyleForge } from '@/context/StyleForgeContext';


const ProfileModal = () => {
  const { isOpen, closeProfileModal } = useProfileModal();
  const { savedOutfits } = useStyleForge();
  const [name, setName] = useState('Style Master');
  const [isEditing, setIsEditing] = useState(false);

  const favoriteOutfits = savedOutfits.filter(outfit => outfit.isFavorite);
  const highestScore = savedOutfits.length > 0 
    ? Math.max(...savedOutfits.map(outfit => outfit.score.total))
    : 0;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };

  console.log('savedOutfits in modal:', savedOutfits);
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeProfileModal()}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="text-center">Profile</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="flex flex-col items-center pt-4">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-fashion-purple text-white text-xl">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-center gap-1 mb-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  autoFocus
                  className="text-2xl font-bold text-center border-b border-gray-300 focus:outline-none focus:border-fashion-purple bg-transparent"
                  maxLength={20}
                  style={{ width: `${Math.max(name.length, 8)}ch`, minWidth: '6ch', maxWidth: '16ch' }}
                />
                <Pencil className="h-5 w-5 text-muted-foreground" aria-label="Edit name" />
              </>
            ) : (
              <>
                <h2
                  className="text-2xl font-bold cursor-pointer"
                  onClick={() => setIsEditing(true)}
                  title="Click to edit name"
                >
                  {name}
                </h2>
                <Pencil
                  className="h-5 w-5 text-muted-foreground cursor-pointer"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit name"
                />
              </>
            )}
          </div>
          <p className="text-muted-foreground mb-2">Fashion Enthusiast</p>
          <div className="grid grid-cols-3 w-full gap-2 mb-3">
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
              <p className="text-muted-foreground text-sm">Outfits</p>
              <p className="font-bold text-xl">{savedOutfits.length}</p>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
              <p className="text-muted-foreground text-sm">Favorites</p>
              <p className="font-bold text-xl">{favoriteOutfits.length}</p>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
              <p className="text-muted-foreground text-sm">Top Score</p>
              <p className="font-bold text-xl">{highestScore}</p>
            </div>
          </div>
          <div className="w-full space-y-1.5">
            <div className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Award className="h-5 w-5 mr-3 text-fashion-purple" />
              <span>Achievements</span>
            </div>
            <div className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Heart className="h-5 w-5 mr-3 text-fashion-purple" />
              <span>Favorite Styles</span>
            </div>
            <div className="flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Clock className="h-5 w-5 mr-3 text-fashion-purple" />
              <span>Activity History</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={closeProfileModal}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
