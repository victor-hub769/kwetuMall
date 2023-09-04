import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import privateApi from "../../api/privateApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container } from "@mui/material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

  const getCartItems = async () => {
    const { data } = await privateApi.get("/get-cart-items");
    console.log(data);
    setCartItems(data.data);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return ( 
    <div>     
         <NavBar />
        <Container>        <h1>Cart Details</h1>
      {cartItems.map((item) => {
        return (
          <div >
            <div className="cartDiv">
              <img
                className="cartImg"
                src={backendUrl + item.product.image}
              ></img>
              <p className="cartP">{item.product.price * item.quantity}</p>
              <p className="cartP">{item.quantity}</p>
              <DeleteIcon />{" "}
            </div>
          </div>
        );
      })}
    </Container>
    </div>
     

  );
};
export default Cart;
