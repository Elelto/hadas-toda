import React, { useState } from 'react';

/**
 * OptimizedImage
 * 
 * A drop-in replacement for <img> that uses <picture> to serve WebP images.
 * It has no wrapper divs, so it fully respects the original CSS layout, flexbox, and border-radius.
 * If the WebP image is missing (e.g. during local dev), it automatically falls back to the original format.
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  ...props
}) => {
  const [useOriginal, setUseOriginal] = useState(false);

  if (!src) return null;

  const handleError = (e) => {
    if (!useOriginal) {
      setUseOriginal(true);
    } else {
      // If the original also fails, we can optionally hide it or let the browser show a broken icon.
      if (props.onError) {
        props.onError(e);
      }
    }
  };

  const isLocalStaticImage = src.startsWith('/') && !src.startsWith('http');
  const isOptimizableExt = /\.(jpe?g|png)$/i.test(src);
  
  if (isLocalStaticImage && isOptimizableExt && !useOriginal) {
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={className}
          onError={handleError}
          itemProp="image"
          {...props}
        />
      </picture>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      onError={props.onError}
      itemProp="image"
      {...props}
    />
  );
};

export default OptimizedImage;
