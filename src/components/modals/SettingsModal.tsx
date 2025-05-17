import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { X, Moon, Monitor, Brush, Palette } from 'lucide-react';
import { useSettingsModal } from '@/hooks/useSettingsModal';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';

const SettingsModal = () => {
  const { isOpen, closeSettingsModal } = useSettingsModal();
  const { theme, setTheme } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeSettingsModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-fashion-purple" />
                Appearance
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-mode" className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Dark Mode
                  </Label>
                  <Switch 
                    id="theme-mode" 
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Theme Mode</Label>
                  <RadioGroup 
                    value={theme} 
                    onValueChange={setTheme}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
                <Brush className="h-5 w-5 text-fashion-purple" />
                Style Preferences
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="preferred-style" className="block mb-2">Preferred Style</Label>
                  <Select>
                    <SelectTrigger id="preferred-style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="sporty">Sporty</SelectItem>
                      <SelectItem value="bohemian">Bohemian</SelectItem>
                      <SelectItem value="vintage">Vintage</SelectItem>
                      <SelectItem value="streetwear">Streetwear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="favorite-season" className="block mb-2">Favorite Season</Label>
                  <Select>
                    <SelectTrigger id="favorite-season">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={closeSettingsModal}>Cancel</Button>
          <Button onClick={closeSettingsModal} className="bg-fashion-purple hover:bg-fashion-purple/90">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;