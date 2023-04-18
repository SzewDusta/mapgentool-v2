import { useEffect, useRef, useState } from 'react';
import { CirclePicker } from 'react-color';
import './App.css';
import mapFile from "./map.json";

function App() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [ mapData, setMap ] = useState([]);
  const [ valx, setValX ] = useState([750, 750]);
  const [ valy, setValY ] = useState([450, 450]);
  const [ sizeX, setSizeX ] = useState('10');
  const [ sizeY, setSizeY ] = useState('10');
  const [ color, setColor ] = useState({
    "hsl": {
        "h": 0,
        "s": 0,
        "l": 1,
        "a": 1
    },
    "hex": "#ffffff",
    "rgb": {
        "r": 255,
        "g": 255,
        "b": 255,
        "a": 1
    },
    "hsv": {
        "h": 0,
        "s": 0,
        "v": 1,
        "a": 1
    },
    "oldHue": 0,
    "source": "hex"
});

  

  useEffect(()=>{

    console.log(mapFile);
    const ctx = canvasRef.current.getContext('2d');
    ctxRef.current = ctx;

  }, []);

  const changeCanvSize = (e)=>{
    if (e.target.name === 'width') {
      setValX([valx[0], e.target.value]);
    } else if(e.target.name === 'height') {
      setValY([valy[0], e.target.value]);
    }
  }

  const changeSize = (e)=>{
    if (e.target.name === 'sizeX') {
      setSizeX(e.target.value);
    } else if(e.target.name === 'sizeY') {
      setSizeY(e.target.value);
    }
    
  }

  const changeColor = (c, e) =>{
    setColor(c);
  }
  

  const makeChunk = (ctx,x,y,w,h,txt)=>{
      ctx.fillStyle = txt;
      ctx.fillRect(x,y,w,h);
  }

  const mapDraw = (e)=>{
    const ctx = ctxRef.current;
    const canv = canvasRef.current;
    ctx.fillStyle = color.hex;
    var rect = canv.getBoundingClientRect();
    var x = (e.clientX - rect.left) - Math.floor((sizeX/2)) ;
    var y = (e.clientY - rect.top) - Math.floor((sizeY/2));
    ctx.fillRect(x,y, sizeX, sizeY);
    setMap( [ ...mapData, {x:x, y:y, width:sizeX, height:sizeY, texture: color.hex} ] );
    
  }

  const applySize = (e)=> {
    setValX([valx[1], valx[1]]);
    setValY([valy[1], valy[1]]);    
  }

  useEffect(()=>{
    mapData.forEach(e => {
      makeChunk(ctxRef.current, e.x, e.y, e.width, e.height, e.texture);
    });
  }, [valx[0], valy[0]]);

  const exportCanv = ()=>{
    alert(mapData);
    console.log(mapData);
  }

  
  return (
    <div className="App h-screen">
        <div className='sticky top-0 align-middle justify-center grid grid-cols-5 mt-5 ml-5 ' >

          <div className='grid grid-cols-2 gap-5 border-2 py-1 px-1 whitespace-nowrap' >
            <div>
              <label >Canvas width: {valx[1]}<br/>
                <input type='range' name='width' step='10' min="200" max='1300' value={valx[1]} onChange={changeCanvSize} ></input>
              </label><br/>
              <label>Canvas height: {valy[1]}<br/>
                <input type='range' name='height' step='10' min="200" max='700' value={valy[1]} onChange={changeCanvSize} ></input>
              </label>
            </div>
            <button type='button' className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={applySize} >Apply</button>
            
          </div>


          <label>Pen width: {sizeX}<br/>
            <input type='range' name='sizeX' step='1' min="1" max='100' value={sizeX} onChange={changeSize} ></input>
          </label>
          <label>Pen height: {sizeY}<br/>
            <input type='range' name='sizeY' step='1' min="1" max='100' value={sizeY} onChange={changeSize} ></input>
          </label>
          <CirclePicker color={color} onChangeComplete={changeColor} colors={
            ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#000000", "#ffffff"]
          } ></CirclePicker>

          <div>
            <button type='button' className='text-white bg-red-600 hover:bg-red-700  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={()=>{ctxRef.current.clearRect(0,0,valx[0], valy[0]); setMap([]) }} >Clear</button>
            <button type='button' className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700' onClick={exportCanv} >Export</button>
          </div>

        </div>

        <div className='justify-center align-middle content-center self-center mt-10 ' >    
          <canvas className='bg-slate-700 h-auto justify-center align-middle content-center cursor-pointer py-1 px-1 shadow-md shadow-slate-600' ref={canvasRef} height={valy[0]} width={valx[0]} onMouseDown={mapDraw} >

          </canvas>
        </div>
    </div>
  );
}

export default App;
