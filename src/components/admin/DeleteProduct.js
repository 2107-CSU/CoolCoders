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
        <div className='deleteProductContainer'>
            <h2>Are you sure you want to deactivate <b>{selectedProduct.title}</b>?</h2>
            <p><span className='deleteProductTitle'>Description:</span> {selectedProduct.description}</p>
            <p><span className='deleteProductTitle'>Price:</span> ${selectedProduct.price}</p>
            <p><span className='deleteProductTitle'>Quantity In Stock:</span> {selectedProduct.quantity}</p>
            <form onSubmit={(e) => deleteProduct(e, selectedProduct.id, token)}>
            <button className='deleteProductBtn'>Yes, Delete {selectedProduct.title}</button>
            </form>
        </div>
    )
}

export default DeleteProduct
