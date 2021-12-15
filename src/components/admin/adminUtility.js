async function handleNewProduct(title, description, price, qty, categoryId, photo){
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
    await res.json();
}

async function handleUpdateProduct(productId, {title, description, price, qty, categoryId, photo}){
    const res = await fetch(`http://localhost:2345/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            price,
            quantity: qty,
            categoryId,
            photo
        })
    })
    await res.json();
}

async function handleDeleteProduct(productId){
    const res = await fetch(`http://localhost:2345/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await res.json();
}

module.exports = {
    handleNewProduct,
    handleUpdateProduct,
    handleDeleteProduct
}