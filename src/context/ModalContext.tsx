import { useState, createContext, useContext, ReactNode, useMemo } from 'react';

// eslint-disable-next-line import/no-cycle
import ConfirmModal from '../components/ConfirmModal';

import { ModalTypes } from '../types/Modal';

const ModalComponents: Record<ModalTypes, React.FC> = {
  ConfirmModal,
};

type Store = {
  modalType: ModalTypes | null;
  modalProps?: null | unknown;
};

type ModalContextType = {
  store: Store;
  showModal: (modalType: ModalTypes, modalProps?: unknown) => void;
  hideModal: () => void;
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
      return <ModalComponent />;
    }

    return <ModalComponent {...modalProps} />;
  };

  const value = useMemo(() => {
    const showModal = (modalType: ModalTypes, modalProps: unknown = {}) => {
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

    return {
      store,
      showModal,
      hideModal,
    };
  }, [store]);

  return (
    <ModalContext.Provider value={value}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
}
