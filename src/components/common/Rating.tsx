import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  count?: number;
  showCount?: boolean;
  size?: number;
}

const Rating: React.FC<RatingProps> = ({ 
  value, 
  count = 0, 
  showCount = true, 
  size = 16 
}) => {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="currentColor" />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <span className="relative">
            <Star size={size} className="absolute text-gray-300" fill="currentColor" />
            <div className="overflow-hidden w-1/2">
              <Star size={size} fill="currentColor" />
            </div>
          </span>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300" />
        ))}
      </div>
      
      {showCount && count > 0 && (
        <span className="ml-2 text-sm text-gray-500">({count} reviews)</span>
      )}
    </div>
  );
};

export default Rating;