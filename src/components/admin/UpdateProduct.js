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
        getProductById(productId, setSelectedProduct, token);
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
            <h2 className='singleProductTitle'>Update {selectedProduct.title? selectedProduct.title : 'a product'} Here</h2>
            <form className='singleProductForm'>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Updated Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="update product title"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Updated description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="update product description"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Updated price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id="price"
                    placeholder="update product price"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Updated qty:</label>
                <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    id="qty"
                    placeholder="update product qty"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Updated categoryId:</label>
                <input
                    type="number"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    id="categoryId"
                    placeholder="update product categoryId"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Updated Product Photo:</label>
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    id="photo"
                    placeholder="update photo url here"
                    className="singleProductInput"
                />
            </div>
            <button className='singleProductBtn' onClick={(e) => updateProduct(e, productId, {title, description, price, qty, categoryId, photo})}>Update Product</button>
            </form>
        </>
    )
}

export default UpdateProduct
