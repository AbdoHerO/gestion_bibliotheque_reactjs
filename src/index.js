import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./assets/styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Admin from "./layouts/Admin.js";
import User from "./layouts/User.js";
import Auth from "./layouts/Auth.js";
ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/user" component={User} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}

      <Route exact path="/"  component={App} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
     
    </Switch>
  </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
