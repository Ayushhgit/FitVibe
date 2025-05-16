import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useStyleForge } from "@/context/StyleForgeContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Heart, UserRound, Settings } from "lucide-react";
import { useProfileModal } from "@/hooks/useProfileModal";
import { useSettingsModal } from "@/hooks/useSettingsModal";

const Header: React.FC = () => {
  const { styleScore, clearOutfit, saveOutfit } = useStyleForge();
  const [outfitName, setOutfitName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { openProfileModal } = useProfileModal();
  const { openSettingsModal } = useSettingsModal();

  const handleSave = () => {
    saveOutfit(outfitName);
    setOutfitName("");
    setIsDialogOpen(false);
  };

  return (
    <header className="sticky top-10 z-50 bg-background/80 backdrop-blur-md border-b py-3 px-4 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="font-bold text-2xl text-fashion-purple">StyleForge</div>
        <span className="hidden sm:block text-sm px-3 py-1 bg-gradient-to-r from-fashion-purple/20 to-fashion-purple-light/20 rounded-full">
          Beta
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center bg-fashion-purple/10 rounded-full px-4 py-1.5">
          <span className="mr-1 font-medium">Score:</span>
          <span className="text-fashion-purple font-bold">{styleScore.total}</span>
        </div>
        
        <Button 
          variant="outline" 
          onClick={clearOutfit}
          className="hidden sm:flex"
        >
          Clear
        </Button>
        
        <Link to="/saved" className="hidden sm:block">
          <Button variant="ghost" size="icon" className="rounded-full transition-all duration-300 hover:bg-fashion-purple hover:text-white">
            <Heart className="h-5 w-5" />
          </Button>
        </Link>
        
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
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-fashion-purple hover:bg-fashion-purple/90">
              Save Outfit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Your Creation</DialogTitle>
              <DialogDescription>
                Give your outfit a name to save it to your collection.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="My awesome outfit"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="mb-4"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-fashion-purple hover:bg-fashion-purple/90">
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
