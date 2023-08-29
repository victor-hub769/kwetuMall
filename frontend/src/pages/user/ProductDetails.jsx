import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import publicApi from '../../api/publicApi';

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [productDetail, setProductDetail] = useState({});
  const getProductDetail = async () => {
    // axios
    //   .get(`http://localhost:5000/products/getone/${id}`)
    //   .then(({ data }) => {
    //     console.log(data);
      
    //   });

    const {data} = await publicApi.get(`/products/getone/${id}`)
    setProductDetail(data);
  };

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    getProductDetail();
  }, []);

  if (!productDetail.images) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <NavBar />
      <Row>
        <Col>
          <img className="bigImage" src={backendUrl + productDetail.image}></img>
          <div className="smallerImagesDiv">
            {productDetail.images.map((img) => {
              return <img className="smallerImages" key={img} src={backendUrl+ img}></img>;
            })}
          </div>
        </Col>
        <Col>
          <h1 className="productName">{productDetail.name}</h1>
          <div className="descriptionDiv">
            <p> {productDetail.description}</p>
            <br />

            <div className="cartDiv">
              <div className="cart">
                <button className="cartButtons">+</button>
                <h5> 1 </h5>
                <button className="cartButtons">-</button>
                </div> 
                <div className="productprice">
                <h3>
                  {" "}
                  Ksh{" "}
                  {productDetail.price
                    ? productDetail.price.toLocaleString()
                    : 0}{" "}
                </h3>
              </div>
              
            
            </div>
            <button className="cartButton"> Add to cart </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductDetails;
