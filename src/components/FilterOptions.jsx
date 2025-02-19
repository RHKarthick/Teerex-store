import React from "react";
import "../styles/FilterOptions.css";
import { DefaultTrexContextState } from "../context/TrexContext";
import { Button } from "@mui/material";
export const FilterOptions = () => {
  const {
    productColors,
    productTypes,
    productGender,
    applyingProductFilters,
    //functions
    resetFilter,
    handleProductFilter,
  } = DefaultTrexContextState();
  
  console.log(applyingProductFilters,"applyingProductFilters")
  return (
    <div className="filterCardContainer">
      <div className="filterCard">
        <div className="heading">Filter products</div>
        <div className="heading">Color</div>
        <div className="filterOptions">
          {productColors.map((color, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={applyingProductFilters.color.includes(color)}
                value={color}
                name={color}
                onChange={(e) => handleProductFilter("color", color, e)}
              />
              {color}
            </label>
          ))}
        </div>
        <div className="heading">Gender</div>
        <div className="filterOptions">
          {productGender.map((gender, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={applyingProductFilters.gender.includes(gender)}
                value={gender}
                name={gender}
                onChange={(e) => handleProductFilter("gender", gender, e)}
              />
              {gender}
            </label>
          ))}
        </div>
        <div className="heading">Type</div>
        <div className="filterOptions">
          {productTypes.map((type, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={applyingProductFilters.type.includes(type)}
                value={type}
                name={type}
                onChange={(e) => handleProductFilter("type", type, e)}
              />
              {type}
            </label>
          ))}
        </div>
        <Button size="small" variant="contained" onClick={() => resetFilter()}>
          reset
        </Button>
      </div>
    </div>
  );
};
