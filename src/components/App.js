import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Cart from "./Cart";
import Products from "./Products";
import Header from "./Header";
import Homepage from "./Homepage";
import Login from "./Login";
import Logout from "./Logout";

// create context to store user info for use throughout app - CURRENTLY UNUSED, may not be compatible with this version of React
// export const UserContext = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const [cartObj, setCartObj] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
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
        render={() => <Logout setToken={setToken} />}
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
          />
        )}
      />
      <Route
        path="/cart"
        exact
        render={() => <Cart cartObj={cartObj} setCartObj={setCartObj} />}
      />
      <Route path="/" exact render={() => <Homepage />} />
    </BrowserRouter>
  );
};

export default App;
