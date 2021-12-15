import React, { useState } from 'react'
import { handleUpdateProduct } from './adminUtility';

const UpdateProduct = ({ history }) => {

    const [productId, setProductId] = useState(0)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [photo, setPhoto] = useState('');

    async function updateProduct(e, productId, {title, description, price, qty, categoryId, photo}){
        e.preventDefault();
        handleUpdateProduct(productId, {title, description, price, qty, categoryId, photo})
        history.push('/admin')
    }

    return (
        <>
            <h2 className='marginTop'>UPDATE A PRODUCT HERE</h2>
            <form>
                <div>
                    <label>Product ID Of Product To Update</label>
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
                <div>
                <label>Updated Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="update product title"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>Updated description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="update product description"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>Updated price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id="price"
                    placeholder="update product price"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>Updated qty:</label>
                <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    id="qty"
                    placeholder="update product qty"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>Updated categoryId:</label>
                <input
                    type="number"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    id="categoryId"
                    placeholder="update product categoryId"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>Updated Product Photo:</label>
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    id="photo"
                    placeholder="update photo url here"
                    className="form-control mb-2"
                />
            </div>
            <button onClick={(e) => updateProduct(e, productId, {title, description, price, qty, categoryId, photo})}>Update Product</button>
            </form>
        </>
    )
}

export default UpdateProduct
