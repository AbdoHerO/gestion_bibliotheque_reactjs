import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import ProtectedRoute from '../components/guard/ProtectedRoute'
// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/UserSideBar";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// views

import Dashboard from "../views/user/Dashboard.js";
import Maps from "../views/user/Maps.js";
import Settings from "../views/user/Settings.js";
import Tables from "../views/user/Tables.js";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/user/dashboard" exact component={Dashboard} />
            <Route path="/user/maps" exact component={Maps} />
            <Route path="/user/settings" exact component={Settings} />
            <Route path="/user/tables" exact component={Tables} />
            <Redirect from="/user" to="/user/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
