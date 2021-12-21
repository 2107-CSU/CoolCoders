import React, { useState, useEffect } from 'react'
import { handleUpdateProduct, getProductById } from './adminUtility';

const UpdateProduct = ({ history, token, match }) => {

    const [productId, setProductId] = useState(match.params.productId)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [photo, setPhoto] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({});


    async function updateProduct(e, productId, {title, description, price, qty, categoryId, photo}){
        e.preventDefault();
        await handleUpdateProduct(productId, {title, description, price, qty, categoryId, photo}, token)
        history.push('/updateproduct')
    }

    useEffect(() => {
        const productToUpdate = getProductById(productId, setSelectedProduct);
    }, [productId])

    useEffect(() => {
        setTitle(selectedProduct.title)
        setDescription(selectedProduct.description)
        setPrice(selectedProduct.price)
        setQty(selectedProduct.quantity)
        setCategoryId(selectedProduct.categoryId)
        setPhoto(selectedProduct.photo)
    }, [selectedProduct])

    return (
        <>
            <h2 className='marginTop'>UPDATE A PRODUCT HERE</h2>
            <form>
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
