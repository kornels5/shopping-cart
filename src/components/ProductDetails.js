import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAsync } from "../hooks/useAsync";
import { fetchProducts } from "../fetchProducts";
import { LoadingScreen } from "./LoadingScreen";

const ProductDetails = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const {
    data: product,
    status,
    error,
    run,
  } = useAsync({
    status: "pending",
  });

  useEffect(() => {
    run(fetchProducts(id));
  }, [run]);

  if (status === "pending") {
    return <LoadingScreen />;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return (
      <main className="my-8">
        <div className="container mx-auto px-6">
          <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
              <img
                className="h-full w-full rounded-md object-contain max-w-lg mx-auto"
                src={product.image}
                alt="product"
              />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
              <button
                className="text-xs text-gray-400 mb-3"
                onClick={() => navigate(-1)}
              >
                &lt; back
              </button>
              <h3 className="text-gray-700 uppercase text-lg">
                {product.title}
              </h3>
              <span className="text-gray-500 mt-3">${product.price}</span>
              <hr className="my-3" />
              <p className="text-gray-500">{product.description}</p>
              <hr className="my-3" />
              <div className="mt-2">
                <label htmlFor="count" className="text-gray-700 text-sm">
                  Count:
                </label>
                <div className="flex items-center mt-1">
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <input
                    className="text-gray-700 text-lg mx-2 w-6"
                    id="count"
                    value="20"
                    onChange={(e) => console.log(e)}
                  />
                  <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export { ProductDetails };
