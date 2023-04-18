import { React, useEffect, useState } from 'react';
import './App.css';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

function App() {
  const [ stat, setStat ] = useState([]);
  const [ chuj, setChuj ] = useState([]);

  const chuj2 = async(e)=>{
    let cpy = chuj;
    let cpyState = stat;

    cpyState.push({
      id: cpy.length,
      isDragging: false,
      x: 50,
      y: 50
    })

    cpy.push(<div><Rect
      x={cpyState[cpy.length].x}
      y={cpyState[cpy.length].y}
      draggable
      fill={stat.isDragging ? 'green' : 'black'}
      onDragStart={() => {
        let cpy2 = stat;
        cpy2[cpy.length].isDragging = true;
        setStat(cpy2)
      }}

      onDragEnd={(e) => {
        let cpy2 = stat;
        cpy2[cpy.length].isDragging = true;
        cpy2[cpy.length].x = e.target.x();
        cpy2[cpy.length].y = e.target.y();
        setStat(cpy2)
      }}
      width={100}
      height={100}
      shadowBlur={10}
    /></div>);
   

    setStat(cpyState);

    setChuj(cpy);
    // console.log(cpy);
    console.log("dsada");
  }

  useEffect(()=>{
    console.log(stat);
    // chuj.map(e=>{
    //   document.getElementById('chuj123').appendChild(e);
    // })
  }, [stat, chuj]);

  return (
    <>
    <div className=' float-left' ><button onClick={chuj2} >XDD</button></div>
    <div className=" float-right">
      
      <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* <div id="chuj123"> </div> */}
        {chuj.map(e=>{
          return e;
        })
          
        }
      </Layer>
    </Stage>
    </div>
    </>
  );
}

export default App;
