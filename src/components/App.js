import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import helper functions
import { fetchUserObj, getUser, getUserOrders } from "../api/users";

import Cart from "./Cart";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import Header from "./Header";
import Homepage from "./Homepage";
import Login from "./Login";
import Logout from "./Logout";
import MyAccount from "./MyAccount";
import AdminDashboard from "./admin/AdminDashboard";
import NewProduct from "./admin/NewProduct";
import DeleteDisplay from "./admin/DeleteDisplay";
import DeleteProduct from "./admin/DeleteProduct";
import UpdateDisplay from "./admin/UpdateDisplay";
import UpdateProduct from "./admin/UpdateProduct";
import CreateNewAdmin from "./admin/CreateNewAdmin";
import AllUsers from "./admin/AllUsers";
import MakeAdmin from './admin/MakeAdmin'
import DeleteUser from './admin/DeleteUser'
import ProtectedRoute from "./ProtectedRoute";
// create context to store user info for use throughout app
export const UserContext = createContext();

import { getOrder } from "../api/cart";

const App = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});


  const [cartObj, setCartObj] = useState({});
  const [cartItems, setCartItems] = useState([]);

  // sets token and cart from localStorage if returning user from familiar browser
  useEffect(() => {
    const retrieveCart = async (token) => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart && token && !cartObj.id) {
        let cart = JSON.parse(storedCart);
        let retrieved = await getOrder(token, cart.id);
        setCartObj(retrieved);
        if (retrieved.products) setCartItems(retrieved.products);
      }
    };
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      retrieveCart(storedToken);
    }

    if (!storedToken) setToken("");
  }, []);

  //if auth'd user on new browser/device, retrieve most recent cart and set in state
  useEffect(() => {
    const fetchRecentCart = async () => {
      const id = user.id;
      const userOrders = await getUserOrders(token, id);
      const userCarts = userOrders.filter(
        (order) => order.orderStatus === "cart" && order.products.length > 0
      );
      const sortedCarts = userCarts.sort((a, b) => a.id - b.id);
      const mostRecent = sortedCarts[sortedCarts.length - 1];
      if (mostRecent) {
        setCartObj(mostRecent);
        localStorage.setItem("cart", JSON.stringify(mostRecent));
        if (mostRecent.products) setCartItems(mostRecent.products);
      }
    };
    if (!cartObj.id && token && user.id) {
      fetchRecentCart();
    }
  }, [user]);

  //initialize user object on page load
  //and whenever token state changes
  useEffect(() => {
    async function fetchData() {
      //retrieve user information using token
      const userInfo = await fetchUserObj(token);

      //setUser
      setUser(await getUser(userInfo.id));
    }
    fetchData();
  }, [token]);

  return (
    <BrowserRouter>
      <Header token={token}/>
      <ProtectedRoute path='/admin' exact token={token} user={user} component={AdminDashboard}/>
      <Route path='/createnewproduct' exact render={(routeProps) => <NewProduct {...routeProps} token={token}/>} />
      <Route path='/deleteproduct' exact render={(routeProps) => <DeleteDisplay {...routeProps} token={token}/>} />
      <Route path='/updateproduct' exact render={(routeProps) => <UpdateDisplay {...routeProps} token={token}/>} />
      <Route path='/createadmin' exact render={(routeProps) => <CreateNewAdmin {...routeProps} token={token}/>} />
      <Route path='/admin/delete/:productId' exact render={(routeProps) => <DeleteProduct {...routeProps} token={token} />} />
      <Route path='/admin/edit/:productId' exact render={(routeProps) => <UpdateProduct {...routeProps} token={token} />} />
      <Route path='/admin/users' exact render={(routeProps) => <AllUsers {...routeProps} token={token} />} />
      <Route path='/admin/makeadmin/:userId' exact render={(routeProps) => <MakeAdmin {...routeProps} token={token} />} />
      <Route path='/admin/deleteuser/:userId' exact render={(routeProps) => <DeleteUser {...routeProps} token={token} />} />
      <Header token={token} isAdmin={isAdmin} />
      <Route path="/admin" exact render={() => <AdminDashboard />} />
      <Route
        path="/createnewproduct"
        exact
        render={(routeProps) => <NewProduct {...routeProps} token={token} />}
      />
      <Route
        path="/deleteproduct"
        exact
        render={(routeProps) => <DeleteDisplay {...routeProps} token={token} />}
      />
      <Route
        path="/updateproduct"
        exact
        render={(routeProps) => <UpdateDisplay {...routeProps} token={token} />}
      />
      <Route
        path="/createadmin"
        exact
        render={(routeProps) => (
          <CreateNewAdmin {...routeProps} token={token} />
        )}
      />
      <Route
        path="/admin/delete/:productId"
        exact
        render={(routeProps) => <DeleteProduct {...routeProps} token={token} />}
      />
      <Route
        path="/admin/edit/:productId"
        exact
        render={(routeProps) => <UpdateProduct {...routeProps} token={token} />}
      />
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
        render={() => (
          <Logout
            setToken={setToken}
            setCartObj={setCartObj}
            setUser={setUser}
            setIsAdmin={setIsAdmin}
            setCartItems={setCartItems}
          />
        )}
      />
      <Route
        path="/products"
        exact
        render={() => (
          <Products
            user={user}
            setUser={setUser}
            setToken={setToken}
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
      <Route
        path="/products/:id"
        exact
        render={() => (
          <SingleProduct
            token={token}
            cartObj={cartObj}
            setCartObj={setCartObj}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        )}
      />
      <Route path="/" exact render={() => <Homepage />} />
      <Route
        exact
        path="/myaccount"
        render={(routeProps) => (
          <MyAccount
            user={user}
            setUser={setUser}
            token={token}
            {...routeProps}
          />
        )}
      />
    </BrowserRouter>
  );
};

export default App;
