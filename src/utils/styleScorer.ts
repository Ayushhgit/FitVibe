import { ClothingItem, StyleScore, StyleCombo } from '../types/fashion';

export const calculateStyleScore = (items: ClothingItem[]): StyleScore => {
  if (items.length === 0) {
    return { total: 0, combos: [] };
  }

  const combos: StyleCombo[] = [];
  let totalScore = 0;

  // Check for season matches
  const seasonMatches = calculateSeasonMatches(items);
  if (seasonMatches.combo) {
    combos.push(seasonMatches.combo);
    totalScore += seasonMatches.combo.score;
  }

  // Check for style matches
  const styleMatches = calculateStyleMatches(items);
  if (styleMatches.combo) {
    combos.push(styleMatches.combo);
    totalScore += styleMatches.combo.score;
  }

  // Check for color harmony
  const colorCombo = calculateColorHarmony(items);
  if (colorCombo) {
    combos.push(colorCombo);
    totalScore += colorCombo.score;
  }

  // Add base points for each item
  totalScore += items.length * 5;

  // Add combo for a complete outfit (at least one top, bottom, and shoes)
  if (hasCompleteOutfit(items)) {
    const completeOutfitCombo: StyleCombo = {
      name: 'Complete Look',
      description: 'You have a complete outfit with essential pieces',
      score: 20
    };
    combos.push(completeOutfitCombo);
    totalScore += completeOutfitCombo.score;
  }

  return {
    total: totalScore,
    combos: combos
  };
};

const calculateSeasonMatches = (items: ClothingItem[]) => {
  const seasons = new Map<string, number>();
  
  items.forEach(item => {
    item.seasons.forEach(season => {
      if (season !== 'all') {
        seasons.set(season, (seasons.get(season) || 0) + 1);
      }
    });
  });
  
  let dominantSeason = '';
  let maxCount = 0;
  
  seasons.forEach((count, season) => {
    if (count > maxCount) {
      maxCount = count;
      dominantSeason = season;
    }
  });
  
  if (dominantSeason && maxCount >= items.length / 2) {
    const seasonNames: Record<string, string> = {
      spring: 'Spring Fresh',
      summer: 'Summer Vibes',
      fall: 'Fall Fashion',
      winter: 'Winter Chic'
    };
    
    return {
      combo: {
        name: seasonNames[dominantSeason] || `${dominantSeason.charAt(0).toUpperCase() + dominantSeason.slice(1)} Season`,
        description: `Your outfit has a cohesive ${dominantSeason} theme`,
        score: 15
      }
    };
  }
  
  return { combo: null };
};

const calculateStyleMatches = (items: ClothingItem[]) => {
  const styles = new Map<string, number>();
  
  items.forEach(item => {
    item.styles.forEach(style => {
      styles.set(style, (styles.get(style) || 0) + 1);
    });
  });
  
  let dominantStyle = '';
  let maxCount = 0;
  
  styles.forEach((count, style) => {
    if (count > maxCount) {
      maxCount = count;
      dominantStyle = style;
    }
  });
  
  if (dominantStyle && maxCount >= items.length / 2) {
    const styleDescriptions: Record<string, { name: string, description: string }> = {
      casual: { 
        name: 'Effortlessly Cool', 
        description: 'Your casual style shows laid-back confidence' 
      },
      formal: { 
        name: 'Power Look', 
        description: 'Your formal outfit exudes sophistication' 
      },
      sporty: { 
        name: 'Active Edge', 
        description: 'Your athletic vibe shows energy and vitality' 
      },
      bohemian: { 
        name: 'Free Spirit', 
        description: 'Your boho style has an artistic, relaxed quality' 
      },
      vintage: { 
        name: 'Retro Revival', 
        description: 'Your vintage pieces create timeless appeal' 
      },
      streetwear: { 
        name: 'Urban Cool', 
        description: 'Your streetwear look is cutting-edge' 
      }
    };
    
    const styleInfo = styleDescriptions[dominantStyle] || {
      name: `${dominantStyle.charAt(0).toUpperCase() + dominantStyle.slice(1)} Master`, 
      description: `Great ${dominantStyle} coordination`
    };
    
    return {
      combo: {
        name: styleInfo.name,
        description: styleInfo.description,
        score: 15
      }
    };
  }
  
  return { combo: null };
};

const calculateColorHarmony = (items: ClothingItem[]): StyleCombo | null => {
  if (items.length < 2) return null;
  
  const allColors = items.flatMap(item => item.colors);
  const colorCount = new Map<string, number>();
  
  allColors.forEach(color => {
    colorCount.set(color, (colorCount.get(color) || 0) + 1);
  });
  
  // Check for monochromatic (same color family)
  if (colorCount.size <= 2) {
    const mainColor = Array.from(colorCount.keys())[0];
    return {
      name: 'Monochrome Magic',
      description: `Beautiful ${mainColor} color coordination`,
      score: 10
    };
  }
  
  // Check for complementary colors (simplified)
  const complementaryPairs = [
    ['red', 'green'],
    ['blue', 'orange'],
    ['purple', 'yellow']
  ];
  
  for (const [color1, color2] of complementaryPairs) {
    if (colorCount.has(color1) && colorCount.has(color2)) {
      return {
        name: 'Color Contrast',
        description: 'Great complementary color pairing',
        score: 12
      };
    }
  }
  
  // Neutral base with pop of color
  const neutrals = ['black', 'white', 'gray', 'beige', 'brown'];
  const neutralCount = neutrals.reduce((count, color) => {
    return count + (colorCount.get(color) || 0);
  }, 0);
  
  const nonNeutrals = Array.from(colorCount.keys()).filter(color => !neutrals.includes(color));
  if (neutralCount >= allColors.length * 0.6 && nonNeutrals.length > 0) {
    return {
      name: 'Pop of Color',
      description: 'Neutral base with eye-catching accent',
      score: 10
    };
  }
  
  return null;
};

const hasCompleteOutfit = (items: ClothingItem[]): boolean => {
  const hasTop = items.some(item => item.category === 'tops');
  const hasBottom = items.some(item => item.category === 'bottoms');
  const hasShoes = items.some(item => item.category === 'shoes');
  
  return hasTop && hasBottom && hasShoes;
};
