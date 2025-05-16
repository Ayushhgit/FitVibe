
import { ClothingItem } from '../types/fashion';

// These are placeholders - in a real app you would have actual images
export const clothingItems: ClothingItem[] = [
  // Tops
  {
    id: 't1',
    name: 'White T-Shirt',
    category: 'tops',
    imageUrl: '/images/clothes/white-tee.jpg',
    seasons: ['spring', 'summer', 'fall', 'all'],
    styles: ['casual', 'streetwear'],
    colors: ['white']
  },
  {
    id: 't2',
    name: 'Black Turtleneck',
    category: 'tops',
    imageUrl: '/images/clothes/black_tn.webp',
    seasons: ['fall', 'winter'],
    styles: ['formal', 'casual'],
    colors: ['black']
  },
  {
    id: 't3',
    name: 'Floral Blouse',
    category: 'tops',
    imageUrl: '/images/clothes/fb.webp',
    seasons: ['spring', 'summer'],
    styles: ['bohemian', 'casual'],
    colors: ['pink', 'green', 'white']
  },
  {
    id: 't4',
    name: 'Striped Sweater',
    category: 'tops',
    imageUrl: '/images/clothes/ss.jpg',
    seasons: ['fall', 'winter'],
    styles: ['casual', 'vintage'],
    colors: ['blue', 'white']
  },
  
  // Bottoms
  {
    id: 'b1',
    name: 'Blue Jeans',
    category: 'bottoms',
    imageUrl: '/images/clothes/bjeans.webp',
    seasons: ['all'],
    styles: ['casual', 'streetwear'],
    colors: ['blue']
  },
  {
    id: 'b2',
    name: 'Black Dress Pants',
    category: 'bottoms',
    imageUrl: '/images/clothes/bdp.webp',
    seasons: ['all'],
    styles: ['formal'],
    colors: ['black']
  },
  {
    id: 'b3',
    name: 'Pleated Skirt',
    category: 'bottoms',
    imageUrl: '/images/clothes/ps.avif',
    seasons: ['spring', 'summer', 'fall'],
    styles: ['casual', 'vintage'],
    colors: ['gray']
  },
  {
    id: 'b4',
    name: 'Cargo Pants',
    category: 'bottoms',
    imageUrl: '/images/clothes/cp.avif',
    seasons: ['spring', 'fall'],
    styles: ['casual', 'streetwear'],
    colors: ['green', 'brown']
  },
  
  // Shoes
  {
    id: 's1',
    name: 'White Sneakers',
    category: 'shoes',
    imageUrl: '/images/shoes/ws.webp',
    seasons: ['spring', 'summer', 'fall'],
    styles: ['casual', 'streetwear', 'sporty'],
    colors: ['white']
  },
  {
    id: 's2',
    name: 'Black Dress Shoes',
    category: 'shoes',
    imageUrl: '/images/shoes/bs.webp',
    seasons: ['all'],
    styles: ['formal'],
    colors: ['black']
  },
  {
    id: 's3',
    name: 'Brown Boots',
    category: 'shoes',
    imageUrl: '/images/shoes/bb.jpg',
    seasons: ['fall', 'winter'],
    styles: ['casual', 'vintage'],
    colors: ['brown']
  },
  {
    id: 's4',
    name: 'Colorful Sandals',
    category: 'shoes',
    imageUrl: '/images/shoes/cs.avif',
    seasons: ['summer'],
    styles: ['casual', 'bohemian'],
    colors: ['orange', 'blue', 'yellow']
  },
  
  // Accessories
  {
    id: 'a1',
    name: 'Gold Necklace',
    category: 'accessories',
    imageUrl: '/images/assc/gn.jpg',
    seasons: ['all'],
    styles: ['formal', 'casual', 'bohemian'],
    colors: ['yellow']
  },
  {
    id: 'a2',
    name: 'Black Sunglasses',
    category: 'accessories',
    imageUrl: '/images/assc/bs.jpg',
    seasons: ['spring', 'summer'],
    styles: ['casual', 'streetwear'],
    colors: ['black']
  },
  {
    id: 'a3',
    name: 'Patterned Scarf',
    category: 'accessories',
    imageUrl: '/images/assc/ps.jpg',
    seasons: ['fall', 'winter'],
    styles: ['bohemian', 'vintage'],
    colors: ['purple', 'pink', 'blue']
  },
  {
    id: 'a4',
    name: 'Baseball Cap',
    category: 'accessories',
    imageUrl: '/images/assc/bc.jpg',
    seasons: ['spring', 'summer'],
    styles: ['casual', 'sporty', 'streetwear'],
    colors: ['red', 'blue']
  },
  
  // Outerwear
  {
    id: 'o1',
    name: 'Denim Jacket',
    category: 'outerwear',
    imageUrl: '/images/owear/dj.jpg',
    seasons: ['spring', 'fall'],
    styles: ['casual', 'streetwear'],
    colors: ['blue']
  },
  {
    id: 'o2',
    name: 'Black Blazer',
    category: 'outerwear',
    imageUrl: '/images/owear/bb.webp',
    seasons: ['fall', 'winter', 'spring'],
    styles: ['formal'],
    colors: ['black']
  },
  {
    id: 'o3',
    name: 'Trench Coat',
    category: 'outerwear',
    imageUrl: '/images/owear/tc.webp',
    seasons: ['fall', 'winter'],
    styles: ['formal', 'casual', 'vintage'],
    colors: ['brown', 'beige']
  },
  {
    id: 'o4',
    name: 'Puffer Jacket',
    category: 'outerwear',
    imageUrl: '/images/owear/pj.jpg',
    seasons: ['winter'],
    styles: ['casual', 'sporty', 'streetwear'],
    colors: ['red', 'black']
  }
];
