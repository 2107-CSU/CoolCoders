import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import helper functions
import { fetchUserObj, getUser } from "../api/users";

import Cart from "./Cart";
import Products from "./Products";
import SingleProduct from './SingleProduct';
import Header from "./Header";
import Homepage from "./Homepage";
import Login from "./Login";
import Logout from "./Logout";
import MyAccount from "./MyAccount";
import AdminDashboard from './admin/AdminDashboard'
import NewProduct from "./admin/NewProduct";
import DeleteDisplay from "./admin/DeleteDisplay";
import DeleteProduct from "./admin/DeleteProduct";
import UpdateDisplay from "./admin/UpdateDisplay";
import UpdateProduct from "./admin/UpdateProduct";
import CreateNewAdmin from "./admin/CreateNewAdmin";

// create context to store user info for use throughout app
export const UserContext = createContext();

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    if (!storedToken) setToken("");
  }, []);

  //initialize user object on page load
  //and whenever token state changes
  useEffect( () => {
    async function fetchData() {
      //retrieve user information using token
      const userInfo = await fetchUserObj(token);

      //setUser
      setUser(await getUser(userInfo.id));
    }
    fetchData();
  }, [token])


  return (
    <BrowserRouter>
      <Header token={token} isAdmin={isAdmin}/>
      <Route path='/admin' exact render={() => <AdminDashboard />} />
      <Route path='/createnewproduct' exact render={(routeProps) => <NewProduct {...routeProps} token={token}/>} />
      <Route path='/deleteproduct' exact render={(routeProps) => <DeleteDisplay {...routeProps} token={token}/>} />
      <Route path='/updateproduct' exact render={(routeProps) => <UpdateDisplay {...routeProps} token={token}/>} />
      <Route path='/createadmin' exact render={(routeProps) => <CreateNewAdmin {...routeProps} token={token}/>} />
      <Route path='/admin/delete/:productId' exact render={(routeProps) => <DeleteProduct {...routeProps} token={token} />} />
      <Route path='/admin/edit/:productId' exact render={(routeProps) => <UpdateProduct {...routeProps} token={token} />} />
      <Route
        path="/login"
        exact
        render={(routeProps) => (
          <Login
            {...routeProps}
            setToken={setToken}
            token={token}
            setUser={setUser}
            setIsAdmin={setIsAdmin}
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
        render={() => <Logout setToken={setToken} setIsAdmin={setIsAdmin}/>}
      />
      <Route path="/products" exact render={() => <Products />} />
      <Route path='/products/:id' exact render={() => <SingleProduct />}/>
      <Route path="/cart" exact render={() => <Cart />} />
      <Route path="/" exact render={() => <Homepage />} />
      <Route
        exact path = '/myaccount'
        render = {routeProps => <MyAccount user={user} setUser={setUser} token={token} {...routeProps} />}
      />
    </BrowserRouter>
  );
};

export default App;
