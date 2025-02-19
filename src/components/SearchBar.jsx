import React from "react";
import "../styles/SearchBar.css";
import { DefaultTrexContextState } from "../context/TrexContext";
export const SearchBar = () => {
  const { searchInputData, setSearchInputData } = DefaultTrexContextState();
  return (
    <div className="textFeild" >
      <div className='search' >  
        <input 
        type='text' 
        placeholder='search for products...'
        value={searchInputData} 
        onChange={(e) => setSearchInputData(e.target.value)}
        />
    </div>
    </div>
  );
};
