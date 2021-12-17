import React, { useState, useEffect } from 'react'
import { getProducts } from "../../api";
import { Link } from "react-router-dom";

const UpdateDisplay = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const data = await getProducts();
          setProducts(data);
        };
        fetchProducts();
      }, []);

    return (
        <div>
        <h2 className='allProductsTitle'>Products</h2>
        {products.length ? (
            <div className='productContainer'>
            {products.map((product) => {
                return (
                <div
                    className="individualProduct"
                    key={product.id}
                >
                    <p className="descTitle productTitle">{product.title}</p>
                    <p className="mb-3"><span className='descTitle'>Description: </span>{product.description}</p>
                    <p className="font-bold mb-3"><span className='descTitle'>Price:</span> ${product.price}</p>
                    <p><span className='descTitle'>Quantity:</span>{product.quantity}</p>
                    <Link to={`admin/edit/${product.id}`} className='singleProductBtn'>Edit {product.title}</Link>
                </div>
                );
            })}
            </div>
        ) : (
            <h3>Loading</h3>
        )} 
        </div>
    )
}

export default UpdateDisplay
