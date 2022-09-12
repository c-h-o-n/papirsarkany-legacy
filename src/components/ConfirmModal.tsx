import { useEffect } from 'react';

type ConfirmProps = {
  hideModal: () => void;
  title?: string;
  onConfirm?: () => void;
};

export default function ConfirmModal({ hideModal, title = 'asd', onConfirm = () => {} }: ConfirmProps) {
  useEffect(() => {
    console.log('init', title);

    return () => {
      console.log('wrap', title);
    };
  }, [title]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 ">
      <div className="bg-white p-6 rounded-3xl border-4 border-black border-solid">
        <h1>{title || 'Megerősítés'}</h1>
        <button
          className="p-2 bg-green-400"
          type={'button'}
          onClick={() => {
            onConfirm();
            hideModal();
          }}
        >
          Yes!
        </button>
        <button className="p-2 bg-red-400" type={'button'} onClick={hideModal}>
          No
        </button>
      </div>
    </div>
  );
}
