import { Link, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import DualLinePage from './pages/DualLinePage';
import LandingPage from './pages/LandingPage';
import MaterialPage from './pages/MaterialPage';
import NotFoundPage from './pages/NotFoundPage';
import SingleLine from './pages/SingleLinePage';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/anyagok">Anyagok</Link>
          </li>
          <li>
            <Link to="/ketzsinoros">Kétzsinóros</Link>
          </li>

          <li>
            <Link to="/egyzsinoros">Egyzsinóros</Link>
          </li>
          <li>
            <Link to="/kosar">🛒</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/egyzsinoros" element={<SingleLine />}></Route>
        <Route path="/ketzsinoros" element={<DualLinePage />}></Route>
        <Route path="/anyagok" element={<MaterialPage />}></Route>
        <Route path="/kosar" element={<CartPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
