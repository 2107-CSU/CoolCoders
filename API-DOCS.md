# AUTHENTICATION WITH JSON WEB TOKENS

- When using the API, many calls are made in the context of a registered user. The API protects itself by requiring a token string passed in the Header for requests made in that context.

* A sample request with an authorization token looks like this:

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

## GET /api/orders:
- Just returns a list of all orders in the database

### Request Parameters:
- No request parameters

### Return Parameters:
(array of object)
- id
- userId
- totalPrice
- orderDate
- orderStatus

### Sample Call:
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

### Sample Response:
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
    },
]

```
