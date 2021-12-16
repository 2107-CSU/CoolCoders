import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Cart from "./Cart";
import Products from "./Products";
import Header from "./Header";
import Homepage from "./Homepage";
import Login from "./Login";
import Logout from "./Logout";
import AdminDashboard from './admin/AdminDashboard'
import NewProduct from "./admin/NewProduct";
import DeleteProduct from "./admin/DeleteProduct";
import UpdateProduct from "./admin/UpdateProduct";
import DeleteDisplay from "./admin/DeleteDisplay";

// create context to store user info for use throughout app
export const UserContext = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    if (!storedToken) setToken("");
  }, []);

  return (
    <BrowserRouter>
      <Header token={token}/>
      <Route path='/admin' exact render={() => <AdminDashboard />} />
      <Route path='/createnewproduct' exact render={(routeProps) => <NewProduct {...routeProps} token={token}/>} />
      <Route path='/deleteproduct' exact render={(routeProps) => <DeleteDisplay {...routeProps} token={token}/>} />
      <Route path='/updateproduct' exact render={(routeProps) => <UpdateProduct {...routeProps} token={token}/>} />
      <Route path='/admin/delete/:productId' exact render={(routeProps) => <DeleteProduct {...routeProps} token={token} />} />
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
      <Route path="/products" exact render={() => <Products />} />
      <Route path="/cart" exact render={() => <Cart />} />
      <Route path="/" exact render={() => <Homepage />} />
    </BrowserRouter>
  );
};

export default App;
