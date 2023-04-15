import { Product } from './Product';

export type Kite = Product & {
  details: {
    dimensions: string;
    materials: string;
    wind: string;
    isBeginner: boolean;
  };
};
