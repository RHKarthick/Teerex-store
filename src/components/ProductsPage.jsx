import React from "react";
import { SearchBar } from "./SearchBar";
import { Product } from "./Product";
import { FilterOptions } from "./FilterOptions";
import { NavBar } from "./NavBar";
import "../styles/ProductPage.css";
export const ProductsPage = (props) => {
  return (
    <div className="productPage-container">
      <NavBar />
      <div>
        <SearchBar />
      </div>
      <div className="productBody-container">
        <FilterOptions />
        <div className="products-container">
          <Product />
        </div>
      </div>
    </div>
  );
};
