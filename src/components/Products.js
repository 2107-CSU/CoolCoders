import React, { useEffect, useState } from "react";
import {Toast, Button, ToastContainer} from 'react-bootstrap';

import { getProducts } from "../api";
import {
  addItemToCart,
  createCart,
  getOrder,
  updateOrderUser,
} from "../api/cart";
// import { getSingleProduct } from "../api";

import { Link } from "react-router-dom";

import PromptGuest from "./PromptGuest";

/*
- Store cartItems in root, pass state down
- when user clicks "add to cart," product is added to cartItems (passed btw comps)
- If user is not logged in, prompt to continue as guest or create an account
- cart is not initialized in db until Cart page is visited *SUBJECT TO CHANGE*
  - if user is logged in, cart is created under their token
  - if not, a guest account is created and user is given token, which is then used to init cart
    - NOTE: that means if a token exists in state, when a user registers, they are UPDATING acct, not creating one
*/

const Products = (props) => {
  const {
    user,
    setUser,
    setToken,
    token,
    cartObj,
    setCartObj,
    cartItems,
    setCartItems,
  } = props;

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [promptGuest, setPromptGuest] = useState(false);
  //state for toast notification
  const [show, setShow] = useState(false);

  // fetches products from db upon page load
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const data = await getProducts();

      setLoading(false);

      setProducts(data);
    };
    fetchProducts();
  }, []);

  // if auth'd user, initialize cart upon visiting page
  useEffect(() => {
    const initializeCart = async () => {
      const cart = await createCart(token);
      setCartObj(cart);
      // store cart in local storage (as with token) for retrieval upon next visit
      localStorage.setItem("cart", JSON.stringify(cart));
    };
    if (token && !localStorage.getItem("cart")) {
      initializeCart();
    }
  }, [token]);

  useEffect(() => {
    const transferCart = async () => {
      if (cartObj.userId !== user.id) {
        const order = await updateOrderUser(token, cartObj.id);
        setCartObj(order);
      }
    };
    if (localStorage.getItem("cart")) transferCart();
  }, [user, token]);

  const handleAddToCart = async (product) => {
    if (cartObj.id) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      await addItemToCart(token, product.id, cartObj.id, 1);
      const updatedCart = await getOrder(token, cartObj.id);
      setCartObj(updatedCart);
      setCartItems(updatedCart.products);

      //change state to show toast notification
      setShow(true);
    }
  };

  return (
    <div>
      <h2 className="allProductsTitle">Products</h2>
      {promptGuest ? (
        <PromptGuest
          setUser={setUser}
          setToken={setToken}
          setPromptGuest={setPromptGuest}
        />
      ) : null}
      {!loading ? (
        <ul>
          {products.map((product) => {
            return (
              <div
                className="border mb-4 rounded overflow-hidden"
                key={product.id}
              >
                <h2 className="productTitle">{product.title}</h2>
                <img className="center" src={product.photo} />
                <p className="descTitle">Description: {product.description}</p>
                <p className="descTitle">Price: ${product.price}</p>
                <p className="descTitle">Quantity: {product.quantity}</p>
                <button className="viewButton" type="button"> <Link to={`/products/${product.id}`}>View</Link> </button>
                <button
                  id = "liveToastBtn"
                  className="addButton"
                  type="button"
                  onClick={() => {
                    token ? handleAddToCart(product) : setPromptGuest(true);
                  }}
                >
                  Add to cart
                </button>

                {/* Toast notification container   */}
                <div className="container position-fixed bottom-0 end-0 p-3">
                  <ToastContainer className="p-3" position="bottom-end">
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg="success">
                      <Toast.Body className="text-white">Item added to cart</Toast.Body>
                    </Toast>
                  </ToastContainer>
                </div>

              </div>
            );
          })}
        </ul>
      ) : (
        <h3>Loading</h3>
      )}
    </div>
  );
};

export default Products;
