import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import NiceModal from '@ebay/nice-modal-react';
// providers
import { StepsProvider } from 'react-step-builder';
import { CartProvider } from './context/CartContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError: (error) => {
        const { message } = error as Error;
        toast(message, { className: 'text-center' });
      },
    },
    mutations: {
      onError: (error) => {
        const { message } = error as Error;

        toast(message, { className: 'text-center' });
      },
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NiceModal.Provider>
        <StepsProvider>
          <CartProvider>{children}</CartProvider>
        </StepsProvider>
      </NiceModal.Provider>
    </QueryClientProvider>
  );
}
