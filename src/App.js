import React, { useState, useRef, useCallback } from 'react';
import Canvas from './components/Canvas';
import StickerButton from './components/StickerButton';
import './App.css';

function App() {
  const [stickers, setStickers] = useState([]);
  const [stickerCounter, setStickerCounter] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const stageRef = useRef();

  // Sticker configurations
  const stickerTypes = [
    { 
      id: 'sticker1', 
      imageSrc: '/stickers/sticker1.png', 
      emoji: '🎯', 
      label: 'Target Sticker' 
    },
    { 
      id: 'sticker2', 
      imageSrc: '/stickers/sticker2.png', 
      emoji: '⭐', 
      label: 'Star Sticker' 
    },
    { 
      id: 'sticker3', 
      imageSrc: '/stickers/sticker3.png', 
      emoji: '❤️', 
      label: 'Heart Sticker' 
    }
  ];

  // Grid snapping function (40px grid)
  const snapToGrid = (value) => {
    return Math.round(value / 40) * 40;
  };

  // Add sticker function
  const addSticker = useCallback((stickerType) => {
    const newSticker = {
      id: stickerCounter,
      ...stickerType,
      x: snapToGrid(50), // Default position with grid snapping
      y: snapToGrid(50),
    };
    
    setStickers(prev => [...prev, newSticker]);
    setStickerCounter(prev => prev + 1);
  }, [stickerCounter]);

  // Handle sticker drag end
  const handleStickerDragEnd = useCallback((id, e) => {
    const newX = e.target.x();
    const newY = e.target.y();
    
    // Optional: Enable grid snapping on drag as well
    // const snappedX = snapToGrid(newX);
    // const snappedY = snapToGrid(newY);
    
    setStickers(prev => 
      prev.map(sticker => 
        sticker.id === id 
          ? { ...sticker, x: newX, y: newY }
          : sticker
      )
    );
  }, []);

  // Handle sticker double click (delete)
  const handleStickerDoubleClick = useCallback((id) => {
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  }, []);

  // Download canvas as PNG
  const downloadCanvas = useCallback(() => {
    const stage = stageRef.current;
    if (stage) {
      const dataURL = stage.toDataURL({ 
        pixelRatio: 2,
        mimeType: 'image/png',
        quality: 1
      });
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  // Toggle grid visibility
  const toggleGrid = useCallback(() => {
    setShowGrid(prev => !prev);
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>MyEra Sticker Canvas</h1>
        <p>Click buttons to add stickers • Drag to move • Double-click to delete</p>
      </header>
      
      <div className="app-content">
        <div className="controls">
          <div className="sticker-buttons">
            {stickerTypes.map((stickerType) => (
              <StickerButton 
                key={stickerType.id}
                imageSrc={stickerType.imageSrc}
                emoji={stickerType.emoji}
                onClick={() => addSticker(stickerType)} 
                label={stickerType.label}
              />
            ))}
          </div>
          
          <div className="action-buttons">
            <button className="download-button" onClick={downloadCanvas}>
              📥 Download Canvas
            </button>
            <button 
              className={`grid-button ${showGrid ? 'active' : ''}`} 
              onClick={toggleGrid}
            >
              📐 {showGrid ? 'Hide' : 'Show'} Grid
            </button>
          </div>
          
          <div className="info">
            <p>Stickers: {stickers.length}</p>
            <p>Grid: {showGrid ? 'ON' : 'OFF'}</p>
          </div>
        </div>
        
        <Canvas 
          stickers={stickers}
          onStickerDragEnd={handleStickerDragEnd}
          onStickerDoubleClick={handleStickerDoubleClick}
          stageRef={stageRef}
          showGrid={showGrid}
        />
      </div>
    </div>
  );
}

export default App;
