import { ReactNode, useState } from 'react';
import closeIcon from '../assets/close.svg';

type AboutCardProps = {
  title?: string;

  children: ReactNode;
};

// TODO refactor this!!
export default function AboutCard({ title, children }: AboutCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    console.log('close');
    setIsOpen(false);
  };

  return (
    <div className={isOpen ? 'fixed inset-2 z-50 !m-0' : ' '}>
      <div className="bg-white rounded-3xl border-black border-solid border-4 p-6 h-full" onClick={open}>
        <div className="overflow-auto flex flex-col h-full">
          <h1 className="font-bold text-lg">{title || 'Missing Title!'}</h1>
          <div className={`mx-2 mt-2 flex flex-col flex-grow ${isOpen || 'multiline-truncate-4'}`}>{children}</div>
        </div>
      </div>

      {isOpen && (
        <button className="absolute top-2 right-2" onClick={() => close()}>
          <img className="w-12" src={closeIcon} alt="close-button" />
        </button>
      )}
    </div>
  );
}
