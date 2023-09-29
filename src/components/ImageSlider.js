import React, { useState, useEffect } from 'react';
import '../pages/About.css'

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      console.log(images)
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  return (
    <div className="image-slider">
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} />
    </div>
  );
};

export default ImageSlider;