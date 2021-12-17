import React, { useState, useEffect } from 'react'
import { handleDeleteProduct } from './adminUtility';
import { getProductById } from './adminUtility';

const DeleteProduct = ({ match, history, token }) => {

    const [productId, setProductId] = useState(match.params.productId);
    const [selectedProduct, setSelectedProduct] = useState({});

    async function deleteProduct(e, productId, token, setSelectedProduct){
        e.preventDefault();
        await handleDeleteProduct(productId, token, setSelectedProduct);
        history.push('/deleteproduct');
        
    }
    useEffect(() => {
        const productToDelete = getProductById(productId, setSelectedProduct);
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
