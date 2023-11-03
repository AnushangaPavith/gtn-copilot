import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/Homepage';
import gtn_copilot from "./img/B1.png";
import React, { useState, useEffect } from 'react';

function App() {
  document.title = 'GTN-Copilot'

  return (
    <div>
      <Router>
        <Routes>
          <Route>
            <Route path="/gtn-copilot" exact element={<HomePage></HomePage>}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
