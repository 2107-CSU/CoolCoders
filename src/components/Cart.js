import React, { useState, useEffect } from "react";
import SingleCartItem from "./SingleCartItem";
import { mockCart } from "../api/mockFEData";
import BASE_URL from "../api/constant";

import { getOrder, deleteProductOrder } from "../api/cart";

const Cart = (props) => {
  const { cartItems, setCartItems, cartObj, setCartObj, user, token } = props;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    if (cartItems) {
      cartItems.map((item) => {
        let itemTotal = item.quantity * item.productPrice;
        total += itemTotal;
        setTotalPrice(total);
      });
    }
  }, [cartItems, totalPrice]);

  useEffect(() => {
    const updateCart = async () => {
      const cart = await getOrder(token, cartObj.id);
      setCartObj(cart);
    };
    updateCart();
  }, [cartItems]);

  async function removeAllItems() {
    await cartItems.forEach((item) => deleteProductOrder(token, item.id));
    setCartItems([]);
    setTotalPrice(0);
  }

  function handleCheckout() {
    const items = [];
    for (let i = 0; i < cartItems.length; i++) {
      const currentItem = cartItems[i];
      items.push({ id: currentItem.id });
    }
    fetch(`${BASE_URL}/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: items,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
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
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <SingleCartItem
                key={item.id}
                item={item}
                setCartItems={setCartItems}
                cartItems={cartItems}
                setTotalPrice={setTotalPrice}
                token={token}
                cartObj={cartObj}
                setCartObj={setCartObj}
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
          <button className="button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
