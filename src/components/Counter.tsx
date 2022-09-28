type CounterProps = {
  value: number;
  increaseValue: () => void;
  decreaseValue: () => void;
};

export default function Counter({ value, decreaseValue, increaseValue }: CounterProps) {
  return (
    <div className="custom-number-input h-full">
      <div className="flex flex-row h-full w-full rounded-lg relative bg-transparent bg-slate-300">
        <button
          className="  text-slate-600 hover:text-slate-700 hover:bg-slate-400 h-full w-20 rounded-l-lg cursor-pointer outline-none disabled:text-slate-400 disabled:hover:bg-slate-300 disabled:cursor-not-allowed"
          type={'button'}
          disabled={value <= 1}
          onClick={decreaseValue}
        >
          <span className="m-auto text-2xl font-thin">-</span>
        </button>

        <div className=" text-slate-800 text-center w-full font-bold  flex justify-center items-center">{value}</div>

        <button
          className="text-slate-600 hover:text-slate-700 hover:bg-slate-400 h-full w-20 rounded-r-lg cursor-pointer"
          onClick={increaseValue}
          type={'button'}
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}
