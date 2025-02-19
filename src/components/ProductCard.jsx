import React from "react";
import { DefaultTrexContextState } from "../context/TrexContext";
import { Typography, Button, ButtonGroup } from "@mui/material";
import "../styles/ProductCard.css";
export const ProductCard = (props) => {
  const { data } = props;
  const { cart, addProductTocart, increaseQuantity, decreaseQuantity } =
    DefaultTrexContextState();
  return (
    <div className="product-container">
      <img className="product-img" src={data.imageURL} alt="product" loading="lazy" />

      <Typography variant="h6" align="center">
        {data.name}
      </Typography>
      <div className="product-body">
        <Typography variant="body2" color="text.secondary">
          {data.price} ₹
        </Typography>
        {data.quantity > 0 &&
        cart.find((item) => item.id === data.id)?.cartQuantity == undefined ? (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => addProductTocart(data)}
          >
            Add to cart
          </Button>
        ) : (
          data.quantity == 0 && (
            <Button size="small" variant="contained" disabled>
              Out of stock
            </Button>
          )
        )}
        {cart.find((item) => item.id === data.id)?.cartQuantity !==
          undefined && (
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button size="small" onClick={() => increaseQuantity(data)}>
              +
            </Button>
            <Button size="small" flex={{ base: "auto" }}>
              {cart.find((item) => item.id === data.id)?.cartQuantity}
            </Button>
            <Button size="small" onClick={() => decreaseQuantity(data)}>
              -
            </Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  );
};
