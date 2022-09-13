import { ReactNode } from 'react';
import { useModal } from '@ebay/nice-modal-react';

// components
import InfoModal from './modals/InfoModal';

type AboutCardProps = {
  title: string;
  children: ReactNode;
};

export default function InfoCard({ title, children }: AboutCardProps) {
  const modal = useModal(InfoModal);
  const open = () => {
    modal.show({ children });
  };

  return (
    <div>
      <div
        className="bg-white rounded-3xl border-black border-solid border-4 p-6 h-full "
        role={'button'}
        tabIndex={0}
        onKeyPress={open}
        onClick={open}
      >
        <div className="overflow-auto flex flex-col h-full">
          <h1 className="font-bold text-lg">{title}</h1>
          <div className="mx-2 mt-2 flex flex-col flex-grow multiline-truncate-4 cursor-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
