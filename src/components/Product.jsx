import React from "react";
import "../styles/Product.css";
import { Grid, Snackbar, Alert, Typography } from "@mui/material";
import { DefaultTrexContextState } from "../context/TrexContext";
import { ProductCard } from "./ProductCard";

export const Product = () => {
  const { productDetails, maxProductAlert, handleCloseMaxProductAlert } =
    DefaultTrexContextState();

  return (
    <div>
      {productDetails?.length > 0 ? (
        <div className="parent">
          {productDetails.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard data={user} />
            </Grid>
          ))}
        </div>
      ) : (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginTop: 4, color: "gray" }}
        >
          No Products Found 
        </Typography>
      )}
      <Snackbar
        open={maxProductAlert}
        autoHideDuration={4000}
        onClose={handleCloseMaxProductAlert}
      >
        <Alert
          onClose={handleCloseMaxProductAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Reached maximum product quantity!
        </Alert>
      </Snackbar>
    </div>
  );
};
