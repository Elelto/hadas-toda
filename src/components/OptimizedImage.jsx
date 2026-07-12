import React, { useState } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [webpFailed, setWebpFailed] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    if (!webpFailed) {
      setWebpFailed(true);
    } else {
      setAllFailed(true);
    }
  };

  if (!src) return null;

  const isLocalStaticImage = src.startsWith('/') && !src.startsWith('http');
  const isOptimizableExt = /\.(jpe?g|png)$/i.test(src);
  
  let webpSrc = null;
  if (isLocalStaticImage && isOptimizableExt && !webpFailed) {
    webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
  }

  // If all failed, we can return a placeholder or null. 
  // Let's just return a broken image or null so it doesn't break the layout completely.
  if (allFailed) {
    return (
      <div className={`optimized-image-container ${className}`} style={{ width: width || '100%', height: height || '100%', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
        <span style={{ fontSize: '0.8rem' }}>תמונה חסרה</span>
      </div>
    );
  }

  return (
    <div className={`optimized-image-container ${className}`}>
      {!imageLoaded && (
        <div
          className="image-placeholder"
          style={{
            width: width || '100%',
            height: height || '100%',
            backgroundColor: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            position: 'absolute',
            zIndex: 1
          }}
        >
        </div>
      )}

      {webpSrc ? (
        <picture style={{ display: 'block', width: '100%', height: '100%' }}>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="optimized-img-element"
            style={{ width: '100%', height: '100%', objectFit: 'inherit', position: 'relative', zIndex: 2, opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
            itemProp="image"
            {...props}
          />
        </picture>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="optimized-img-element"
          style={{ width: '100%', height: '100%', objectFit: 'inherit', position: 'relative', zIndex: 2, opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
          itemProp="image"
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
