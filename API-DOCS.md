# AUTHENTICATION WITH JSON WEB TOKENS

When using the API, many calls are made in the context of a registered user. The API protects itself by requiring a token string passed in the Header for requests made in that context.

A sample request with an authorization token looks like this:

```js
fetch('https://deployedapi.com/api/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN_STRING_HERE'
  },
  body: JSON.stringify({ /* whatever things you need to send to the API */ })
})

```

# USER ENDPOINTS

# PRODUCTS ENDPOINTS

# ORDERS ENDPOINTS

## GET /api/orders
Returns a list of all orders in the database

### Request Parameters
No request parameters

### Return Parameters
(array of objects)
- id (number)
- userId (number)
- totalPrice (number)
- orderDate (string)
- orderStatus (string)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
[
    {
        "id": 1,
        "userId": 11,
        "totalPrice": 120,
        "orderDate": "2021-04-01T06:00:00.000Z",
        "orderStatus": "cart"
    },
    {
        "id": 2,
        "userId": 7,
        "totalPrice": 130,
        "orderDate": "2020-12-14T07:00:00.000Z",
        "orderStatus": "cart"
    },
    {
        "id": 3,
        "userId": 6,
        "totalPrice": 156,
        "orderDate": "2021-01-13T07:00:00.000Z",
        "orderStatus": "cart"
    }
]

```

## GET /api/orders/:userId/users (**)
Returns a list of orders for a given user id

### Request Parameters
No request parameters

### Return Parameters
(array of objects)
- id (number)
- userId (number)
- totalPrice (number)
- orderDate (string)
- orderStatus (string)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/orders/19/users`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
[
    {
        "id": 6,
        "userId": 19,
        "totalPrice": 106,
        "orderDate": "2020-12-09T07:00:00.000Z",
        "orderStatus": "in_transit"
    },
    {
        "id": 13,
        "userId": 19,
        "totalPrice": 28,
        "orderDate": "2021-06-15T06:00:00.000Z",
        "orderStatus": "cart"
    },
    {
        "id": 15,
        "userId": 19,
        "totalPrice": 125,
        "orderDate": "2021-10-25T06:00:00.000Z",
        "orderStatus": "processing"
    }
]

```

## GET /api/orders/:orderId
Returns an order with a matching id

### Request Parameters
No request parameters

### Return Parameters
- id (number)
- userId (number)
- totalPrice (number)
- orderDate (string)
- orderStatus (string)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/orders/13`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
{
    "id": 13,
    "userId": 19,
    "totalPrice": 28,
    "orderDate": "2021-06-15T06:00:00.000Z",
    "orderStatus": "cart"
}

```

## POST /api/orders/ (*)
Creates and returns an order. You must pass a valid token with this request

### Request Parameters
- user id (int, required): the id for the user placing the order
- total price (number, required): total price for the given order
- order date (string, required): date the order was submitted
- order status (string, optional): defaults to "cart". can also be set to wishlist depending on the desired behavior

### Return Parameters
- id (number): order id
- userId (number)
- totalPrice (number)
- orderDate (string)
- orderStatus (string)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify(
                {
                    userId: 31,
                    totalPrice: 48.50,
                    orderDate: '2021-12-01'
                })
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
{
    "id": 28,
    "userId": 31,
    "totalPrice": "48.5",
    "orderDate": "2021-12-01T07:00:00.000Z",
    "orderStatus": "cart"
}

```

## PATCH /api/orders/:orderId (**)
Updates and returns an order. You must pass a valid token with this request.
The user must be the owner of this order, or use an admin account

### Request Parameters
- order id (int, required)
- total price (number, optional): total price for the given order
- order date (string, optional): date the order was submitted
- order status (string, optional)

### Return Parameters
- id (number): order id
- userId (number)
- totalPrice (number)
- orderDate (string)
- orderStatus (string)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/orders/28`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify(
                {
                    totalPrice: 856.00,
                })
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
{
    "id": 28,
    "userId": 31,
    "totalPrice": "856",
    "orderDate": "2021-12-01T07:00:00.000Z",
    "orderStatus": "cart"
}

```


# PRODUCTS_ORDERS ENDPOINTS

## GET /api/products_orders (**)
Returns a product_order. You must pass a valid token with this request. The user must be the owner of this order, or use an admin account

### Request Parameters
No request parameters

### Return Parameters
- id (number)
- productId (number)
- quantity (number)
- productPrice (number)
- totalPrice (number)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/products_orders/8`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            }
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
{
    "id": 8,
    "productId": 1,
    "orderId": 26,
    "quantity": 1,
    "productPrice": "1000",
    "totalPrice": "1000"
}

```

## GET /api/products_orders/:orderId/orders (**)
Returns a list of products for a given order. You must pass a valid token with this request. The user must be the owner of this order, or use an admin account

### Request Parameters
No request parameters

### Return Parameters
(array of objects)
- id (number)
- productId (number)
- quantity (number)
- productPrice (number)
- totalPrice (number)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/products_orders/26/orders`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            }
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
[
    {
        "id": 8,
        "productId": 1,
        "orderId": 26,
        "quantity": 1,
        "productPrice": "1000",
        "totalPrice": "1000"
    },
    {
        "id": 9,
        "productId": 2,
        "orderId": 26,
        "quantity": 1,
        "productPrice": "1000000",
        "totalPrice": "1000000"
    },
    {
        "id": 10,
        "productId": 3,
        "orderId": 26,
        "quantity": 1,
        "productPrice": "250",
        "totalPrice": "250"
    }
]

```

## POST /api/products_orders (**)
Adds a product to an order. You must pass a valid token with this request. The user must be the owner of the order

### Request Parameters
- product id (int, required)
- order id (number, required)
- quantity (number, required)

### Return Parameters
- id (number)
- productId (number)
- quantity (number)
- productPrice (number)
- totalPrice (number)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/products_orders/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify(
                {
                    productId: 6,
                    orderId: 27,
                    quantity: 1
                })
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
{
    "id": 13,
    "productId": 6,
    "orderId": 27,
    "quantity": 1,
    "productPrice": "26",
    "totalPrice": "26"
}

```

## PATCH /api/products_orders/:productOrderId (**)
Edits a product order. You must pass a valid token with this request. The user must be the owner of the order

### Request Parameters
- quantity (number, required)

### Return Parameters
- id (number)
- productId (number)
- quantity (number)
- productPrice (number)
- totalPrice (number)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/products_orders/7`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            },
            body: JSON.stringify(
                {
                    quantity: 2
                })
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
{
    "id": 7,
    "productId": 1,
    "orderId": 26,
    "quantity": 2,
    "productPrice": "1000",
    "totalPrice": "2000"
}

```

## DELETE /api/products_orders/:productOrderId (**)
Hard deletes a product from an order. You must pass a valid token with this request. The user must be the owner of the order

### Request Parameters
No request parameters

### Return Parameters
- id (number)
- productId (number)
- quantity (number)
- productPrice (number)
- totalPrice (number)

### Sample Call
```js
try {
        const response = await fetch (`${BASEURL}/products_orders/7`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer TOKEN_STRING_HERE'
            }
        })
        const data = await response.json();

        return data
    }
    catch (error) {
        throw error;
    }

```

### Sample Response
```json
{
    "id": 7,
    "productId": 1,
    "orderId": 26,
    "quantity": 2,
    "productPrice": "1000",
    "totalPrice": "2000"
}

```