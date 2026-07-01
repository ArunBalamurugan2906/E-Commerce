import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  let [newProduct, setNewProduct] = useState({
    title: "",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 0,
      count: 0,
    },
  });
  let navigation = useNavigate();
  let handleChange = (e) => {
    let { name, value } = e.target;
    let fieldChange = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setNewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [fieldChange]: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      alert("Data added successfully...!");
      setNewProduct({
        title: "",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });
  };
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
  };
  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5">Create New Product</Typography>
      <Grid
        component={"form"}
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "20px" }}
      >
        <TextField
          value={newProduct.title}
          name="title"
          label="title"
          variant="outlined"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <TextField
          value={newProduct.category}
          name="category"
          label="Category"
          variant="outlined"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              value={newProduct.rating.rate}
              name="rating.rate"
              label="rate"
              variant="outlined"
              type="number"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              value={newProduct.rating.count}
              name="rating.count"
              label="Count"
              variant="outlined"
              type="number"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          ADD
        </Button>
        <Button
          onClick={() => {
            navigation("/product");
          }}
        >
          Return to Product
        </Button>
      </Grid>
    </Paper>
  );
};

export default NewProduct;
