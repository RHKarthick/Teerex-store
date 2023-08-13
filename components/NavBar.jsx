import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { DefaultTrexContextState } from "../context/TrexContext";
export const NavBar = () => {
  const { cart } = DefaultTrexContextState();
  return (
    <div className="navbar">
      <div className="companyName">
        <Link to="/" className="link-style">
          TeeRex Store
        </Link>
      </div>
      <div className="companyName">
        <Link to="/cart" className="link-style">
          Products
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </Link>
      </div>
    </div>
  );
};
