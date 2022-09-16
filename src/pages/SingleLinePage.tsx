import { useEffect, useState } from 'react';
import KiteCard from '../components/KiteCard';
import { useApi } from '../hooks/useApi';

import { Kite } from '../types/Kite';

export default function SingleLinePage() {
  const { getAllKites } = useApi();
  const [kites] = useState<Kite[]>(getAllKites());

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/kites')
      .then((resp) => console.log(resp))
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
