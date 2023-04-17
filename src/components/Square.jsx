import React from 'react'

function Square({ xPos, yPos, color }) {
    
        const handleDragStart = (e) => {
          e.dataTransfer.setData("text/plain", e.target.id);
        };
      
        return (
          <div
            className={` left-[${xPos}px] top-[${yPos}px] h-16 w-16 border border-white bg-white`}
            draggable
            onDragStart={handleDragStart}
            
          />
        );
  };
export default Square;