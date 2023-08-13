import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsPage } from "./components/ProductsPage";
import { CartPage } from "./components/CartPage";


function App() {
  return (
    <div className="App" >
      <Router>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
