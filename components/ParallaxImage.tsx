
import React, { useEffect, useRef } from 'react';

// This assumes the library is loaded globally via CDN.
// We'll declare it to satisfy TypeScript.
declare var simpleParallax: any;

interface ParallaxImageProps {
  src: string;
  alt: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const parallaxInstance = imgRef.current;
    if (parallaxInstance && typeof simpleParallax !== 'undefined') {
      new simpleParallax(parallaxInstance, {
        orientation: 'up',
        scale: 1.5, // Creates the depth effect
        overflow: true,
        delay: 0.4,
        transition: 'cubic-bezier(0,0,0,1)'
      });
    }
  }, []); // Run only once on mount

  return <img ref={imgRef} src={src} alt={alt} className="w-full h-full object-cover" />;
};

export default ParallaxImage;
