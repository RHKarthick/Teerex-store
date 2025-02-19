import React from "react";
import { NavBar } from "./NavBar";
import { DefaultTrexContextState } from "../context/TrexContext";
import { CartCard } from "./CartCard";
import "../styles/CartPage.css";

export const CartPage = () => {
  const { cart } = DefaultTrexContextState();
 
  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      {cart.length !== 0 && (
        <div className="cartlist">
          <div className="textStyle">Cart</div>
          <div className="scrollable-div cartlist-container">
            {cart.map((data) => {
              return (
                <div>
                  <CartCard data={data} />
                </div>
              );
            })}
          </div>
          <div className="textStyle">
            Sub total :
            {cart.reduce(
              (acc, curr) => acc + curr.price * curr.cartQuantity,
              0
            )}
            ₹
          </div>
        </div>
      )}
      {cart.length === 0 && <div className="textStyle">No product in cart</div>}
    </div>
  );
};
