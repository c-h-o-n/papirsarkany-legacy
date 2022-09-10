import { ReactNode } from 'react';

// providers
import { StepsProvider } from 'react-step-builder';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <StepsProvider>
        <CartProvider>{children}</CartProvider>
      </StepsProvider>
    </ModalProvider>
  );
}
