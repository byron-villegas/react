import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, User } from './modules';

function App() {
  return (
    <>
      <Home.Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/about" element={<Home.About />} />
          <Route path="/users" element={<User.Details />} />
        </Routes>
      </Router>
      <Home.Footer />
    </>
  );
}

export default App;
