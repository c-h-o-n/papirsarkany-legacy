import { useEffect, useState } from 'react';
import KiteCard from '../components/KiteCard';
import { useApi } from '../hooks/useApi';
import { Product } from '../types/Product';

export default function SingleLineKitePage() {
  const { getAllKites } = useApi();

  const [kites, setKites] = useState<Product[]>([]);

  useEffect(() => {
    getAllKites().then((response) => {
      console.log(response.json());
    });
  }, [getAllKites]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Egyzsinóros sárkányok</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {kites.map((kite) => (
          <div key={kite.id} className="">
            <KiteCard kite={kite} />
          </div>
        ))}
      </div>
    </>
  );
}
