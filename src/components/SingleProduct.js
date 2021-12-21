import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../api";
import { addItemToCart, getOrder } from "../api/cart";

const SingleProduct = (props) => {
  const { token, cartObj, setCartObj, cartItems, setCartItems } = props;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState(null);

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
      <h1>{product.title}</h1>
      <img src={product.photo} />
      <p>Description: {product.description}</p>
      <p>
        Price: {product.price} Quantity: {product.quantity}
      </p>
      {/* FOR NOW: can only add to cart from single item page if logged in */}
      {token ? (
        <button type="button" onClick={() => handleAddToCart(product)}>
          ADD TO CART
        </button>
      ) : null}
    </div>
  );
};

// Have reviews show up in single product view if time permits?
export default SingleProduct;
