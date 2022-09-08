import { useEffect, useState } from 'react';
import KiteCard from '../components/KiteCard';

export type Kite = {
  id: number;
  imageUrl: any;
  name: string;
  size: string;
  material: string;
  wind: string;
  isBeginner: boolean;
  details: string;
  price: number;
};

export default function SingleLinePage() {
  const [kites, setKites] = useState<Kite[]>([
    {
      id: 0,
      imageUrl: 'image about the kite',
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
      imageUrl: 'image about the kite',
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
      imageUrl: 'image about the kite',
      details:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores quaerat vel tenetur iure dolorum sunt corporis minima officiis exercitationem ipsam!',
      isBeginner: true,
      material: 'steel',
      name: 'very good kite',
      price: 6900,
      size: '56x42',
      wind: 'strong strong',
    },
  ]);

  useEffect(() => {
    fetch('localhost:5000/api/v1/kites').then(resp => console.log(resp.json));

    return () => {};
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Egyzsinóros sárkányok</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {kites.map(kite => (
          <div key={kite.id} className="">
            <KiteCard kite={kite} />
          </div>
        ))}
      </div>
    </>
  );
}
