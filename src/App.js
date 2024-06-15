import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
