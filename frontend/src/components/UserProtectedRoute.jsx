import Cookies from "js-cookie";
import React from "react";
import { Route, Navigate, useResolvedPath } from "react-router-dom";

const UserProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = Cookies.get("token");
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
        <Navigate to= "/login" />
      )}
    </div>
  );
};
export default UserProtectedRoute;



