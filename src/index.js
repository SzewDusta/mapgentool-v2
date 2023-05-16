import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import ziemia from './images/ziemia.png';
import woda from './images/woda.png';
import podloga from './images/podloga.png';
import App from './App';
import './index.css';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
