import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  let navigation = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/signup"}>
              SignUp
            </Nav.Link>
            <Nav.Link as={Link} to={"/product"}>
              Product
            </Nav.Link>
            <Nav.Link as={Link} to={"/todo"}>
              Todo
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button
              variant="contained"
              color="warning"
              onClick={() => navigation("/wishlist")}
              style={{color:"blueviolet"}}
            > Click to WishList
              <MdShoppingCart style={{fontSize:"50px",color:"black"}}/>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
