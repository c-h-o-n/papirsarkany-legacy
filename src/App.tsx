import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Layout from './Layout';

// pages
import CartPage from './pages/CartPage';
import DualLinePage from './pages/DualLinePage';
import LandingPage from './pages/LandingPage';
import MaterialPage from './pages/MaterialPage';
import NotFoundPage from './pages/NotFoundPage';
import SingleLine from './pages/SingleLinePage';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />}></Route>
          <Route path="/egyzsinoros" element={<SingleLine />}></Route>
          <Route path="/ketzsinoros" element={<DualLinePage />}></Route>
          <Route path="/anyagok" element={<MaterialPage />}></Route>
          <Route path="/kosar" element={<CartPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
