import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./components/ProductList";
import { ProductDetails } from "./components/ProductDetails";
import { ShoppingCart } from "./components/ShoppingCart";
import { CartProvider } from "./context/cartContext";

const App = () => {
  return (
    <div>
      <CartProvider>
        <header className="container mx-auto my-4 px-6">
          <div className="flex justify-end">
            <ShoppingCart />
          </div>
          <hr className="my-2" />
        </header>
        <BrowserRouter>
          <Routes>
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/" element={<ProductList />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
