import React, { useEffect, useState } from "react"

import { getProducts } from "../api";
// import { getSingleProduct } from "../api";

import { Link } from 'react-router-dom';


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
            <h2 style={{
                marginTop:"50px",
                textAlign:"center"}}>Products</h2>
            {!loading
                ? (
                    <ul>
                        {products.filter(product => !!product.quantity).map(product => {
                            return (
                            <div className="border mb-3 roundeed overflow-hidden">
                                <h2 className="p-3" key={product.id}>{product.title}</h2>
                                <div>
                                    <img src={product.photo}/>
                                </div>
                                <div className="mb-3">Description: {product.description}</div>
                                <div className="font-bold mb-3">Price: ${product.price}</div>
                                <div>Quantity: {product.quantity}</div>
                                <Link  to={`/products/${product.id}`}>
                                    View
                                </Link>
                            </div>
                            )
                        })}
                    </ul>
                )  : <h3>Loading</h3>}
        </div>
    );
}; 

export default Products;