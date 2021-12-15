import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Cart from "./Cart";
import Products from "./Products";
import Header from "./Header";
import Homepage from "./Homepage";
import Login from "./Login";
import Logout from "./Logout";

import { getOrder } from "../api/cart";

// create context to store user info for use throughout app - CURRENTLY UNUSED, may not be compatible with this version of React
// export const UserContext = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const [cartObj, setCartObj] = useState({});
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const retrieveCart = async (token) => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart && token && !cartObj.id) {
        let cart = JSON.parse(storedCart);
        let retrieved = await getOrder(token, cart.id);
        setCartObj(retrieved);
        if (retrieved[0].products) setCartItems(retrieved[0].products);
      }
    };
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      retrieveCart(storedToken);
    }

    if (!storedToken) setToken("");
  }, []);

  return (
    <BrowserRouter>
      <Header token={token} />
      <Route
        path="/login"
        exact
        render={(routeProps) => (
          <Login
            {...routeProps}
            setToken={setToken}
            token={token}
            setUser={setUser}
          />
        )}
      />
      <Route
        path="/register"
        exact
        render={(routeProps) => <Login {...routeProps} setToken={setToken} />}
      />
      <Route
        path="/logout"
        exact
        render={() => <Logout setToken={setToken} setCartObj={setCartObj} />}
      />
      <Route
        path="/products"
        exact
        render={() => (
          <Products
            user={user}
            token={token}
            cartObj={cartObj}
            setCartObj={setCartObj}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        )}
      />
      <Route
        path="/cart"
        exact
        render={() => (
          <Cart
            user={user}
            token={token}
            cartObj={cartObj}
            setCartObj={setCartObj}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        )}
      />
      <Route path="/" exact render={() => <Homepage />} />
    </BrowserRouter>
  );
};

export default App;
