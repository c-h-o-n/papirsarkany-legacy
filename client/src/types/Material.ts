import { Product } from './Product';

export type Material = Product & {
  details: {
    materialCategory: string;
    lengths?: string[];
  };
};
