export type Product = {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  category: 'Egyzsinóros' | 'Anyag';
  description?: string;
};
