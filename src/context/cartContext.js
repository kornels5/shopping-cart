import { createContext, useReducer } from "react";

const CartContext = createContext();

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return addProductToCart(action.item, state);
    }
    case "REMOVE_ITEM": {
      return removeProductFromCart(action.id, state);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const CartProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, { cart: [] });

  return <CartContext.Provider value={[cart, dispatch]} {...props} />;
};

export { CartProvider, CartContext };
