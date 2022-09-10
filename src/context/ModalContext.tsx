/* eslint-disable import/no-cycle */
import { useState, createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { ModalTypes } from '../types/Modal';
import ConfirmModal from '../components/ConfirmModal';

const ModalComponents: Record<ModalTypes, React.FC> = {
  ConfirmModal,
};

type Store = {
  modalType: ModalTypes | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modalProps?: any;
};

type ModalContextType = {
  showModal: (modalType: ModalTypes, modalProps?: unknown) => void;
  hideModal: () => void;
  store: Store;
};

type ModalProviderProps = {
  children: ReactNode;
};

const initalState: ModalContextType = {
  showModal: () => {},
  hideModal: () => {},
  store: { modalType: null },
};

const ModalContext = createContext(initalState);

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [store, setStore] = useState<Store>({ modalType: null });

  const renderComponent = () => {
    const { modalType, modalProps } = store || {};

    if (!modalType) {
      return null;
    }

    const ModalComponent = ModalComponents[modalType];

    if (!ModalComponent) {
      return null;
    }

    return <ModalComponent {...modalProps} />;
  };

  const showModal = useCallback(
    (modalType: ModalTypes, modalProps: unknown = {}) => {
      setStore({
        ...store,
        modalType,
        modalProps,
      });
    },
    [store]
  );

  const hideModal = useCallback(() => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  }, [store]);

  const value = useMemo(() => {
    return {
      store,
      showModal,
      hideModal,
    };
  }, [hideModal, showModal, store]);

  return (
    <ModalContext.Provider value={value}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
}
