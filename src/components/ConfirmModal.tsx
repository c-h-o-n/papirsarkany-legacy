import { useModalContext } from '../context/ModalContext';

type ConfirmProps = {
  title: string;
  onConfirm: () => void;
};

export default function ConfirmModal() {
  const { hideModal, store } = useModalContext();
  const { modalProps } = store || {};
  const { title, onConfirm } = (modalProps as ConfirmProps) || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 ">
      <div className="bg-white p-6 rounded-3xl border-4 border-black border-solid">
        <h1>{title || 'Megerősítés'}</h1>
        <button
          className="p-2 bg-green-400"
          onClick={() => {
            onConfirm();
            hideModal();
          }}
        >
          Yes!
        </button>
        <button className="p-2 bg-red-400" onClick={hideModal}>
          No
        </button>
      </div>
    </div>
  );
}
