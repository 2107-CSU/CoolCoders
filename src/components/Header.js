import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";

const Header = ({ token }) => {
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
            <Link to="/orders" className="nav-link">
              My Orders
            </Link>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </Fragment>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
