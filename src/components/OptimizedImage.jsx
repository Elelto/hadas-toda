import React, { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = '/images/placeholder.jpg'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`optimized-image-container ${className}`}>
      {!imageLoaded && !imageError && (
        <div
          className="image-placeholder"
          style={{
            width: width || '100%',
            height: height || 'auto',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}
        >
          טוען...
        </div>
      )}

      <img
        src={imageError ? placeholder : src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          display: imageLoaded || imageError ? 'block' : 'none',
          width: '100%',
          height: 'auto'
        }}
        // SEO attributes
        itemProp="image"
      />
    </div>
  );
};

export default OptimizedImage;
