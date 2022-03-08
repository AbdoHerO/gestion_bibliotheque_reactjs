import React from "react";
import { Redirect, Route } from "react-router-dom";
import bcrypt from "bcryptjs/dist/bcrypt";


function ProtectedRoute({ component: Component, ...restOfProps }) {

  const isAuthenticated = sessionStorage.getItem("auth-token");
  const role = sessionStorage.getItem("role");
  var valid = false
  if(role){
     valid = bcrypt.compareSync("user",role);
  }
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>

        isAuthenticated ? valid ? <Component {...props} /> : <Redirect to="/auth" /> : <Redirect to="/auth" />
       
      }
    />
  );
}

export default ProtectedRoute;