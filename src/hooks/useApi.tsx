import { Product } from '../types/Product';

const baseUrl = 'http://localhost:5000/api/v1';

export function useApi() {
  const getAllKites = async (): Promise<Product[]> => {
    const response = await await fetch(`${baseUrl}/kites`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Hiba a sárkányok lekérdezésekor. Próbálja megkésőbb');
    }

    return data;
  };

  const getAllMaterials = async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/materials`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Hiba az anyagok lekérdezésekor. Próbálja meg később!');
    }

    return data || [];
  };

  const getAllProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${baseUrl}/products`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Hiba a termékek lekérdezésekor. Próbálja meg később!');
    }

    return data || [];
  };

  return { getAllKites, getAllMaterials, getAllProducts };
}
