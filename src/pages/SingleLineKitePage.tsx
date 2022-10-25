import { useQuery } from '@tanstack/react-query';

import KiteCard from '../components/KiteCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';
import { Product } from '../types/Product';
import refreshDataIcon from '../assets/icons/refetch-data.svg';

export default function SingleLineKitePage() {
  const { getAllKites } = useApi();
  const { data, isLoading, isError, refetch } = useQuery<Product[], Error>(['kites'], getAllKites);

  if (isLoading) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <div className="mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <div className="mx-auto text-center">
          <button type={'button'} onClick={() => refetch()}>
            <img className="w-32" src={refreshDataIcon} alt="" />
          </button>
          <p>Nem sikerült lekérni az adatokat.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Egyzsinóros sárkányok</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {data.map((kite) => (
          <div key={kite.id} className="">
            <KiteCard kite={kite} />
          </div>
        ))}
      </div>
    </>
  );
}
