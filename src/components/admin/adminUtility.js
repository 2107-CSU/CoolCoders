async function handleNewProduct(title, description, price, qty, categoryId, photo, token){
    const res = await fetch(`http://localhost:2345/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
    console.log('data from handleNewProduct = ', data)
}

async function handleUpdateProduct(productId, {title, description, price, qty, categoryId, photo}, token){
    const res = await fetch(`http://localhost:2345/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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

async function handleDeleteProduct(productId, token){
    const res = await fetch(`http://localhost:2345/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    await res.json();
}

const getProductById = async (productId, setSelectedProduct) => {
    try {
        const response = await fetch (`http://localhost:2345/api/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        const data = await response.json();
        console.log('data inside getProductById', data);
        setSelectedProduct(data)
    }
        catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    handleNewProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    getProductById
}