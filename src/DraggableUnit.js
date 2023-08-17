import React, { useState, useRef, useEffect } from 'react';

function DraggableUnit({ championName }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const unitRef = useRef(null);

  const getChampionSpriteImage = (name) => {
    try {
      return require(`./assets/champion_sprites/1cost/${name}.png`);
    } catch (error) {
      console.warn(`Image not found for champion: ${name}`);
      return require('./assets/champion_sprites/1cost/default.png');
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    const rect = unitRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove, handleMouseUp]);

  const unitStyle = {
    position: 'absolute',
    top: position.y + 'px',
    left: position.x + 'px',
    cursor: dragging ? 'grabbing' : 'grab',
  };

  return (
    <div
      ref={unitRef}
      style={unitStyle}
      onMouseDown={handleMouseDown}
    >
      <img src={getChampionSpriteImage(championName)} alt={championName} />
    </div>
  );
}

export default DraggableUnit;
