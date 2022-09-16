import { useEffect, useState } from 'react';

// hooks
import { Steps, useSteps } from 'react-step-builder';
import { useCart } from '../context/CartContext';
import { useApi } from '../hooks/useApi';

// components
import CartItem from '../components/CartItem';
import CheckOut from '../components/CheckOut';

// misc
import { Product } from '../types/Product';
import { currencyFormatter } from '../utilities/formatters';

// TODO save/load current step to session storage
export default function CartPage() {
  const { next, prev, progress } = useSteps();

  const { getAllKites, getAllMaterials } = useApi();

  const { cartItems } = useCart();
  const [total, setTotal] = useState(0);

  // TODO products comes from API in the futures
  const [allkites] = useState(getAllKites());
  const [allMaterials] = useState(getAllMaterials());
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const kites = allkites.filter((kite) => cartItems.some((item) => kite.id === item.id));
    const materials = allMaterials.filter((material) => cartItems.some((item) => material.id === item.id));

    setProducts([...kites, ...materials]);
  }, [allMaterials, allkites, cartItems]);

  useEffect(() => {
    console.log('prods', products);
  }, [products]);

  useEffect(() => {
    setTotal(
      cartItems.reduce((total, cartItem) => {
        const kite = products.find((product) => product.id === cartItem.id);
        return total + (kite?.price || 0) * cartItem.quantity;
      }, 0)
    );
  }, [cartItems, products]);

  return (
    <>
      {/* LATER remove Dev Controls  */}
      <div className="flex items-center space-x-2 m-6">
        <h1>Dev Controls:</h1>
        <button className="bg-blue-400 p-2" type={'button'} onClick={prev}>
          Prev
        </button>
        <button className="bg-red-400 p-2" type={'button'} onClick={next}>
          Next {progress * 100}%
        </button>
      </div>

      <div className="flex items-center">
        <div>👨🏻</div>
        <div className="w-full bg-sky-50 rounded-full h-2.5 flex justify-between items-center relative">
          <div className="flex flex-grow justify-between items-center z-10 ">
            <div className="bg-white rounded-full border-2 border-black border-solid w-6 h-6" />
            <div className="bg-white rounded-full border-2 border-black border-solid w-6 h-6" />
            <div className="bg-white rounded-full border-2 border-black border-solid w-6 h-6" />
          </div>
          <div
            className="bg-gray-400 h-px rounded-full flex items-center justify-end absolute"
            style={{ width: `${progress * 100}%`, transition: 'width 2s' }}
          >
            <div className="-mr-3 z-20 ">🪁</div>
          </div>
        </div>
      </div>

      <Steps startsFrom={1}>
        {/* Step 1 */}
        <>
          <div className="divide-y-2 divide-gray-300 border-b-gray-300 border-b-2 mb-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} products={products} />
            ))}
          </div>

          <div className="flex justify-end mb-6">
            <div className="text-3xl font-bold">Összeg: {currencyFormatter(total)}</div>
          </div>

          <div className="flex justify-end mb-6">
            <button className="bg-red-400 p-4" type="button" onClick={next}>
              Tovabb a penztarhoz
            </button>
          </div>
        </>

        {/* Step 2 */}
        <div className="md:grid md:grid-cols-2 gap-6">
          <CheckOut />

          <div className="divide-y-2 divide-gray-300">
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} products={products} isEditable={false} />
            ))}
          </div>
        </div>

        {/* Step 3 */}
        <div className="md:grid md:grid-cols-2">
          <h1>Step 3</h1>
        </div>
      </Steps>
    </>
  );
}
