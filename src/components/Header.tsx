import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useStyleForge } from "@/context/StyleForgeContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Heart, UserRound, Settings, Shirt } from "lucide-react";
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
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-full bg-white/30 dark:bg-background/60 backdrop-blur-lg shadow-xl border border-gray-200 dark:border-gray-700 px-6 py-4 transition-300 flex items-center justify-between">
      <div className="flex items-center gap-2">
      <Shirt className="h-7 w-7 text-pink-400" />
       <a href="/"> <div className="font-bold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">FitVibe</div></a>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="hidden sm:flex items-center bg-fashion-gradient text-foreground transition-colors rounded-full px-4 py-1.5">
          <span className="mr-1 font-medium">Score:</span>
          <span className="text-pink-400 font-bold">{styleScore.total}</span>
        </div> 
        <Button 
          variant="outline" 
          onClick={clearOutfit}
          className="hidden sm:flex text-white bg-gradient-to-r from-indigo-500 to-pink-500  hover:bg-fashion-purple/20 hover:text-fashion-purple">
          Clear
        </Button>
        <Link to="/saved" className="hidden sm:block">
          <Button variant="ghost" size="icon" className="rounded-full transition-all duration-300 hover:bg-fashion-purple/20 hover:text-fashion-purple">
            <Heart className="h-5 w-5 text-pink-400" />
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={openProfileModal}
          className="rounded-full transition-all duration-300 hover:bg-fashion-purple/20 hover:text-fashion-purple" >
          <UserRound className="h-5 w-5 text-pink-400" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={openSettingsModal}
          className="rounded-full transition-all duration-300 hover:bg-fashion-purple/20 hover:text-fashion-purple"
        >
          <Settings className="h-5 w-5 text-pink-400" />
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
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
