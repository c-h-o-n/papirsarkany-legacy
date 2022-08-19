import { useState } from 'react';

export default function Counter() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(prev => prev + 1);
  };

  const decerement = () => {
    if (counter < 1) {
      return;
    }
    setCounter(prev => prev - 1);
  };

  return (
    <div className="custom-number-input h-10 w-32">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={decerement}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
          name="custom-input-number"
          value={counter}
        ></input>
        <button
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={increment}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}
