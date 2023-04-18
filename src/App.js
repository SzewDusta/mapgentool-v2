import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Star, Text } from 'react-konva';
import useImage from 'use-image';
import { useState } from "react";
import { Image } from "react-konva";
import texture1 from './components/ziemia.png';
import texture2 from './components/woda.png';
import texture3 from './components/podloga.png';
import { useRef } from "react";

const URLImage = ({ image }) => {
  
  const [img] = useImage(image.src);
  //console.log(image.getBoundingClientRect());
  return (
    <Image
      draggable="true"
      image={img}
      x={image.x}
      y={image.y}
      id={image.id}
      // I will use offset to set origin to the center of the image
      onDragEnd={(e) => {
        console.log(e.target._id);
        console.log(e.target.attrs.x);
        console.log(e.target.attrs.y);
        
      }}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

function App() {

  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const imageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [position, setPosition] = useState([{}]);
  const [alt, setAlt] = useState('');
  return (
    <div>
      Try to trag and image into the stage:
      <br />
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <img
        alt="podloga"
        src={texture3}
        draggable="true"
        onDragStart={(e) => {
          setAlt(e.target.alt);
          
          dragUrl.current = e.target.src;
        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          console.log(alt);
          
          
          // register event position
          stageRef.current.setPointersPositions(e);
          console.log(stageRef.current.getPointerPosition());
          console.log(stageRef.current);
          console.log(stageRef.current.children[0].children.map((child) => child.attrs.x));
          stageRef.current.children[0].children.map((child) => {
            setPosition([...position, {id:child._id, x: child.attrs.x, y: child.attrs.y }])
            
          });
          console.log(position);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} id={imageRef} draggable="true" onDrop={(e) => console.log(e.image.offsetX)} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
