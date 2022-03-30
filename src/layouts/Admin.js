import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AdminProtectedRoute from '../components/guard/ProtectedRouteAdmin'
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
            <AdminProtectedRoute path="/admin/books" exact component={Liste} />
            <AdminProtectedRoute path="/admin/books/add" exact component={Add} />
            <AdminProtectedRoute path="/admin/books/:id" exact component={Details} />
            <AdminProtectedRoute path="/admin/books/edit/:id" exact component={Edit} />
            <AdminProtectedRoute path="/admin/dashboard" exact component={Dashboard} />
            <AdminProtectedRoute path="/admin/maps" exact component={Maps} />
            <AdminProtectedRoute path="/admin/settings" exact component={Settings} />
            <AdminProtectedRoute path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
