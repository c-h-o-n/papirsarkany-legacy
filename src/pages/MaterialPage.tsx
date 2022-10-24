import { useEffect, useState } from 'react';
import MaterialCard from '../components/MaterialCard';
import { useApi } from '../hooks/useApi';
import { Product } from '../types/Product';

export default function MaterialPage() {
  const { getAllMaterials } = useApi();
  const [materials, setMaterials] = useState(getAllMaterials());
  const [categories, setCategories] = useState<Product[]>([]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Anyagok</h1>

      <div className="">
        {categories.map((category) => (
          <div key={category.id}>
            <h1 className="text-2xl font-bold my-6">{category.name}</h1>
            <div className="flex flex-wrap gap-6">
              {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
