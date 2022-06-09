import React from 'react'
import './App.css';
import './Components/assets/styles.css';
import Login from './Components/Login';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/imigrate" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
