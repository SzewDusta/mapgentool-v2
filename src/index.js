import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import ziemia from './components/ziemia.png';
import woda from './components/woda.png';
import podloga from './components/podloga.png';
import App from './App';
import './index.css';
import ReactDOM from 'react-dom/client';
import Sidebar from './components/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
