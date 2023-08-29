import React from "react";
import "./styles/sideNav.css";
import { useNavigate } from "react-router-dom";
import "./styles/adminStyles.css";

const Sidenav = () => {
  const navigate = useNavigate();
  return (
    <div className="adminBody">
      <div className="panelDiv">
        <div className="adminHeadings">
          <h3> Kwetu Mall </h3>
          <h3> Admin Panel</h3>
        </div>
        <br />
        <div>
          <button
            className="adminButtons"
            onClick={() => navigate("/admin/products")}
          >
            {" "}
            Products{" "}
          </button>
          <button
            className="adminButtons"
            onClick={() => navigate("/admin/categories")}
          >
            {" "}
            Categories{" "}
          </button>

          <button
            className="adminButtons"
            onClick={() => navigate("/admin/pickUpPoints")}
          >
            {" "}
            Pickup Points{" "}
          </button>
          <button className="adminButtons"> Users </button>
          <button className="adminButtons"> Admins </button>
        </div>
        <br />
        <div className="bottomButtons">
          <button className="adminButtons"> My Account </button>
          <button className="adminButtons"> Logout </button>
        </div>
      </div>
    </div>
  );
};
export default Sidenav;
