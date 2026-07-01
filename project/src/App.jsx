import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Signup from "./Components/Signup";
import Todo from "./Components/Todo";
import ProductList from "./Components/ProductList";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";
import Notfound from "./Components/Notfound";
import NewProduct from "./Components/NewProduct";
import UpdateProducts from "./Components/UpdateProducts";
import WishList from "./Components/WishList";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path="list" element={<ProductList />} />
          </Route>
          <Route path="/todo" element={<Todo />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/update/:id" element={<UpdateProducts />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
