import React from "react";
import "../styles/Product.css";
import {Grid, Snackbar, Alert } from "@mui/material";
import { DefaultTrexContextState } from "../context/TrexContext";
import { ProductCard } from "./ProductCard";
export const Product = () => {
  const { productDetails,maxProductAlert,handleCloseMaxProductAlert } = DefaultTrexContextState();
  return (
    <div>
      {productDetails && (
        <div class="parent">
          {productDetails?.map((user, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ProductCard data={user} />
            </Grid>
          ))}
        </div>
      )}
       <Snackbar open={maxProductAlert} autoHideDuration={4000} onClose={handleCloseMaxProductAlert}>
        <Alert onClose={handleCloseMaxProductAlert} severity="error" sx={{ width: '100%' }}>
          Reached maximum product quantity!
        </Alert>
      </Snackbar>
    </div>
  );
};
