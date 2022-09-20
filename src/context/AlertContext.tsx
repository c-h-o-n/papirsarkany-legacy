import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type AlertContextType = {
  showAlert: (message: string) => void;
};

type AlertProviderProps = {
  children: ReactNode;
};

const AlertContext = createContext({} as AlertContextType);

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [message, setMessage] = useState('');

  const value = useMemo(() => {
    const showAlert = (message: string) => {
      setMessage(message);
      setTimeout(() => setMessage(''), 3000);
    };

    return { showAlert };
  }, []);

  const renderAlert = () => {
    if (!message) {
      return null;
    }
    return (
      <div className="absolute bottom-5 left-5 right-5 z-50 p-6 bg-white border-4 border-black rounded-2xl ">
        {message}
      </div>
    );
  };

  return (
    <AlertContext.Provider value={value}>
      {renderAlert()}
      {children}
    </AlertContext.Provider>
  );
}
