import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import ziemia from './components/ziemia.png';
import woda from './components/woda.png';
import podloga from './components/podloga.png';


function App() {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = useState([]);

  const [pos, setPos] = useState([]);

  const exportJson = ()=> {
    // console.log(pos);

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(pos)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();

  }

  const URLImage = ({ image }) => {
    
    const [img] = useImage(image.src);
    
    return (
      
      <Image
        id={image.id}
        draggable
        image={img}
        x={image.x}
        y={image.y}
  

        onPointerOver={(e)=>{
          image.x = e.target.x();
          image.y = e.target.y();
          let cpy = pos;
          let objIndex = cpy.findIndex((obj => obj.id === image.id));
          cpy[objIndex].x = image.x;
          cpy[objIndex].y = image.y;
          setPos(cpy);
          console.log(cpy);
        
        }}

        onDragEnd={(e)=>{
          image.x = e.target.x();
          image.y = e.target.y();
          let cpy = pos;
          let objIndex = cpy.findIndex((obj => obj.id === image.id));
          cpy[objIndex].x = image.x;
          cpy[objIndex].y = image.y;
          setPos(cpy);
          console.log(cpy);
  
        }}
  
  
        offsetX={img ? img.width / 2 : 1}
        offsetY={img ? img.height / 2 : 1}
      />
    );
  };

  const [alt,setAlt] = useState("");

  return (
    <div>
      <button onClick={exportJson} >EKSPORT</button>
      Wybierz blok:
      <br />
      <img
        alt="podloga"
        src={podloga}
        draggable="true"
        onDragStart={(e) => {
          setAlt(e.target.alt);
          dragUrl.current = e.target.src;
        }}
        
      />
      <img
        alt="ziemia"
        src={ziemia}
        draggable="true"
        onDragStart={(e) => {
          setAlt(e.target.alt);
          dragUrl.current = e.target.src;
        }}
      ></img>
      <img
        alt="woda"
        name="chuj"
        src={woda}
        draggable="true"
        onDragStart={(e) => {
          setAlt(e.target.alt);
          dragUrl.current = e.target.src;
        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          var cpy = pos;
          setPos([...pos, {id:pos.length+1, x: stageRef.current.x, y: stageRef.current.y, texture: alt}]);
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                id: cpy.length+1,
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
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
