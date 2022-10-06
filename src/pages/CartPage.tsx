import { useEffect, useState } from 'react';
import { useSteps } from 'react-step-builder';

import { useCart } from '../context/CartContext';

import { useApi } from '../hooks/useApi';

import CheckoutFormWrapper from '../components/forms/CheckoutFormWrapper';

import { Product } from '../types/Product';

export default function CartPage() {
  const { isFirst } = useSteps();

  const { getAllKites, getAllMaterials } = useApi();

  const { cartItems } = useCart();

  // TODO products comes from API in the futures
  const [allkites] = useState(getAllKites());
  const [allMaterials] = useState(getAllMaterials());
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const kites = allkites.filter((kite) => cartItems.some((item) => kite.id === item.id));
    const materials = allMaterials.filter((material) => cartItems.some((item) => material.id === item.id));

    setProducts([...kites, ...materials]);
  }, [allMaterials, allkites, cartItems]);

  if (!cartItems.length && isFirst) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <h1 className="text-2xl md:text-5xl text-center">Üres a kosarad.</h1>
      </div>
    );
  }

  return (
    <div className="my-6">
      <CheckoutFormWrapper products={products} />
    </div>
  );
}
