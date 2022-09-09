import React, { useState, createContext, useContext, ReactNode } from 'react';
import ConfirmModal from '../components/ConfirmModal';

export type ModalTypes = 'ConfirmModal';

const ModalComponents: Record<ModalTypes, React.FC> = {
  ConfirmModal: ConfirmModal,
};

type Store = {
  modalType: ModalTypes | null;
  modalProps?: any;
};

type ModalContext = {
  showModal: (modalType: ModalTypes, modalProps?: any) => void;
  hideModal: () => void;
  store: Store;
};

type ModalProviderProps = {
  children: ReactNode;
};

const initalState: ModalContext = {
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
  const { modalType, modalProps } = store || {};

  const showModal = (modalType: ModalTypes, modalProps: any = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    const ModalComponent = ModalComponents[modalType!];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" {...modalProps} />;
  };

  return (
    <ModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
}
