import React from 'react'
import Map from '../components/Map'
import Square from '../components/Square'
import { useState } from 'react';

export default function Home() {
    const [squares, setSquares] = useState([
        { id: 1, size: 50, color: "red" },
        { id: 2, size: 70, color: "green" },
        { id: 3, size: 30, color: "blue" },
      ]);
  return (
    <div className='w-[85%] bg-slate-900 border border-black '>
        <Map />
    </div>
  )
}
