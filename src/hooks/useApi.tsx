import { Product } from '../types/Product';

const baseUrl = 'http://localhost:5000/api/v1';

export function useApi() {
  const getAllKites = async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/kites`);

    if (!response.ok) {
      throw new Error('Hiba a sárkányok lekérdezésekor. Próbálja megkésőbb');
    }

    const data = await response.json();

    return data;
  };

  const getAllMaterials = async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/materials`);

    if (!response.ok) {
      throw new Error('Hiba az anyagok lekérdezésekor. Próbálja meg később!');
    }

    const data = await response.json();

    return data || [];
  };

  const getAllProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/products`);

    if (!response.ok) {
      throw new Error('Hiba a termékek lekérdezésekor. Próbálja meg később!');
    }

    const data = await response.json();

    return data || [];
  };

  return { getAllKites, getAllMaterials, getAllProducts };
}
