import React, { useState } from 'react';

const TitleEffectSmall = ({ text }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [hovered, setHovered] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const handleMouseOver = () => {
    let iteration = 0;
    setHovered(true);

    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        prevText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setHovered(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <h1
      onMouseOver={handleMouseOver}
      className={hovered ? 'titleS hovered' : 'titleS'}
    >
      {displayText}
    </h1>
  );
};

export default TitleEffectSmall;
