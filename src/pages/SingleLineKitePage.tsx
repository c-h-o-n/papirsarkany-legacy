import { useQuery } from '@tanstack/react-query';

import KiteCard from '../components/KiteCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';
import { Product } from '../types/Product';
import FetchError from '../components/FetchError';

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
          <FetchError refetch={refetch} />
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="absolute grid items-center h-screen inset-0">
        <h1 className="text-2xl md:text-5xl text-center">Jelengleg nincsenek sárkányok.</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">Egyzsinóros sárkányok</h1>

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
