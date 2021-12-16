import React, { useEffect, useState } from "react"
import { getSingleProduct } from "../api";

const SingleProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState(null);

// * This useEffect breaks the path into an array and then grabs the last index which is going to be the product id *
  useEffect(() => {
    const splitPath = window.location.pathname.split('/');
    
    setProductId(splitPath[splitPath.length - 1]);
  }, []);

// * This useEffect is used when the productId changes and it will make the call to id

  useEffect(() => {
    const fetchSingleProduct = async (id) => {
      setLoading(true);

      const data = await getSingleProduct(id);

      setLoading(false);
      setProduct(data);
    }

    if (productId) {
      fetchSingleProduct(productId);
    }
  }, [productId]);

  return loading
    ? <div>Loading</div>
    : <div style ={{
        textAlign:"center",
        margin: "0 auto",
        border: "1px solid black",
        marginTop: "100px"}}>
      <h1>{product.title}</h1>
      <img src={product.photo} />
      <p>Description: {product.description}</p>
      <p>Price: {product.price} Quantity: {product.quantity}</p>
    </div>
};

export default SingleProduct;