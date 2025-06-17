import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, User } from './modules';

function App() {
  return (
    <>
      <Router>
        <Home.Navbar />
        <Routes>
          <Route path="/about" element={<Home.About />} />
          <Route path="/users" element={<User.Details />} />
        </Routes>
        <Home.Footer />
      </Router>
    </>
  );
}

export default App;
