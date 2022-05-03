import { useContext } from "react";
import { Modal, ModalContents, ModalOpenButton } from "./Modal";
import { CartContext } from "../context/cartContext";

const ShoppingCart = () => {
  const [state, dispatch] = useContext(CartContext);
  return (
    <Modal>
      <ModalOpenButton>
        <button variant="primary">
          Cart(
          {state.cart.reduce((count, curItem) => {
            return count + curItem.quantity;
          }, 0)}
          )
        </button>
      </ModalOpenButton>
      <ModalContents aria-label="Shopping Cart" title="Shopping cart">
        <div className="mt-8">
          <div className="flow-root">
            {state.cart.length <= 0 && (
              <p className="text-gray-400 mb-10 text-center">Cart is empty.</p>
            )}
            <ul className="-my-6 divide-y divide-gray-200">
              {state.cart.map((product) => (
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
                          <a href={product.id}> {product.name} </a>
                        </h3>
                        <p className="ml-4">
                          $ {(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 mb-3">
                        Qty {product.quantity}
                      </p>
                      <div className="flex">
                        <button
                          className="p-2 border rounded-full mx-5 text-gray-600 bg-white hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                          onClick={() =>
                            dispatch({
                              type: "ADD_ITEM",
                              item: {
                                id: product.id,
                                name: product.name,
                                image: product.image,
                                price: product.price,
                              },
                            })
                          }
                        >
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
                        <button
                          type="button"
                          className="font-medium text-gray-600 hover:text-gray-500"
                          onClick={() => {
                            dispatch({ type: "REMOVE_ITEM", id: product.id });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {state.cart.length >= 0 && (
              <>
                <hr className="mt-7" />
                <p className="text-gray-400 my-3 text-right">
                  Total price: $
                  {state.cart.reduce((count, curItem) => {
                    return (+count + curItem.quantity * curItem.price).toFixed(
                      2
                    );
                  }, 0)}
                </p>
              </>
            )}
          </div>
        </div>
      </ModalContents>
    </Modal>
  );
};

export { ShoppingCart };
