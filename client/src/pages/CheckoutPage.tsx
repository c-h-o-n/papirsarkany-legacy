import { useQuery } from '@tanstack/react-query';
import { useSteps } from 'react-step-builder';

import { useCart } from '../context/CartContext';

import { useApi } from '../hooks/useApi';

import CheckoutFormWrapper from '../components/forms/CheckoutFormWrapper';

import { Product } from '../types/Product';
import LoadingSpinner from '../components/LoadingSpinner';
import FetchError from '../components/FetchError';

export default function CheckoutPage() {
  const { isFirst } = useSteps();

  const { cartItems } = useCart();
  const { getAllProducts } = useApi();
  const { data, isError, isLoading, refetch } = useQuery<Product[], Error>(['products'], getAllProducts);

  if (isLoading) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <div className="mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <div className="mx-auto text-center">
          <FetchError refetch={refetch} />
        </div>
      </div>
    );
  }

  if (!cartItems.length && isFirst) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <h1 className="text-2xl md:text-5xl text-center">Üres a kosarad.</h1>
      </div>
    );
  }

  return (
    <div className="my-6">
      <CheckoutFormWrapper products={data} />
    </div>
  );
}
