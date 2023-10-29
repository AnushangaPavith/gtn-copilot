import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/Homepage';

function App() {
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
