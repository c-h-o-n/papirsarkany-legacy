import { useQuery } from '@tanstack/react-query';
import FetchError from '../components/FetchError';
import LoadingSpinner from '../components/LoadingSpinner';
import MaterialCard from '../components/MaterialCard';
import { useApi } from '../hooks/useApi';
import { Product } from '../types/Product';

export default function MaterialPage() {
  const { getAllMaterials } = useApi();
  const { data, isLoading, isError, refetch } = useQuery<Product[], Error>(['materials'], getAllMaterials);

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
        <h1 className="text-2xl md:text-5xl text-center">Jelengleg nincsenek anyagok.</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center m-6">Anyagok</h1>

      <div className="columns-1 md:columns-2 lg:columns-3 space-y-6">
        {data.map((material) => (
          <div className="mx-auto w-fit" key={material.id}>
            <MaterialCard  material={material} />
          </div>
        ))}
      </div>
    </>
  );
}
