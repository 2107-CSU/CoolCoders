# AUTHENTICATION WITH JSON WEB TOKENS

When using the API, many calls are made in the context of a registered user. The API protects itself by requiring a token string passed in the Header for requests made in that context.

A sample request with an authorization token looks like this:

```js
fetch("https://deployedapi.com/api/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer TOKEN_STRING_HERE",
  },
  body: JSON.stringify({
    /* whatever things you need to send to the API */
  }),
});
```

# USER ENDPOINTS

## POST /api/register/guest

Creates a guest user

### Request Parameters

email (string, required): the email of user continuing as guest

### Return Parameters

(object)
message: "You may now continue as guest",
user: user object (email: guest-[email], name: guest, userStatus: 'guest', active: false),
token: JSON web token

### Sample Call

```js
try {
  const response = await fetch(`${BASEURL}/users/register/guest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
} catch (error) {
  throw error;
}
```

### Sample Response

```json
{
  "message": "You may now continue as a guest.",
  "user": {
    "id": 100,
    "email": "guest-example@example.com",
    "name": "Guest",
    "userStatus": "guest",
    "active": false
  },
  "token": "adjhalwehgalweuhgaliehgalkjdhglkajsd"
}
```

## PATCH /api/register/guest

Turns a guest user into a full account

### Request parameters

userId (int, required): guest user account ID
name (string, required): user's full name
password (string, required): user's desired password

### Return Parameters

(object)
message: "Thank you for signing up!"
user: updated user object
token: JSON web token

### Sample Call

```js
try {
  const response = await fetch(`${BASEURL}/users/register/guest`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN HERE",
    },
    body: JSON.stringify({
      userId: 31,
      name: "Alex Jones",
      password: "p@ssw0rd",
    }),
  });
  const data = await response.json();

  return data;
} catch (error) {
  throw error;
}
```

### Sample Response

```json
{
  "message": "Thanks for signing up!",
  "user": {
    "id": 31,
    "email": "example@example.com",
    "name": "Alex Jones",
    "userStatus": "user",
    "active": true
  },
  "token": "adjhalwehgalweuhgaliehgalkjdhglkajsd"
}
```

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
  const response = await fetch(`${BASEURL}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
} catch (error) {
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

## GET /api/orders/:userId/users (\*\*)

Returns a list of orders for a given user id. Includes their products

### Request Parameters

No request parameters

### Return Parameters

(array of objects)

- id (number)
- userId (number)
- totalPrice (number)
- orderDate (string)
- orderStatus (string)
- products (array of objects)

### Sample Call

```js
try {
  const response = await fetch(`${BASEURL}/orders/31/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
} catch (error) {
  throw error;
}
```

### Sample Response

```json
[
  {
    "id": 26,
    "userId": 31,
    "totalPrice": "1001000",
    "orderDate": "2021-12-01T07:00:00.000Z",
    "orderStatus": "cart",
    "products": [
      {
        "id": 1,
        "orderId": 26,
        "productId": 1,
        "title": "Greatsword",
        "description": "A really great sword.",
        "productPrice": "1000",
        "quantity": 1,
        "totalPrice": "1000"
      },
      {
        "id": 2,
        "orderId": 26,
        "productId": 2,
        "title": "Power Armor",
        "description": "It makes you feel, like, really powerful, dude.",
        "productPrice": "1000000",
        "quantity": 1,
        "totalPrice": "1000000"
      }
    ]
  }
]
```

## GET /api/orders/:orderId

Returns an order with a matching id

### Request Parameters

No request parameters

### Return Parameters

(array of object)

- id (number)
- userId (number)
- totalPrice (number)
- orderDate (string)
- orderStatus (string)
- products (array of objects)

### Sample Call

```js
try {
  const response = await fetch(`${BASEURL}/orders/27`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data;
} catch (error) {
  throw error;
}
```

### Sample Response

```json
[
  {
    "id": 27,
    "userId": 31,
    "totalPrice": "500",
    "orderDate": "2021-12-13T07:00:00.000Z",
    "orderStatus": "cart",
    "products": [
      {
        "id": 3,
        "orderId": 27,
        "productId": 3,
        "title": "Black Dream",
        "description": "Increases damage of Dark Magic attacks",
        "productPrice": "250",
        "quantity": 2,
        "totalPrice": "500"
      }
    ]
  }
]
```

## POST /api/orders/ (\*)

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
  const response = await fetch(`${BASEURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN_STRING_HERE",
    },
    body: JSON.stringify({
      userId: 31,
      totalPrice: 48.5,
      orderDate: "2021-12-01",
    }),
  });
  const data = await response.json();

  return data;
} catch (error) {
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

## PATCH /api/orders/:orderId (\*\*)

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
  const response = await fetch(`${BASEURL}/orders/28`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN_STRING_HERE",
    },
    body: JSON.stringify({
      totalPrice: 856.0,
    }),
  });
  const data = await response.json();

  return data;
} catch (error) {
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

## GET /api/products_orders (\*\*)

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
  const response = await fetch(`${BASEURL}/products_orders/8`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN_STRING_HERE",
    },
  });
  const data = await response.json();

  return data;
} catch (error) {
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

## GET /api/products_orders/:orderId/orders (\*\*)

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
  const response = await fetch(`${BASEURL}/products_orders/26/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN_STRING_HERE",
    },
  });
  const data = await response.json();

  return data;
} catch (error) {
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

## POST /api/products_orders (\*\*)

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
  const response = await fetch(`${BASEURL}/products_orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN_STRING_HERE",
    },
    body: JSON.stringify({
      productId: 6,
      orderId: 27,
      quantity: 1,
    }),
  });
  const data = await response.json();

  return data;
} catch (error) {
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

## PATCH /api/products_orders/:productOrderId (\*\*)

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
  const response = await fetch(`${BASEURL}/products_orders/7`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN_STRING_HERE",
    },
    body: JSON.stringify({
      quantity: 2,
    }),
  });
  const data = await response.json();

  return data;
} catch (error) {
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

## DELETE /api/products_orders/:productOrderId (\*\*)

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
  const response = await fetch(`${BASEURL}/products_orders/7`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN_STRING_HERE",
    },
  });
  const data = await response.json();

  return data;
} catch (error) {
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
