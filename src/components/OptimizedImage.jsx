import React, { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = '/images/placeholder.jpg',
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!src) return null;

  const isLocalStaticImage = src.startsWith('/') && !src.startsWith('http');
  const isOptimizableExt = /\.(jpe?g|png)$/i.test(src);
  let webpSrc = null;

  if (isLocalStaticImage && isOptimizableExt) {
    webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
  }

  const finalSrc = imageError ? placeholder : src;

  return (
    <div className={`optimized-image-container ${className}`}>
      {!imageLoaded && !imageError && (
        <div
          className="image-placeholder"
          style={{
            width: width || '100%',
            height: height || '100%',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8'
          }}
        >
          {/* Optional loading spinner could go here */}
        </div>
      )}

      {webpSrc && !imageError ? (
        <picture style={{ display: imageLoaded ? 'block' : 'none', width: '100%', height: '100%' }}>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={finalSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="optimized-img-element"
            style={{ width: '100%', height: '100%', objectFit: 'inherit' }}
            itemProp="image"
            {...props}
          />
        </picture>
      ) : (
        <img
          src={finalSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="optimized-img-element"
          style={{
            display: imageLoaded || imageError ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'inherit'
          }}
          itemProp="image"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
