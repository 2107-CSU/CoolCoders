import React, { useState } from 'react'
import { handleDeleteProduct } from './adminUtility';

const DeleteProduct = ({ history, token }) => {
    const [productId, setProductId] = useState(0);

    function deleteProduct(e, productId, token){
        e.preventDefault();
        handleDeleteProduct(productId, token);
        history.push('./admin');
    }

    return (
        <>
            <h2 className='marginTop'>DELETE A PRODUCT HERE</h2>
            <form onSubmit={(e) => deleteProduct(e, productId, token)}>
                <div>
                    <label>Product ID Of Product To Delete:</label>
                    <input 
                    type='text'
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    id='productId'
                    autoFocus
                    className='form-control mb-2'
                    required
                    />
                </div>
        
            <button>Delete Product</button>
            </form>
        </>
    )
}

export default DeleteProduct
