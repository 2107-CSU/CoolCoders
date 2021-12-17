import React, { useState, useEffect } from 'react'
import { handleNewProduct } from './adminUtility';

const NewProduct = ({ history, token }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [photo, setPhoto] = useState('');

    function newProduct(e, token, title, description, price, qty, categoryId, photo){
        e.preventDefault();
        handleNewProduct(token, title, description, price, qty, categoryId, photo)
        history.push('./admin')
    }


    return (
        <>
        <h3 className='singleProductTitle'>Add A New Product To The Store Here</h3>
        <form className='singleProductForm'>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    required
                    placeholder="New product title"
                    autoFocus
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    required
                    placeholder="New product description"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id="price"
                    required
                    placeholder="New product price"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Quantity:</label>
                <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    id="qty"
                    required
                    placeholder="New product qty"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>CategoryId:</label>
                <input
                    type="number"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    id="categoryId"
                    required
                    placeholder="New product categoryId"
                    className="singleProductInput"
                />
            </div>
            <div className='singleProductDetail'>
                <label className='singleProductLabel'>Product Photo:</label>
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    id="photo"
                    required
                    placeholder="New product photo url here"
                    className="singleProductInput"
                />
            </div>
                <button className='singleProductBtn' onClick={(e) => newProduct(e, token, title, description, price, qty, categoryId, photo)}>Add Product To Store</button>
        </form>
        </>
    )
}

export default NewProduct
