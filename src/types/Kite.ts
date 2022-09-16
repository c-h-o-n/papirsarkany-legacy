/* eslint-disable global-require */
export type Kite = {
  id: number;
  name: string;
  imageUrl: string;
  size: string;
  material: string;
  wind: string;
  isBeginner: boolean;
  details: string;
  price: number;
};

export const Kites: Kite[] = [
  {
    id: 0,
    imageUrl: require('../assets/kite-placeholder.png'),
    details:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quaerat vel tenetur iure dolorum sunt corporis minima officiis exercitationem ipsam!',
    isBeginner: true,
    material: 'steel',
    name: 'very good kite',
    price: 6900,
    size: '56x42',
    wind: 'strong strong',
  },
  {
    id: 1,
    imageUrl: require('../assets/kite-placeholder.png'),
    details:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quaerat vel tenetur iure dolorum sunt corporis minima officiis exercitationem ipsam!',
    isBeginner: true,
    material: 'steel',
    name: 'very good kite with a longer name',
    price: 1900,
    size: '56x42',
    wind: 'strong strong',
  },
  {
    id: 2,
    imageUrl: require('../assets/kite-placeholder.png'),
    details:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quaerat vel tenetur iure dolorum sunt corporis minima officiis exercitationem ipsam!',
    isBeginner: true,
    material: 'steel',
    name: 'very good kite',
    price: 3600,
    size: '56x42',
    wind: 'strong strong',
  },
];
