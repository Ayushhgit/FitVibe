
import React, { useEffect, useState } from 'react';
import { StyleScore, StyleCombo } from '@/types/fashion';

interface StyleScoreDisplayProps {
  score: StyleScore;
}

const StyleScoreDisplay: React.FC<StyleScoreDisplayProps> = ({ score }) => {
  const [lastCombo, setLastCombo] = useState<StyleCombo | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Find if there's a new combo compared to previous score
    if (score.combos.length > 0) {
      const newestCombo = score.combos[score.combos.length - 1];
      if (!lastCombo || lastCombo.name !== newestCombo.name) {
        setLastCombo(newestCombo);
        setShowAnimation(true);
        
        // Reset animation after it completes
        setTimeout(() => {
          setShowAnimation(false);
        }, 3000);
      }
    }
  }, [score]);

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg backdrop-blur">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Style Score</p>
        <p className="text-3xl font-bold text-fashion-purple">{score.total}</p>
      </div>
      
      {showAnimation && lastCombo && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 text-center pointer-events-none animate-score-pop">
          <div className="text-2xl font-bold px-4 py-2 rounded-lg bg-fashion-purple text-white">
            +{lastCombo.score} {lastCombo.name}
          </div>
          <p className="text-sm mt-1 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded">
            {lastCombo.description}
          </p>
        </div>
      )}
      
      <div className="mt-2 max-h-32 overflow-y-auto">
        {score.combos.map((combo, index) => (
          <div key={`${combo.name}-${index}`} className="flex justify-between items-center text-sm mb-1">
            <span className="font-medium">{combo.name}:</span>
            <span className="text-green-600 font-semibold">+{combo.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleScoreDisplay;
