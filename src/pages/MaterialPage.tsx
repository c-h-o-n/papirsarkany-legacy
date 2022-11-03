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

  return (
    <>
      <h1 className="text-3xl font-bold text-center m-6">Anyagok</h1>

      <div className="flex flex-wrap gap-6">
        {data.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </>
  );
}
