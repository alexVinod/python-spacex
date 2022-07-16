import React from 'react'
import './App.css';
import './Components/assets/styles.css';
import './Components/assets/loading_pan.css';
import Login from './Components/Login';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Migrate from './Components/Migrate';
import Landing from './Components/Landing';
import Analyze from './Components/Analyze';
import FitmentTest from './Components/FitmentTest';
import Evaluate from './Components/Evaluate';
import Help from './Components/Help';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/portal" element={<Landing />} />
          <Route path="/imigrate" element={<Migrate />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/fitment" element={<FitmentTest />} />
          <Route path="/evaluate" element={<Evaluate />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
