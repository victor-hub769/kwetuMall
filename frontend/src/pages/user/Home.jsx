import React, { useState, useEffect } from "react";
import "./home.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import publicApi from "../../api/publicApi";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    // const { data } = await axios.get("http://localhost:5000/products");
    const { data } = await publicApi.get("/products/");
    console.log(data);
    setProducts(data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container>
      <NavBar />
      <div className="bannerDiv">
        <br />

        <button className="bannerText">Items on Sale </button>
      </div>

      <br />
      <br />
      <div className="userCards">
        <Row xs={1} md={4} className="g-4">
          {products.map((product) => (
            <Col key={product._id}>
              <Card className="cardBorder">
                <Card.Img
                  variant="top"
                  src={"http://localhost:5000/" + product.image}
                />
                <Card.Body className="homeCardBodies">
                  <Card.Title className="cardTitles">{product.name}</Card.Title>
                  <Card.Text>{product.description.substring(0,45)}...</Card.Text>
                  <div className="buttonDiv">
                    <Card.Text className="textButton">
                      {"Ksh" + product.price.toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      <button
                        className="userButton"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View
                      </button>
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );




  
};

export default Home;
