import React, { useEffect, useState } from "react";

import { getProducts } from "../api";
import { addItemToCart, createCart, getOrder } from "../api/cart";
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
    if (token && !Object.keys(cartObj).length) {
      initializeCart();
    }
  }, [token]);

  const handleAddToCart = async (product) => {
    if (cartObj.id) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      await addItemToCart(token, product.id, cartObj.id, 1);
      const updatedCart = await getOrder(token, cartObj.id);
      setCartObj(updatedCart);
      setCartItems(updatedCart.products);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {promptGuest ? (
        <PromptGuest setUser={setUser} setToken={setToken} />
      ) : null}
      {!loading ? (
        <ul>
          {products.map((product) => {
            return (
              <div
                className="border mb-4 rounded overflow-hidden"
                key={product.id}
              >
                <h2 className="p-3">{product.title}</h2>
                <p className="mb-3">Description: {product.description}</p>
                <p className="font-bold mb-3">Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <Link to={`/products/${product.id}`}>View</Link>
                <button
                  type="button"
                  onClick={() => {
                    token ? handleAddToCart(product) : setPromptGuest(true);
                  }}
                >
                  Add to cart
                </button>
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
