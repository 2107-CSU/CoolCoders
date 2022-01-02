import React, { useState, useEffect } from 'react'
import { getProductById, handleDeleteProduct } from './adminUtility';

const DeleteProduct = ({ match, history, token }) => {

    const [productId, setProductId] = useState(match.params.productId);
    const [selectedProduct, setSelectedProduct] = useState({});

    async function deleteProduct(e, productId, token, setSelectedProduct){
        e.preventDefault();
        await handleDeleteProduct(productId, token, setSelectedProduct);
        history.push('/deleteproduct');

    }

    useEffect(() => {
        async function fetchProduct(){
            const data = await getProductById(productId, token);
            window.localStorage.setItem('selectedProduct', JSON.stringify(data));
            setSelectedProduct(data)
        }
        fetchProduct();
    }, [])

    useEffect(() => {
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        setSelectedProduct(selectedProduct);
    }, [])

    return (
        <>
            {selectedProduct ? (
                        <div className='deleteProductContainer'>
                        <h2>Are you sure you want to deactivate <b>{selectedProduct.title}</b>?</h2>
                        <p><span className='deleteProductTitle'>Description:</span> {selectedProduct.description}</p>
                        <p><span className='deleteProductTitle'>Price:</span> ${selectedProduct.price}</p>
                        <p><span className='deleteProductTitle'>Quantity In Stock:</span> {selectedProduct.quantity}</p>
                        <form onSubmit={(e) => deleteProduct(e, selectedProduct.id, token)}>
                        <button className='deleteProductBtn'>Yes, Delete {selectedProduct.title}</button>
                        </form>
                    </div>
            ) : <h3>Loading Selected Product...</h3>}
        </>
    )
}

export default DeleteProduct
