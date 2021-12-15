import React, { useState } from 'react'
import { handleDeleteProduct } from './adminUtility';

const DeleteProduct = ({ history }) => {
    const [productId, setProductId] = useState(0);

    function deleteProduct(e, productId){
        e.preventDefault();
        handleDeleteProduct(productId);
        history.push('./admin');
    }

    return (
        <>
            <h2 className='marginTop'>DELETE A PRODUCT HERE</h2>
            <form>
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
        
            <button onClick={(e) => deleteProduct(e, productId)}>Delete Product</button>
            </form>
        </>
    )
}

export default DeleteProduct
