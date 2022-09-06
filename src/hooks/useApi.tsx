import { Kite } from '../pages/SingleLinePage';

export function useApi() {
  // TODO fetch from API
  const getAllKites = (): Kite[] => {
    const fetchedKites: Kite[] = [
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
        name: 'very good kite',
        price: 6900,
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
        price: 6900,
        size: '56x42',
        wind: 'strong strong',
      },
    ];

    return fetchedKites;
  };

  return { getAllKites };
}
