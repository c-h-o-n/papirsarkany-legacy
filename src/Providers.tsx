import { ReactNode } from 'react';
import NiceModal from '@ebay/nice-modal-react';
// providers
import { StepsProvider } from 'react-step-builder';
import { CartProvider } from './context/CartContext';
import { AlertProvider } from './context/AlertContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NiceModal.Provider>
      <StepsProvider>
        <AlertProvider>
          <CartProvider>{children}</CartProvider>
        </AlertProvider>
      </StepsProvider>
    </NiceModal.Provider>
  );
}
