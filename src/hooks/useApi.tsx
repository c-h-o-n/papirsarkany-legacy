import { Kite, Kites } from '../types/Kite';
import { Material, Materials } from '../types/Material';
import { Product } from '../types/Product';

export function useApi() {
  // TODO fetch from API
  const getAllKites = (): Kite[] => {
    return Kites;
  };

  const getAllMaterials = (): Material[] => {
    return Materials;
  };

  // returns kites and materials
  const getAllProducts = (): Product[] => {
    return [];
  };

  return { getAllKites, getAllMaterials, getAllProducts };
}
