import React from "react";
import { DefaultTrexContextState } from "../context/TrexContext";
import {
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import "../styles/CartCard.css";
export const CartCard = (props) => {
  const { data } = props;
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    deleteFromCart,
  } = DefaultTrexContextState();
  const outOfStock = data.cartQuantity === data.quantity;
  return (
    <div className="cardContainer">
      <div className="cardImage">
        <img src={data.imageURL} height="140" objectFit="cover" alt="product" loading="lazy"/>
      </div>
      <div className="cardDetail">
        <Typography gutterBottom variant="h6" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.price} ₹
        </Typography>
       {outOfStock && <Typography variant="body2" color="error">
          Max quantity reached
        </Typography>}
      </div>
      <div className="buttonGroup">
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button size="small" disabled={outOfStock} onClick={() => increaseQuantity(data)}>
            +
          </Button>
          <Button size="small" flex={{ base: "auto" }}>
            {cart.find((item) => item.id === data.id)?.cartQuantity}
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => decreaseQuantity(data)}
          >
            -
          </Button>
        </ButtonGroup>
        {/* {outOfStock && 
        <Button size="small" variant="contained" disabled>
              Out of stock
            </Button>} */}
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={() => deleteFromCart(data)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
