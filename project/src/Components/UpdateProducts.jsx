import React, { useEffect, useState } from "react";
import { Paper, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProducts = () => {
  let [updateProduct, setProduct] = useState(null);

  let { id } = useParams();
  let navigation = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((response) => setProduct(response.data));
  }, []);

  let handleUpdate = (e) => {
    let { name, value } = e.target;
    let fieldChange = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldChange]: value,
        },
      });
    } else {
      setProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then(() => {
      alert("updateSuccessfully...!");
      navigation("/product");
    });
  };
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
  };
  if (updateProduct !== null) {
    return (
      <Paper elevation={20} style={paperStyle}>
        <Typography variant="h5">Update Product</Typography>
        <Grid
          onSubmit={handleSubmit}
          component={"form"}
          style={{ display: "grid", gap: "20px" }}
        >
          <TextField
            value={updateProduct.title}
            name="title"
            label="title"
            variant="outlined"
            onChange={handleUpdate}
            fullWidth
          />
          <TextField
            value={updateProduct.category}
            name="category"
            label="category"
            variant="outlined"
            onChange={handleUpdate}
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={updateProduct.rating.rate}
                name="rating.rate"
                label="rate"
                variant="outlined"
                onChange={handleUpdate}
                fullWidth
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={updateProduct.rating.count}
                name="rating.count"
                label="count"
                variant="outlined"
                onChange={handleUpdate}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained">
            Save
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
  } else {
    return <h2>Loading...</h2>;
  }
};

export default UpdateProducts;
