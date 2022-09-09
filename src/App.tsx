import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//providers
import { ModalProvider } from './context/ModalContext';
import { CartProvider } from './context/CartContext';
import { StepsProvider } from 'react-step-builder';

// pages
import CartPage from './pages/CartPage';
import DualLinePage from './pages/DualLinePage';
import LandingPage from './pages/LandingPage';
import MaterialPage from './pages/MaterialPage';
import NotFoundPage from './pages/NotFoundPage';
import SingleLine from './pages/SingleLinePage';

import Layout from './Layout';

// TODO install & config linter
function App() {
  return (
    <Providers>
      <BrowserRouter>
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
      </BrowserRouter>
    </Providers>
  );
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <StepsProvider>
        <CartProvider>{children}</CartProvider>
      </StepsProvider>
    </ModalProvider>
  );
}

export default App;
