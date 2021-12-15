import React, { useState } from 'react'
// title, description, price, qty, active, categoryId
const NewProduct = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    // const [isActive, setIsActive] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [photo, setPhoto] = useState('');

    async function handleNewProduct(e, title, description, price, qty, categoryId, photo){
        e.preventDefault();
        console.log(title, description, price, qty, categoryId)
        const res = await fetch(`http://localhost:2345/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                quantity: qty,
                categoryId: categoryId,
                photo: photo
            })
        })
        const data = await res.json();
        console.log('the data from the request to add a product is: ', data);
    }

    return (
        <form>
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
            {/* <div>
                <label>Product Ready To Sell?</label>
                <input
                    type='checkbox'
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}
                    id="isActive"
                    required
                />
            </div> */}
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
                <button onClick={(e) => handleNewProduct(e, title, description, price, qty, categoryId, photo)}>Add Product To Store</button>
        </form>
    )
}

export default NewProduct
