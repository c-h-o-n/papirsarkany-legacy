import { useQuery } from '@tanstack/react-query';

import KiteCard from '../components/KiteCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';
import FetchError from '../components/FetchError';
import { Kite } from '../types/Kite';

export default function SingleLineKitePage() {
  const { getAllKites } = useApi();
  const { data, isLoading, isError, refetch } = useQuery<Kite[], Error>(['kites'], getAllKites);

  const sortByPrice = (a: Kite, b: Kite): number => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price === b.price) {
      return 0;
    }
    return 1;
  };

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
      <h1 className="text-3xl font-bold text-center mb-2">Egyzsinóros sárkányok</h1>
      <h4 className="font-bold text-center mb-6">A vételár tartalmaz 100m eresztőzsinórt és fogantyút.</h4>


      <div className="columns-1 md:columns-2 lg:columns-3 space-y-6">
        {data.sort(sortByPrice).map((kite) => (
          <KiteCard kite={kite} key={kite.id} />
        ))}
      </div>
    </>
  );
}
