import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend} >
      <div className=" h-screen min-h-screen flex">
      <Sidebar />
      <Home />
      
      
      </div>
    </DndProvider>
  );
}

export default App;
