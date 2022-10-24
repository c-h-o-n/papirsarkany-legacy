import { Product } from '../types/Product';

export function useApi() {
  // TODO fetch from API
  const getAllKites = async () => {
    return fetch('http.//localhost/5000/api/v1/kites');
  };

  const getAllMaterials = (): Product[] => {
    return [];
  };

  // returns kites and materials
  const getAllProducts = (): Product[] => {
    return [];
  };

  return { getAllKites, getAllMaterials, getAllProducts };
}
