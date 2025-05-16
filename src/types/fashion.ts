export type ClothingCategory = 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'outerwear';

export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all';

export type Style = 'casual' | 'formal' | 'sporty' | 'bohemian' | 'vintage' | 'streetwear';

export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'orange' | 'brown' | 'black' | 'white' | 'gray' | 'beige';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  imageUrl: string;
  seasons: Season[];
  styles: Style[];
  colors: Color[];
}

export interface StyleScore {
  total: number;
  combos: StyleCombo[];
}

export interface StyleCombo {
  name: string;
  description: string;
  score: number;
}

export interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  score: StyleScore;
  createdAt: Date;
  isFavorite: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface DraggableItem extends ClothingItem {
  position: Position;
}
