import React, { useState, useEffect } from "react";
import SingleCartItem from "./SingleCartItem";

import {
  createCart,
  addItemToCart,
  getOrder,
  getProductOrders,
  updateQuantity,
  fetchSingleProduct,
} from "../api/cart";

const Cart = (props) => {
  const { cartItems, setCartItems, cartObj, setCartObj, user, token } = props;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const initializeCart = async () => {
      const cart = await createCart(token, totalPrice);
      setCartObj(cart);
    };
    if (token && !cartObj.id) initializeCart();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (cartObj.id) {
        const order = await getOrder(token, cartObj.id);
        const orderProducts = await getProductOrders(token, cartObj.id);
        if (order) {
          setCartObj({ ...order, products: orderProducts });
          if (orderProducts) {
            const products = orderProducts.map((item) =>
              fetchSingleProduct(token, item.productId)
            );
            setCartItems(products);
          }
        }
      }
    };
    fetchCart();
  }, []);

  // if item already exists in cart on backend, update quantity only
  useEffect(() => {
    const updateCart = async () => {
      if (cartObj.products) {
        const existingProductIds = cartObj.products.map((item) => item.id);
        const cartItemsToUpdate = cartItems.filter(
          (item) => !existingProductIds.includes(item.id)
        );
        for (let i = 0; i < cartItemsToUpdate.length; i++) {
          await addItemToCart(
            token,
            cartItemsToUpdate[i].id,
            cartObj.id,
            cartItemsToUpdate[i].quantity
          );
        }
        await cartObj.products.forEach((item) =>
          updateQuantity(token, item.id, item.quantity)
        );
      }

      const updatedOrder = await getOrder(token, cartObj.id);
      const orderProducts = await getProductOrders(token, cartObj.id);
      if (updatedOrder) {
        setCartObj({ ...updatedOrder, products: orderProducts });
      }
    };
    if (token && cartItems && cartObj.id) updateCart();
  }, [cartItems, totalPrice]);

  useEffect(() => {
    let total = 0;
    if (cartItems) {
      cartItems.map((item) => {
        let itemTotal = item.quantity * item.price;
        total += itemTotal;
        setTotalPrice(total);
      });
    }
  }, [cartItems, totalPrice]);

  function removeAllItems() {
    setCartItems([]);
    setTotalPrice(0);
  }

  return (
    <div className="cartBody">
      <div className="marginTop cartContainer">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
          <h5 className="Action" onClick={() => removeAllItems()}>
            Remove all
          </h5>
        </div>
        <div>
          {cartItems ? (
            cartItems.map((item) => (
              // -------------------- TODO -----------------------
              // change the value of the key! Just using title for testing out
              <SingleCartItem
                key={item.title}
                item={item}
                setCartItems={setCartItems}
                cartItems={cartItems}
                setTotalPrice={setTotalPrice}
              />
            ))
          ) : (
            <h3>Nothing in your cart</h3>
          )}
        </div>
        <div className="checkout">
          <div className="total">
            <div>
              <div className="Subtotal">Sub-Total</div>
              <div className="items">
                {cartItems ? cartItems.length : 0} items
              </div>
            </div>
            <div className="total-amount">${totalPrice}.00</div>
          </div>
          <button className="button">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
