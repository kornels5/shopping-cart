import { products } from "../products";
import { Product } from "./Product";

const ProductList = () => {
  return (
    <div>
      {products.map((product) => {
        return <Product key={product.id} id={product.id} name={product.name} />;
      })}
    </div>
  );
};

export { ProductList };
