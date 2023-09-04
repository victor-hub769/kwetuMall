import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import publicApi from "../../api/publicApi";
import privateApi from "../../api/privateApi";
import Cookies from "js-cookie";
import { useNavigate} from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const addToCart = async () => {
    if (quantity < 1) {
      setErrorMsg("Quantity must be greater than 0");
    } else {
      const { data } = await privateApi.post("/add-to-cart", {
        productId: id,
        quantity: quantity,
      });
      console.log(data);
      if (data.message === 'Added to cart sucessfully!'){
        navigate('/cart-details');
      }
    }
  };
  const isAuthenticated = Cookies.get("token");
  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState({});
  const getProductDetail = async () => {
    // axios
    //   .get(`http://localhost:5000/products/getone/${id}`)
    //   .then(({ data }) => {
    //     console.log(data);

    //   });

    const { data } = await publicApi.get(`/products/getone/${id}`);
    setProductDetail(data.data);
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
          <img
            className="bigImage"
            src={backendUrl + productDetail.image}
          ></img>
          <div className="smallerImagesDiv">
            {productDetail.images.map((img) => {
              return (
                <img
                  className="smallerImages"
                  key={img}
                  src={backendUrl + img}
                ></img>
              );
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
                <button
                  className="cartButtons"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
                <h5>{quantity}</h5>
                <button
                  className="cartButtons"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
              </div>
              <div className="productprice">
                <h3>
                  {" "}
                  Ksh{" "}
                  {productDetail.price
                    ? (productDetail.price * quantity).toLocaleString()
                    : 0}{" "}
                </h3>
              </div>
            </div>
            <button
              className="cartButton"
              onClick={addToCart}
              disabled={isAuthenticated ? false : true}
            >
              {" "}
              Add to cart{" "}
            </button>
            {!isAuthenticated ? (
              <p>
                {" "}
                Log in <a href="/login">here</a> to add Product to Cart
              </p>
            ) : null}
            {errorMsg ? <p>{errorMsg}</p> : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductDetails;