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

        console.log("all routines: ", data);
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

        console.log("all routines: ", data);
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

## GET /api/orders/:orderId (**)
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

        console.log("all routines: ", data);
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

        console.log("all routines: ", data);
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

        console.log("all routines: ", data);
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