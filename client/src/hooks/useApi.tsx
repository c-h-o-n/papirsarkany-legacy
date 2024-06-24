import { Kite } from '../types/Kite';
import { Material } from '../types/Material';
import { Order } from '../types/Order';
import { Product } from '../types/Product';

type ZodError = {
  message: string;
  stack: string;
};

const { REACT_APP_API_BASE_URL } = process.env;

const baseUrl = REACT_APP_API_BASE_URL;

export function useApi() {
  const getAllKites = async (): Promise<Kite[]> => {
    const response = await fetch(`${baseUrl}/kites`);

    if (!response.ok) {
      throw new Error('Hiba a sárkányok lekérdezésekor. Próbálja megkésőbb');
    }

    const data = await response.json();

    return data;
  };

  const getAllMaterials = async (): Promise<Material[]> => {
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

  const postOrder = async (order: Order): Promise<Order> => {
    const response = await fetch(`${baseUrl}/orders`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.status === 422) {
      const zodError: ZodError = await response.json();
      console.log(zodError);
      throw new Error(`Hiba a rendelés leadásakor.${zodError.message}`);
    }

    if (!response.ok) {
      throw new Error('Hiba a rendelés leadásakor. Próbálja meg később!');
    }

    const data = await response.json();

    return data;
  };

  return { getAllKites, getAllMaterials, getAllProducts, postOrder };
}
