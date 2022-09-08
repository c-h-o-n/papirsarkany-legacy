type CounterProps = {
  value: number;
  increaseValue: () => any;
  decreaseValue: () => any;
};

export default function Counter({ value, decreaseValue, increaseValue }: CounterProps) {
  return (
    <div className="custom-number-input h-full">
      <div className="flex flex-row h-full w-full rounded-lg relative bg-transparent">
        <button
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
          onClick={decreaseValue}
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>

        <div className="text-center w-full font-bold bg-gray-300 flex justify-center items-center">{value}</div>

        <button
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
          onClick={increaseValue}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}
