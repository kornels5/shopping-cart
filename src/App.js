import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductList } from "./components/ProductList";
import { ProductDetails } from "./components/ProductDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
