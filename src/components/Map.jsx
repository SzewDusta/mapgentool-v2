import React, { useState } from 'react';
import Square from './Square';
import Texture from './Texture';
import { useDrop } from 'react-dnd';
// const Map = ({ width, height }) => {
//     const [squares, setSquares] = useState([
//         { squareId: 1, xPos: 50, yPos: 50, color: "red" },
//         { xPos: 150, yPos: 100, squareId: 2, color: "green" },
//         { xPos: 250, yPos: 400, squareId: 3, color: "blue"},
//       ]);
//       const [squaresData, setSquaresData] = useState(squares);
  
//     const addSquare = (xPos, yPos, squareId, color) => {
//       setSquares([...squares, { xPos, yPos, squareId, color }]);
//     };
  
//     const handleDrop = (e) => {
//       const squareId = e.dataTransfer.getData("text/plain");
//       const xPos = e.clientX - e.target.offsetLeft;
//       const yPos = e.clientY - e.target.offsetTop;
//       addSquare(xPos, yPos, squareId);
//     };
//     const handleDragStart = (e) => {
//         const squareId = e.target.id;
//         const square = squaresData.find((s) => s.id === squareId);
//         e.dataTransfer.setData("squareId", squareId);
//         e.dataTransfer.setData("squareXPos", square.xPos);
//         e.dataTransfer.setData("squareYPos", square.yPos);
//       };
//     const handleDrag = (e) => {
//         const squareId = e.dataTransfer.getData("squareId");
//         const squareXPos = parseInt(e.dataTransfer.getData("squareXPos"), 10);
//         const squareYPos = parseInt(e.dataTransfer.getData("squareYPos"), 10);
//         const square = squaresData.find((s) => s.id === squareId);
//         const mouseXPos = e.clientX;
//         const mouseYPos = e.clientY;
//         const map = document.querySelector(".map");
//         const mapXPos = map.getBoundingClientRect().x;
//         const mapYPos = map.getBoundingClientRect().y;
//         const newSquareXPos = mouseXPos - mapXPos - square.width / 2;
//         const newSquareYPos = mouseYPos - mapYPos - square.height / 2;
//         square.xPos = newSquareXPos;
//         square.yPos = newSquareYPos;
//         setSquaresData([...squaresData.filter((s) => s.id !== squareId), square]);
//       };
//     const handleDragEnd = (e) => {
//         const squareId = e.dataTransfer.getData("squareId");
//         const square = squaresData.find((s) => s.id === squareId);
//         setSquaresData([...squaresData.filter((s) => s.id !== squareId), square]);
//       };
  
//     return (
//       <div
//         className="map w-screen h-screen relative "
//         onDrop={handleDrop}
//         onDragOver={(e) => e.preventDefault()}
//       >
//         {squares.map((square) => (
//           <Square key={square.squareId} xPos={square.xPos} yPos={square.yPos} color={square.color} />
//         ))}
//       </div>
//     );
//   };
// export default Map;
const textureList = [
    {
        id: 1,
        url: "https://i.pinimg.com/564x/fa/75/4e/fa754e0c7bf1c3ed975a236e4f96dc10.jpg",
        x: 0,
        y: 0,
    },
    {
        id: 2,
        url: "https://i.pinimg.com/236x/a1/d3/da/a1d3dab26662296d2445b69e89c58793.jpg",
        x: 64,
        y: 0,
    },
    {
        id: 3,
        url: "https://i.pinimg.com/236x/d2/ed/85/d2ed85d33101352aff3ba466dba3eba2.jpg",
        x: 128,
        y: 128,
    }
]
function Map() {
    
    const [textures, setTextures] = useState([])
    const [{ isOver }, drop] = useDrop({
        accept: 'texture',
        drop: (item) => {
            const TextureList = textureList.filter((texture) => texture.id === item.id);
            setTextures((texture) => [...texture, TextureList[0]]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    })
    // const addTexture = (id) =>{
    //    const textureList = textureList.filter((texture) => texture.id === id);
    //    setTextures((texture) => [...texture, textureList[0]]);
    //    //setTextures([textureList[0]]);
    // };
    return (
        <>
            <div className='textures flex m-2 p-2'>
                {textureList.map((texture) => {
                   return <Texture key={texture.id} id={texture.id} url={texture.url} x={texture.x} y={texture.y} />
                })}
            </div>
            <div className='map w-screen h-screen' ref={drop}>
                {textures.map((texture) => {
                    return <Texture key={texture.id} id={texture.id} url={texture.url} x={texture.x} y={texture.y} />
                }
                )}
            </div>
        </>
    )
}
export default Map;