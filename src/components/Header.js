import req from "express/lib/request";
import { user } from "pg/lib/defaults";
import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const Header = ({ token, user }) => {
  return (
    <header className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <button
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        className="navbar-toggler"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
        {!token ? (
          <Link to="/login" className="nav-link">
            {" "}
            Login{" "}
          </Link>
        ) : null}

        {token ? (
          <Fragment>
            <Link to="/myaccount" className="nav-link">
              My Account
            </Link>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </Fragment>
        ) : null}

        {user && user.userStatus === "admin" ? (
          <Link to="/admin" className="nav-link">
            Admin Dashboard
          </Link>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
