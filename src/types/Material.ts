/* eslint-disable global-require */
export type Material = {
  id: number;
  name: string;
  price: number;
  category: MaterialCategory;
  imageUrl?: string;
  diameters?: string[];
  lengths?: number[];
  tensileStrenth?: string;
};

export type MaterialCategory = {
  id: number;
  name: 'Zsinórtartók' | 'Karboncsövek';
};

export const Materials: Material[] = [
  {
    id: 53,
    imageUrl: require('../assets/zsinor_ures.jpg'),
    name: 'üres zsinortarto',
    price: 350,
    category: { id: 0, name: 'Zsinórtartók' },
  },
  {
    id: 2323,
    name: 'egyzsinóros sárkányhoz 100m zsinórral',
    price: 700,
    category: { id: 0, name: 'Zsinórtartók' },
  },
];
