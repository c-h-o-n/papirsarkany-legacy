type Category = 'Egyzsinóros' | 'Anyag';

export type Product = {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  category: Category;
  description?: string;
};
