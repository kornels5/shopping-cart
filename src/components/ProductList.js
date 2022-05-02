import { useEffect } from "react";
import { Product } from "./Product";
import { fetchProducts } from "../fetchProducts";
import { useAsync } from "../hooks/useAsync";

const ProductList = () => {
  const {
    data: products,
    status,
    error,
    run,
  } = useAsync({
    status: "pending",
  });

  useEffect(() => {
    run(fetchProducts());
  }, [run]);

  if (status === "pending") {
    return <div>...Loading</div>;
  } else if (status === "resolved") {
    return (
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  image={product.image}
                  price={product.price}
                />
              );
            })}
          </div>
        </div>
      </main>
    );
  } else if (status === "rejected") {
    throw error;
  }
};

export { ProductList };
