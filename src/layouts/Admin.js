import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// import ProtectedRoute from '../components/guard/ProtectedRoute'
// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// views

import Dashboard from "../views/admin/Dashboard.js";
import Maps from "../views/admin/Maps.js";
import Settings from "../views/admin/Settings.js";
import Tables from "../views/admin/Tables.js";

import Add from "../views/admin/Books/add/add.js";
import Liste from "../views/admin/Books/liste/liste.js";
import Details from "../views/admin/Books/details/details.js";
import Edit from "../views/admin/Books/edit/edit.js";

export default function Admin() {
  return (
    <>
      <Sidebar route="admin"/>
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/books" exact component={Liste} />
            <Route path="/admin/books/add" exact component={Add} />
            <Route path="/admin/books/:id" exact component={Details} />
            <Route path="/admin/books/edit/:id" exact component={Edit} />
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
