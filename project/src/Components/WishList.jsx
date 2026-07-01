import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { removeItem } from "./Store/reducer";

const WishList = () => {
  let products = useSelector((state) => {
    return state.cart;
  });

  let dispatch = useDispatch();
  let handleDelete = (removeCardItem) => {
    dispatch(removeItem(removeCardItem));
  };

  return (
    <div>
      <h1> WishList</h1>

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
    </div>
  );
};

export default WishList;
