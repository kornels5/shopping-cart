import { Link } from "react-router-dom";

const Product = ({ id, name }) => {
  return (
    <Link to={`product/${id}`}>
      <div>{name}</div>
    </Link>
  );
};

export { Product };
