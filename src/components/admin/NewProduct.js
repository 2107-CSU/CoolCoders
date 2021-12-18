import React, { useState } from 'react'
import { handleNewProduct } from './adminUtility';

const NewProduct = ({ history, token}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [photo, setPhoto] = useState('');

    function newProduct(e, title, description, price, qty, categoryId, photo){
        e.preventDefault();
        handleNewProduct(title, description, price, qty, categoryId, photo, token)
        history.push('./admin')
    }

    return (
        <form className='marginTop'>
            <h3>Add A New Product To The Store Here</h3>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    required
                    placeholder="New product title"
                    autoFocus
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    required
                    placeholder="New product description"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id="price"
                    required
                    placeholder="New product price"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>qty:</label>
                <input
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    id="qty"
                    required
                    placeholder="New product qty"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>categoryId:</label>
                <input
                    type="number"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    id="categoryId"
                    required
                    placeholder="New product categoryId"
                    className="form-control mb-2"
                />
            </div>
            <div>
                <label>Product Photo:</label>
                <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    id="photo"
                    required
                    placeholder="New product photo url here"
                    className="form-control mb-2"
                />
            </div>
                <button onClick={(e) => newProduct(e, title, description, price, qty, categoryId, photo)}>Add Product To Store</button>
        </form>
    )
}

export default NewProduct
