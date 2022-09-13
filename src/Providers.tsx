import { ReactNode } from 'react';
import NiceModal from '@ebay/nice-modal-react';
// providers
import { StepsProvider } from 'react-step-builder';
import { CartProvider } from './context/CartContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NiceModal.Provider>
      <StepsProvider>
        <CartProvider>{children}</CartProvider>
      </StepsProvider>
    </NiceModal.Provider>
  );
}
