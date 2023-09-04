import Cookies from "js-cookie";
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = Cookies.get("admintoken");
  console.log(isAuthenticated)
  return (
    // <Route
    //   {...rest}
    //   render={(props) => {
    //    return  isAuthenticated ? (
    //       <Component {...props} />
    //     ) : (
    //       <Redirect to="/admin/login" />
    //     );
    //   }}
    // />

    <div>
      {isAuthenticated ? (
        <Component {...rest} />
      ) : (
        <Navigate to= "/admin/login" />
      )}
    </div>
  );
};
export default ProtectedRoute;
