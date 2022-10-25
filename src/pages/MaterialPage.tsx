export default function MaterialPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">Anyagok</h1>

      <div className="">
        {/* {categories.map((category) => (
          <div key={category.id}>
            <h1 className="text-2xl font-bold my-6">{category.name}</h1>
            <div className="flex flex-wrap gap-6">
              {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}
