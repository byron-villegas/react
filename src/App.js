import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, User, StarWars } from './modules';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Home.Navbar />
        <Routes>
          <Route path="/about" element={<Home.About />} />
          <Route path="/users" element={<User.Details />} />
          <Route path="/starwars/peoples" element={<StarWars.List />} />
          <Route path="/starwars/people/:id" element={
            <ProtectedRoute>
              <StarWars.View />
            </ProtectedRoute>
          } />
        </Routes>
        <Home.Footer />
      </Router>
    </>
  );
}

export default App;
