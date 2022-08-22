import { useState } from 'react';
import { useCart } from '../context/CartContext';

type CounterProps = {
  initialValue: number;
  increase: any;
  decrease: any;
};

export default function Counter({ initialValue, decrease, increase }: CounterProps) {
  const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity } = useCart();

  return (
    <div className="custom-number-input h-10 w-32">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={() => decreaseCartQuantity(initialValue)}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>

        <div className="text-center w-full font-bold bg-gray-300 flex justify-center items-center">
          {getItemQuantity(initialValue)}
        </div>

        <button
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={() => increaseCartQuantity(initialValue)}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}
