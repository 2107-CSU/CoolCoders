import React from "react";

import { getOrder, updateQuantity, deleteProductOrder } from "../api/cart";

const SingleCartItem = ({
  item,
  setCartItems,
  cartItems,
  setTotalPrice,
  token,
  cartObj,
  setCartObj,
}) => {
  async function removeSingleItem() {
    const { id } = item;
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    if (updatedCartItems.length === 0) setTotalPrice(0);
    setCartItems(updatedCartItems);
    await deleteProductOrder(token, id);
    const updatedCart = await getOrder(token, cartObj.id);
    setCartObj(updatedCart);
    if (updatedCart.products) setCartItems(updatedCart.products);
  }

  async function addCartQty(itemToUpdate) {
    const updatedCartItems = cartItems.map((item) => {
      if (item.title === itemToUpdate.title) {
        itemToUpdate.quantity++;
      }
      return item;
    });
    setCartItems(updatedCartItems);
    await updateQuantity(token, item.id, item.quantity);
    const updatedCart = await getOrder(token, cartObj.id);
    setCartObj(updatedCart);
    if (updatedCart.products) setCartItems(updatedCart.products);
  }

  async function decreaseCartQty(itemToUpdate) {
    if (item.quantity > 1) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.title === itemToUpdate.title) {
          itemToUpdate.quantity--;
        }
        return item;
      });
      setCartItems(updatedCartItems);
    }
    await updateQuantity(token, item.id, item.quantity);
    const updatedCart = await getOrder(token, cartObj.id);
    setCartObj(updatedCart);
    if (updatedCart.products) setCartItems(updatedCart.products);
  }

  function saveForLater() {
    // move off of cartItems to wishListItems?
  }

  return (
    <div className="cartItems">
      <div className="about">
        <h1 className="title">{item.title}</h1>
        <h3 className="subtitle">
          {item.description && item.description.length > 25
            ? item.description.slice(0, 25) + "..."
            : item.description}
        </h3>
      </div>
      <div className="counter">
        <div className="btn" onClick={() => addCartQty(item)}>
          +
        </div>
        <div className="count" value={item.quantity}>
          {item.quantity}
        </div>
        <div className="btn" onClick={() => decreaseCartQty(item)}>
          -
        </div>
      </div>
      <div className="prices">
        <div className="amount">${item.productPrice * item.quantity}.00</div>
        <div className="save">
          <u>Save for later</u>
        </div>
        <div className="remove" onClick={() => removeSingleItem()}>
          <u>Remove</u>
        </div>
      </div>
    </div>
  );
};

export default SingleCartItem;
