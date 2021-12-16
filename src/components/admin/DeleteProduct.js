import React, { useState, useEffect } from 'react'
import { handleDeleteProduct } from './adminUtility';

const DeleteProduct = ({ match, history, token }) => {

    
    const getProductById = async () => {
        try {
            const response = await fetch (`http://localhost:2345/api/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            })
            const data = await response.json();
            console.log('data inside getProductById', data);
            setSelectedProduct(data)
        }
            catch (error) {
            console.log(error)
            throw error;
        }
    }

    const [productId, setProductId] = useState(match.params.productId);
    const [selectedProduct, setSelectedProduct] = useState({});

    async function deleteProduct(e, productId, token){
        e.preventDefault();
        await handleDeleteProduct(productId, token);
        history.push('/deleteproduct');
        
    }
    useEffect(() => {
        const { productIdToDelete } = match.params;
        setProductId(productIdToDelete)
        const productToDelete = getProductById(productId);
        setSelectedProduct(productToDelete)

    }, [productId])
    return (
        <>
            <h2 className='marginTop'>Are you sure you want to deactivate <b>{selectedProduct.title}</b>?</h2>
            <h3><b>Description:</b> {selectedProduct.description}</h3>
            <h3><b>Price:</b> {selectedProduct.price}</h3>
            <h3><b>Quantity In Stock:</b> {selectedProduct.quantity}</h3>
            <form onSubmit={(e) => deleteProduct(e, selectedProduct.id, token)}>
            <button>Yes, Delete Product</button>
            </form>
        </>
    )
}

export default DeleteProduct
