import React from 'react';
import useImage from 'use-image';

const StickerButton = ({ imageSrc, emoji, onClick, label }) => {
  const [image] = useImage(imageSrc);

  return (
    <button 
      className="sticker-button" 
      onClick={onClick}
      title={label}
    >
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={label} 
          className="sticker-image"
          onError={(e) => {
            // Fallback to emoji if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      ) : null}
      <span 
        className="sticker-emoji" 
        style={{ display: imageSrc ? 'none' : 'block' }}
      >
        {emoji}
      </span>
    </button>
  );
};

export default StickerButton;
