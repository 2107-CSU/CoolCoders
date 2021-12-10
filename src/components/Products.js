import React, { useEffect, useState } from "react"

import { getProducts } from "../api";

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
                            return <li key={product.id}>{product.title}</li>
                        })}
                    </ul>
                )  : <h3>Loading</h3>}
        </div>
    );
}; 

export default Products;