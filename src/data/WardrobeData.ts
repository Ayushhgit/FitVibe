
import { ClothingItem } from '../types/fashion';

// These are placeholders - in a real app you would have actual images
export const clothingItems: ClothingItem[] = [
  // Tops
  {
    id: 't1',
    name: 'White T-Shirt',
    category: 'tops',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'summer', 'fall', 'all'],
    styles: ['casual', 'streetwear'],
    colors: ['white']
  },
  {
    id: 't2',
    name: 'Black Turtleneck',
    category: 'tops',
    imageUrl: '/placeholder.svg',
    seasons: ['fall', 'winter'],
    styles: ['formal', 'casual'],
    colors: ['black']
  },
  {
    id: 't3',
    name: 'Floral Blouse',
    category: 'tops',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'summer'],
    styles: ['bohemian', 'casual'],
    colors: ['pink', 'green', 'white']
  },
  {
    id: 't4',
    name: 'Striped Sweater',
    category: 'tops',
    imageUrl: '/placeholder.svg',
    seasons: ['fall', 'winter'],
    styles: ['casual', 'vintage'],
    colors: ['blue', 'white']
  },
  
  // Bottoms
  {
    id: 'b1',
    name: 'Blue Jeans',
    category: 'bottoms',
    imageUrl: '/placeholder.svg',
    seasons: ['all'],
    styles: ['casual', 'streetwear'],
    colors: ['blue']
  },
  {
    id: 'b2',
    name: 'Black Dress Pants',
    category: 'bottoms',
    imageUrl: '/placeholder.svg',
    seasons: ['all'],
    styles: ['formal'],
    colors: ['black']
  },
  {
    id: 'b3',
    name: 'Pleated Skirt',
    category: 'bottoms',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'summer', 'fall'],
    styles: ['casual', 'vintage'],
    colors: ['gray']
  },
  {
    id: 'b4',
    name: 'Cargo Pants',
    category: 'bottoms',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'fall'],
    styles: ['casual', 'streetwear'],
    colors: ['green', 'brown']
  },
  
  // Shoes
  {
    id: 's1',
    name: 'White Sneakers',
    category: 'shoes',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'summer', 'fall'],
    styles: ['casual', 'streetwear', 'sporty'],
    colors: ['white']
  },
  {
    id: 's2',
    name: 'Black Dress Shoes',
    category: 'shoes',
    imageUrl: '/placeholder.svg',
    seasons: ['all'],
    styles: ['formal'],
    colors: ['black']
  },
  {
    id: 's3',
    name: 'Brown Boots',
    category: 'shoes',
    imageUrl: '/placeholder.svg',
    seasons: ['fall', 'winter'],
    styles: ['casual', 'vintage'],
    colors: ['brown']
  },
  {
    id: 's4',
    name: 'Colorful Sandals',
    category: 'shoes',
    imageUrl: '/placeholder.svg',
    seasons: ['summer'],
    styles: ['casual', 'bohemian'],
    colors: ['orange', 'blue', 'yellow']
  },
  
  // Accessories
  {
    id: 'a1',
    name: 'Gold Necklace',
    category: 'accessories',
    imageUrl: '/placeholder.svg',
    seasons: ['all'],
    styles: ['formal', 'casual', 'bohemian'],
    colors: ['yellow']
  },
  {
    id: 'a2',
    name: 'Black Sunglasses',
    category: 'accessories',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'summer'],
    styles: ['casual', 'streetwear'],
    colors: ['black']
  },
  {
    id: 'a3',
    name: 'Patterned Scarf',
    category: 'accessories',
    imageUrl: '/placeholder.svg',
    seasons: ['fall', 'winter'],
    styles: ['bohemian', 'vintage'],
    colors: ['purple', 'pink', 'blue']
  },
  {
    id: 'a4',
    name: 'Baseball Cap',
    category: 'accessories',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'summer'],
    styles: ['casual', 'sporty', 'streetwear'],
    colors: ['red', 'blue']
  },
  
  // Outerwear
  {
    id: 'o1',
    name: 'Denim Jacket',
    category: 'outerwear',
    imageUrl: '/placeholder.svg',
    seasons: ['spring', 'fall'],
    styles: ['casual', 'streetwear'],
    colors: ['blue']
  },
  {
    id: 'o2',
    name: 'Black Blazer',
    category: 'outerwear',
    imageUrl: '/placeholder.svg',
    seasons: ['fall', 'winter', 'spring'],
    styles: ['formal'],
    colors: ['black']
  },
  {
    id: 'o3',
    name: 'Trench Coat',
    category: 'outerwear',
    imageUrl: '/placeholder.svg',
    seasons: ['fall', 'winter'],
    styles: ['formal', 'casual', 'vintage'],
    colors: ['brown', 'beige']
  },
  {
    id: 'o4',
    name: 'Puffer Jacket',
    category: 'outerwear',
    imageUrl: '/placeholder.svg',
    seasons: ['winter'],
    styles: ['casual', 'sporty', 'streetwear'],
    colors: ['red', 'black']
  }
];
