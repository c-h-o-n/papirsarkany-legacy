import { useEffect, useState } from 'react';
import MaterialCard from '../components/MaterialCard';
import { useApi } from '../hooks/useApi';
import { MaterialCategory } from '../types/Material';

export default function MaterialPage() {
  const { getAllMaterials } = useApi();
  const [materials, setMaterials] = useState(getAllMaterials());
  const [categories, setCategories] = useState<MaterialCategory[]>([]);

  useEffect(() => {
    const getMaterialCategories = () => {
      return materials
        .map((material) => material.category)
        .filter((category, index, self) => index === self.findIndex((t) => t.id === category.id));
    };

    setCategories(getMaterialCategories());
  }, [materials]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Anyagok</h1>

      <div className="">
        {categories.map((category) => (
          <div key={category.id}>
            <h1 className="text-2xl font-bold my-6">{category.name}</h1>
            <div className="flex flex-wrap gap-6">
              {materials
                .filter((material) => material.category.name === category.name)
                .map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
