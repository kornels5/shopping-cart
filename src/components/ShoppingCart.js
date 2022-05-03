import { useEffect } from "react";
import { useAsync } from "../hooks/useAsync";
import { fetchProducts } from "../fetchProducts";
import { Modal, ModalContents, ModalOpenButton } from "./Modal";
import { LoadingScreen } from "./LoadingScreen";

const ShoppingCart = () => {
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
    return <LoadingScreen />;
  } else if (status === "resolved") {
    return (
      <Modal>
        <ModalOpenButton>
          <button variant="primary">Cart(0)</button>
        </ModalOpenButton>
        <ModalContents aria-label="Shopping Cart" title="Shopping cart">
          <div className="mt-8">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.image}
                        alt="product"
                        className="h-full w-full object-contain object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.id}> {product.title} </a>
                          </h3>
                          <p className="ml-4">{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ModalContents>
      </Modal>
    );
  } else if (status === "rejected") {
    throw error;
  }
};

export { ShoppingCart };
