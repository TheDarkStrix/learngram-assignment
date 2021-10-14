import Cookies from "js-cookie";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = Cookies.get("auth") ? true : false;
  console.log("this", isAuthenticated);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/landing" />
      }
    />
  );
}

export default ProtectedRoute;
