import React, { useState, useEffect } from 'react'
import { handleUpdateProduct, getProductById } from './adminUtility';

const UpdateProduct = ({ history, token, match }) => {

    const [productId, setProductId] = useState(match.params.productId)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [photo, setPhoto] = useState('');
    const [selectedProduct, setSelectedProduct] = useState({});


    async function updateProduct(e, productId, {title, description, price, quantity, categoryId, photo}){
        e.preventDefault();
        await handleUpdateProduct(productId, {title, description, price, quantity, categoryId, photo}, token)
        history.push('/updateproduct')
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
            {selectedProduct ? (
                <>
                <h2 className='singleProductTitle'>Update {selectedProduct.title? selectedProduct.title : 'a product'} Here</h2>
                <form className='singleProductForm'>
                <div className='singleProductDetail'>
                    <label className='singleProductLabel'>Updated Title:</label>
                    <input
                        type="text"
                        defaultValue={title}
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
                        defaultValue={description}
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
                        defaultValue={selectedProduct ? selectedProduct.price : 'loading price'}
                        onChange={(e) => setPrice(e.target.value)}
                        id="price"
                        placeholder="update product price"
                        className="singleProductInput"
                    />
                </div>
                <div className='singleProductDetail'>
                    <label className='singleProductLabel'>Updated quantity:</label>
                    <input
                        type="number"
                        defaultValue={selectedProduct ? selectedProduct.quantity : 'loading quantity'}
                        onChange={(e) => setQty(e.target.value)}
                        id="quantity"
                        placeholder="update product quantity"
                        className="singleProductInput"
                    />
                </div>
                <div className='singleProductDetail'>
                    <label className='singleProductLabel'>Updated categoryId:</label>
                    <input
                        type="number"
                        defaultValue={selectedProduct ? selectedProduct.categoryId : 'loading categoryId'}
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
                        defaultValue={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        id="photo"
                        placeholder="update photo url here"
                        className="singleProductInput"
                    />
                </div>
                <button className='singleProductBtn' onClick={(e) => updateProduct(e, productId, {title, description, price, quantity, categoryId, photo})}>Update Product</button>
                </form>
                </>
            ) : <h3>Loading Selected Product...</h3>}
        </>
    )
}

export default UpdateProduct
