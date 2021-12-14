import React, { useEffect, useState } from "react"

import { getProducts } from "../api";
// import { getSingleProduct } from "../api";

import {Link} from 'react-router-dom';

const Products = () => {
   
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);


    useEffect( () => {
        const fetchProducts = async () => {
            setLoading(true);

            const data = await getProducts();
          
            setLoading(false);
    
            setProducts(data);
        }
        fetchProducts();
    }, []);


    return (
        <div>
            <h2>Products</h2>
            {!loading
                ? (
                    <ul>
                        {products.map(product => {
                            return <div className="border mb-4 roundeed overflow-hidden">
                                    <h2 clasName="p-3" key={product.id}>{product.title}</h2>
                                    <p className="mb-3">Description: {product.description}</p>
                                    <p className="font-bold mb-3">Price: ${product.price}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <Link to={`/products/${product.id}`}>
                                        View
                                    </Link>
                                </div>
                        })}
                    </ul>
                )  : <h3>Loading</h3>}
        </div>
    );
}; 

export default Products;