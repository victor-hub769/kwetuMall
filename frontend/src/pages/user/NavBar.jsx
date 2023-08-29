import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './navBar.css';

const NavBar = () => {
  return (
    <div className="navBarHeading">
      <h1>Kwetu Mall</h1>
      <div className="navBarIcons" > 
      <ShoppingCartIcon/>
      <AccountCircleIcon />
      </div>
      
    </div>
    
  );
};
export default NavBar;
