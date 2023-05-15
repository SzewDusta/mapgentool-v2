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

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(pos)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();

  }

  const importJson = (e)=> {
    

    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    var cpy = [];
    var cpy2 = [];
    fileReader.onload = e => {
      let d = JSON.parse(e.target.result);
      
      d.forEach(e => {
        console.log(d);
        let im = {ziemia: ziemia, woda: woda, podloga: podloga};
        let sr = im[e.texture];
        cpy.push({x: e.x, y: e.y, id: e.id, src: sr});
        cpy2.push({id: e.id, texture: e.texture, x: e.x, y: e.y});
        
      });
      setPos(cpy2);
      setImages(cpy);
      
    };
  }

  const URLImage = ({ image }) => {
    console.log(image);
    const [img] = useImage(image.src);
    
    return (
      
      <Image
        className=' cursor-grabbing'
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
  
  
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };

  const [alt,setAlt] = useState("");

  return (
    <div className='flex overflow-hidden'>
    <div className=' w-[16%] bg-black text-white h-screen shadow-md'>
        
      Wybierz blok:
      <br />
      <div className=' p-2 space-y-3'>
        <img
            className=' cursor-grabbing'
            x = {0}
            y = {0}
            width="64px"
            height="64px"
            alt="podloga"
            src={podloga}
            draggable="true"
            onDragStart={(e) => {
            setAlt(e.target.alt);
            dragUrl.current = e.target.src;
            }}
            
        />
        <img
            className=' cursor-grabbing'
            x = {0}
            y = {0}
            width="64px"
            height="64px"
            alt="ziemia"
            src={ziemia}
            draggable="true"
            onDragStart={(e) => {
            setAlt(e.target.alt);
            dragUrl.current = e.target.src;
            }}
        ></img>
        <img
            className=' cursor-grabbing'
            x = {0}
            y = {0}
            width="64px"
            height="64px"
            alt="woda"
            name="chuj"
            src={woda}
            draggable="true"
            onDragStart={(e) => {
            setAlt(e.target.alt);
            dragUrl.current = e.target.src;
            }}
        />
      </div>
     
        <br />
        <button onClick={exportJson} className=" bg-red-500 text-white px-2 py-1 text-center rounded align-middle" >EKSPORT</button>
        <br />
        <input type='file' onChange={importJson} className=" mt-2 bg-red-500 text-white ps-2 py-1 rounded w-60" />
        </div>
    <div className='w-[88%] h-screen bg-slate-500'>
        
     
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          var cpy = pos;
          console.log(pos);
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
          console.log(dragUrl.current);
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
              console.log(images);
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
    </div>
    
  );
}

export default App;
