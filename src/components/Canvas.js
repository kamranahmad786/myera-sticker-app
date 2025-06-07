import React from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Line } from 'react-konva';
import useImage from 'use-image';

const StickerImage = ({ sticker, onDragEnd, onDoubleClick }) => {
  const [image] = useImage(sticker.imageSrc);

  if (sticker.imageSrc && image) {
    return (
      <KonvaImage
        key={sticker.id}
        image={image}
        x={sticker.x}
        y={sticker.y}
        width={50}
        height={50}
        draggable
        onDragEnd={onDragEnd}
        onDblClick={onDoubleClick}
      />
    );
  }

  // Fallback to text/emoji if image not available
  return (
    <Text
      key={sticker.id}
      text={sticker.emoji}
      x={sticker.x}
      y={sticker.y}
      fontSize={40}
      draggable
      onDragEnd={onDragEnd}
      onDblClick={onDoubleClick}
    />
  );
};

const Canvas = ({ 
  stickers, 
  onStickerDragEnd, 
  onStickerDoubleClick, 
  stageRef, 
  showGrid = false 
}) => {
  // Generate grid lines
  const gridLines = [];
  if (showGrid) {
    // Vertical lines
    for (let i = 0; i <= 600; i += 40) {
      gridLines.push(
        <Line
          key={`v${i}`}
          points={[i, 0, i, 400]}
          stroke="#ddd"
          strokeWidth={1}
          opacity={0.5}
        />
      );
    }
    // Horizontal lines
    for (let i = 0; i <= 400; i += 40) {
      gridLines.push(
        <Line
          key={`h${i}`}
          points={[0, i, 600, i]}
          stroke="#ddd"
          strokeWidth={1}
          opacity={0.5}
        />
      );
    }
  }

  return (
    <div className="canvas-container">
      <Stage
        width={600}
        height={400}
        ref={stageRef}
        className="konva-stage"
      >
        <Layer>
          {/* Grid lines */}
          {gridLines}
          
          {/* Stickers */}
          {stickers.map((sticker) => (
            <StickerImage
              key={sticker.id}
              sticker={sticker}
              onDragEnd={(e) => onStickerDragEnd(sticker.id, e)}
              onDoubleClick={() => onStickerDoubleClick(sticker.id)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
