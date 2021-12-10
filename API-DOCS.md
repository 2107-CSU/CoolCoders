# AUTHENTICATION WITH JSON WEB TOKENS

When using the API, many calls are made in the context of a registered user. The API protects itself by requiring a token string passed in the Header for requests made in that context.

A sample request with an authorization token looks like this:

```
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
- id
- userId
- totalPrice
- orderDate
- orderStatus

### Sample Call
```
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
```
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

## GET /api/order/:userId (**)
Returns a list of orders for a given user id

### Request Parameters
No request parameters

### Return Parameters
(array of objects)
- id
- userId
- totalPrice
- orderDate
- orderStatus

### Sample Call
```
try {
        const response = await fetch (`${BASEURL}/orders/19`, {
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
```
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