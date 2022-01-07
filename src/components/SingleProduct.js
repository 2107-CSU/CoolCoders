import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../api";
import { addItemToCart, getOrder } from "../api/cart";
import {Toast, ToastContainer} from 'react-bootstrap';

const SingleProduct = (props) => {
  const { token, cartObj, setCartObj, cartItems, setCartItems } = props;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState(null);
  //state for toast notification
  const [show, setShow] = useState(false);

  //  This useEffect breaks the path into an array and then grabs the last index which is going to be the product id *
  useEffect(() => {
    const splitPath = window.location.pathname.split("/");

    setProductId(splitPath[splitPath.length - 1]);
  }, []);

  //  This useEffect is used when the productId changes and it will make the call to the id and return the single product

  useEffect(() => {
    const fetchSingleProduct = async (id) => {
      setLoading(true);

      const data = await getSingleProduct(id);

      setLoading(false);
      setProduct(data);
    };

    if (productId) {
      fetchSingleProduct(productId);
    }
  }, [productId]);

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

  return loading ? (
    <div>Loading</div>
  ) : (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
        border: "1px solid black",
        marginTop: "100px",
      }}
    >
      <h1 className="productTitle">{product.title}</h1>
      <img src={product.photo} />
      <p className="descTitle">Description: {product.description}</p>
      <p className="descTitle">
        Price: {product.price} Quantity: {product.quantity}
      </p>
      {/* FOR NOW: can only add to cart from single item page if logged in */}
      {token ? (
        <button className="addButton" type="button" onClick={() => handleAddToCart(product)}>
          ADD TO CART
        </button>
      ) : null}

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
};

// Have reviews show up in single product view if time permits?
export default SingleProduct;
