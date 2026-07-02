import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Mosaic } from "react-loading-indicators";
import useFetch from "./CustomHook/useFetch";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./Store/reducer";
const ProductDetails = () => {
  
  let navigate = useNavigate();
  let { products, error, isLoading, setProducts } = useFetch(
    "http://localhost:5000/product",
  );

  let dispatch = useDispatch();
  let cartState = useSelector((state) => {
    return state.cart;
  });
  let addtoCard = (product) => {
    let checkProduct = cartState.some(
      (cartProduct) => cartProduct.id === product.id,
    );
    if (!checkProduct) {
      dispatch(addItem(product));
      Swal.fire({
        title: "Success",
        text: "Product added Successfully",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Oops",
        text: "Product already exist",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <center>
        <Mosaic color="#5696" size="medium" text="Loading" textColor="black" />
      </center>
    );
  }
    if (error) {
    return (
      <center>
        <h3>{error}</h3>
      </center>
    );
  }

  let handleDelete = (id) => {
    axios.delete(`http://localhost:5000/product/${id}`).then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed)
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
      });
      let deleteProduct = products.filter((product) => product.id !== id);
      setProducts(deleteProduct);
    });
  };

  return (
    <div>
      <h1>ProductList</h1> -{" "}
      <Button
        onClick={() => {
          navigate("/newProduct");
        }}
      >
        Click to Add New Product
      </Button>
      <section className="products">
        {products.map((product) => (
          <Card key={product.id} style={{ width: "18rem" }} className="product">
            <center>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ width: "9rem", height: "15rem" }}
              />
            </center>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button variant="primary">
                <MdOutlineAddToPhotos onClick={() => addtoCard(product)} />
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate(`/update/${product.id}`);
                }}
              >
                <BiSolidEdit />
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDelete(product.id);
                }}
              >
                <MdDelete />
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </section>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProductDetails;
