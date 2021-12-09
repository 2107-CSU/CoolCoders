import { request } from "express";
import React, { useEffect, useState } from "react"

import { getProducts } from "../api";

const Products = (props) => {
    const { products } = props;
    console.log(props)

    const [loading, setLoading] = useState(false);
    const [product, setProducts] = useState([]);

    useEffect(async () => {
        setLoading(true);

        const data = await getProducts;

        setLoading(false);

        setProducts(data);
    }, []);

    return [
        <h2>Products</h2>,
        !loading
            ? (
                <ul>
                    {products.map(products => {
                        return <li>{products.name}</li>
                    })}
                </ul>
            )  : <h3>Loading</h3>
    ];
}; 

export default Products;