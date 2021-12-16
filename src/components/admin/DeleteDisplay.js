import React, { useState, useEffect } from 'react'
import { getProducts } from "../../api";
import { Link } from "react-router-dom";

const DeleteDisplay = ({ token }) => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          setLoading(true);
    
          const data = await getProducts();
    
          setLoading(false);
    
          setProducts(data);
        };
        fetchProducts();
      }, []);

    return (
        <div>
        <h2>Products</h2>
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
                    <Link to={`admin/delete/${product.id}`}>Delete Product</Link>
                </div>
                );
            })}
            </ul>
        ) : (
            <h3>Loading</h3>
        )} 
        </div>
    )
}

export default DeleteDisplay
