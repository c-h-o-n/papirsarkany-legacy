import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Providers from './Providers';

// pages
import CartPage from './pages/CartPage';
import DualLinePage from './pages/DualLinePage';
import LandingPage from './pages/LandingPage';
import MaterialPage from './pages/MaterialPage';
import NotFoundPage from './pages/NotFoundPage';
import SingleLine from './pages/SingleLinePage';

// TODO install & config linter
function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/egyzsinoros" element={<SingleLine />} />
            <Route path="/ketzsinoros" element={<DualLinePage />} />
            <Route path="/anyagok" element={<MaterialPage />} />
            <Route path="/kosar" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
