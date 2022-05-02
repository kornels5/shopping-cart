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
      <div>
        {products.map((product) => {
          return (
            <Product key={product.id} id={product.id} name={product.title} />
          );
        })}
      </div>
    );
  } else if (status === "rejected") {
    throw error;
  }
};

export { ProductList };
