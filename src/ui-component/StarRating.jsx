import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { grey, amber } from '@mui/material/colors';

const StarRating = ({ rating, onChange }) => {
  const calculateStars = () => {
    const filledStars = Math.floor(rating);
    const remainingStars = 5 - filledStars;
    const hasHalfStar = rating - filledStars >= 0.5;

    return {
      filled: filledStars,
      half: hasHalfStar ? 1 : 0,
      empty: remainingStars - (hasHalfStar ? 1 : 0),
    };
  };

  const { filled, half, empty } = calculateStars();

  const handleStarClick = (newRating) => {
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div>
      {[...Array(filled)].map((_, index) => (
        <StarIcon
          key={`filled-${index}`}
          style={{
            color: amber[700],
            width: 15,
            height: 15,
            cursor: 'pointer',
          }}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
      {[...Array(half)].map((_, index) => (
        <StarHalfIcon
          key={`half-${index}`}
          style={{
            color: amber[700],
            width: 15,
            height: 15,
            cursor: 'pointer',
          }}
          onClick={() => handleStarClick(filled + 0.5)}
        />
      ))}
      {[...Array(empty)].map((_, index) => (
        <StarBorderIcon
          key={`empty-${index}`}
          style={{ color: grey[400], width: 15, height: 15, cursor: 'pointer' }}
          onClick={() => handleStarClick(filled + index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
