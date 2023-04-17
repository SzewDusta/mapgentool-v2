import React from 'react'
import {useDrag} from 'react-dnd';

function Texture({id, url, x, y}) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'texture',
        item: { id: id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));
        
  return (
    <img ref={drag} src={url} width="64px" height="64px" className={` top-[${x}px] left-[${y}px] border flex flex-wrap border-white ${isDragging ? "border-yellow-400 border-8" : ""}`}></img>
  )
}

export default Texture