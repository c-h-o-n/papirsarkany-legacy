// TODO find better way to display modals
import React, { useState, createContext, useContext, ReactNode, useMemo } from 'react';

import ConfirmModal from '../components/ConfirmModal';

import { ModalTypes } from '../types/Modal';

type ModalComponentProps = {
  hideModal: () => void;
};

const ModalComponents: Record<ModalTypes, React.FC<ModalComponentProps>> = {
  ConfirmModal,
};

type Store = {
  modalType: ModalTypes | null;
  modalProps?: null | unknown;
};

type ModalContextType = {
  store: Store;
  showModal: (modalType: ModalTypes, modalProps?: unknown) => void;
};

type ModalProviderProps = {
  children: ReactNode;
};

const ModalContext = createContext({} as ModalContextType);

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [store, setStore] = useState<Store>({ modalType: null });

  const hideModal = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    const { modalType, modalProps } = store || {};

    console.log('props', modalProps);

    console.log(typeof modalProps);

    if (!modalType) {
      return null;
    }

    const ModalComponent = ModalComponents[modalType];

    if (!ModalComponent) {
      return null;
    }

    if (typeof modalProps !== 'object') {
      return <ModalComponent hideModal={hideModal} />;
    }

    return <ModalComponent hideModal={hideModal} {...modalProps} />;
  };

  const value = useMemo(() => {
    const showModal = (modalType: ModalTypes, modalProps: unknown) => {
      setStore({
        ...store,
        modalType,
        modalProps,
      });
    };

    return {
      store,
      showModal,
    };
  }, [store]);

  return (
    <ModalContext.Provider value={value}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
}
