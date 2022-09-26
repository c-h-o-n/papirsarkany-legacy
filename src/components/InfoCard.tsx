import { ReactNode } from 'react';
import { useModal } from '@ebay/nice-modal-react';

// components
import InfoModal from './modals/InfoModal';

type AboutCardProps = {
  children: ReactNode;
};

export default function InfoCard({ children }: AboutCardProps) {
  const modal = useModal(InfoModal);
  const open = () => {
    modal.show({ children });
  };

  return (
    <div>
      <div
        className="p-6 h-full bg-white border-black border-4 rounded-3xl"
        role={'button'}
        tabIndex={0}
        onKeyPress={open}
        onClick={open}
      >
        <div className="h-full cursor-auto">
          <div className="line-clamp-[8]">{children}</div>
        </div>
      </div>
    </div>
  );
}
