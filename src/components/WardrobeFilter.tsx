import React from 'react';
import { useStyleForge } from '@/context/StyleForgeContext';
import { ClothingCategory } from '@/types/fashion';

const WardrobeFilter: React.FC = () => {
  const { selectedCategory, filterCategory } = useStyleForge();

  const categories: { value: ClothingCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Items' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'outerwear', label: 'Outerwear' },
  ];

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 p-4 mb-1">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => filterCategory(category.value)}
          className={`wardrobe-category ${
            selectedCategory === category.value ? 'active' : ''
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default WardrobeFilter;
