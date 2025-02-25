import connectDB from "@/app/lib/mongodb";

const NewProduct = async () => {
  // Connect to the database
  await connectDB();
  // Fetch product data; using 'no-store' disables caching for dynamic data
  const response = await fetch("/api/products", { cache: "no-store" });
  const products = await response.json();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">New Products</h1>
      {products && products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="p-2 border rounded">
              {product.tittle}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default NewProduct;
