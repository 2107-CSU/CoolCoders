import React, { useEffect, useState } from "react"

import { getSingleProduct } from "../api";

const singleProduct = () => {
    
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect( () => {
        const fetchSingleProduct = async () => {
            setLoading(true);

            const data = await getSingleProduct();

            setLoading(false);

            setProduct(data);
        }
        fetchSingleProduct();
    }, []);

    return (
        <div>
            <h2>{product.title}</h2>
            {!loading
                ?(
                    <ul>
                        {product.map(single => {
                            return <li key={product.id}>{product.title}</li>
                        })}
                    </ul>
                ) : <h3>Loading</h3>
            }
        </div>
    )
}