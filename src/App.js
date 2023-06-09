import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import ziemia from './images/ziemia.png';
import woda from './images/woda.png';
import podloga from './images/podloga.png';
import bdeska from './images/bdeska.png';
import bpodloga from './images/bpodloga.png';
import cdeska from './images/cdeska.png';
import deska from './images/deska.png';
import jdeska from './images/jdeska.png';
import lawa from './images/lawa.png';
import lod from './images/lod.png';
import piach from './images/piach.png';
import snieg from './images/snieg.png';


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
        let im = {ziemia: ziemia, woda: woda, podloga: podloga, bdeska: bdeska, bpodloga: bpodloga, cdeska: cdeska, deska: deska, jdeska: jdeska, lawa: lawa, lod: lod, piach: piach, snieg: snieg};
        let sr = im[e.texture];
        cpy.push({x: e.x, y: e.y, id: e.id, src: sr});
        cpy2.push({id: e.id, texture: e.texture, x: e.x, y: e.y});
        
      });
      setPos(cpy2);
      setImages(cpy);
      
    };
  }

  const URLImage = ({ image }) => {
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
        
        }}

        onDragEnd={(e)=>{
          image.x = e.target.x();
          image.y = e.target.y();
          let cpy = pos;
          let objIndex = cpy.findIndex((obj => obj.id === image.id));
          cpy[objIndex].x = image.x;
          cpy[objIndex].y = image.y;
          setPos(cpy);
  
        }}
  
  
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };

  const [alt,setAlt] = useState("");

  return (
    <div>
<div className='lg:hidden text-center absolute top-[50%] w-full bg-slate-200   rounded px-3 py-2 z-20 text-black font-semiblod font'>
        <h1 className='text-2xl'>Aby korzystać z edytora, proszę użyć urządzenia z większym ekranem.</h1>
      </div>
   
    <div className='flex overflow-hidden blur-2xl lg:blur-0'>
      
    <div className=' w-[15%] bg-black text-white h-screen shadow-md'>
        
      Wybierz blok:
      <br />
      <div className=' space-y-1 grid grid-cols-2 ml-1'>
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
            src={woda}
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
            alt="bdeska"
            src={bdeska}
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
            alt="bpodloga"
            src={bpodloga}
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
            alt="cdeska"
            src={cdeska}
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
            alt="deska"
            src={deska}
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
            alt="jdeska"
            src={jdeska}
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
            alt="lawa"
            src={lawa}
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
            alt="lod"
            src={lod}
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
            alt="piach"
            src={piach}
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
            alt="snieg"
            src={snieg}
            draggable="true"
            onDragStart={(e) => {
            setAlt(e.target.alt);
            dragUrl.current = e.target.src;
            }}
        />
      </div>
     
        <br />
        <button onClick={exportJson} className=" bg-red-500 text-white px-2 py-1 text-center rounded align-middle mb-2" >EKSPORT</button>
        <br />
        <label htmlFor="import" className=" bg-red-500 text-white px-2 py-1 text-center rounded align-middle mt-2 cursor-pointer " >IMPORT</label>
        <input type='file' name='import' accept='.json' id='import' onChange={importJson} className=" bg-red-500 text-white px-2 py-1 text-center rounded align-middle mt-2 cursor-pointer hidden " />
        </div>
    <div className='w-[88%] h-screen bg-slate-500'>
        
     
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
    </div>
    
    </div>
  );
}

export default App;
