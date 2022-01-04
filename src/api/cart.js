import axios from "axios";
import BASE_URL, { setHeaders } from "./constant";

export async function createCart(token) {
  try {
    const headers = setHeaders(token);
    if (token) {
      const response = await axios.post(
        `${BASE_URL}/orders`,
        {
          totalPrice: 0,
          orderDate: new Date(),
        },
        {
          headers: headers,
        }
      );
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function addItemToCart(token, productId, orderId, quantity) {
  try {
    const headers = setHeaders(token);
    if (token) {
      const response = await axios.post(
        `${BASE_URL}/products_orders`,
        {
          productId,
          orderId,
          quantity,
        },
        {
          headers: headers,
        }
      );
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function updateQuantity(token, productOrderId, quantity) {
  try {
    const headers = setHeaders(token);
    if (token) {
      const productOrder = await axios.patch(
        `${BASE_URL}/products_orders/${productOrderId}`,
        {
          quantity: quantity,
        },
        {
          headers: headers,
        }
      );
      return productOrder.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function deleteProductOrder(token, productOrderId) {
  try {
    const headers = setHeaders(token);
    console.log(headers);
    const deleted = await axios.delete(
      `${BASE_URL}/products_orders/${productOrderId}`,
      {
        headers: headers,
      }
    );
    return deleted.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductOrders(token, orderId) {
  try {
    const headers = setHeaders(token);
    const products = await axios.get(
      `${BASE_URL}/products_orders/${orderId}/orders`,
      {
        headers: headers,
      }
    );
    return products.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getOrder(token, orderId) {
  // this returns order data w/ associated product_orders
  let order;
  try {
    const headers = setHeaders(token);
    const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
      headers: headers,
    });
    [order] = response.data;
    return order;
  } catch (err) {
    console.error(err);
  }
}

export async function updateOrderUser(token, orderId) {
  try {
    const headers = setHeaders(token);
    const response = await axios.patch(
      `${BASE_URL}/orders/${orderId}/user`,
      {
        body: null,
      },
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchSingleProduct(token, productId) {
  try {
    const headers = setHeaders(token);
    const product = await axios.get(`${BASE_URL}/products/${productId}`, {
      headers: headers,
    });
    return product.data;
  } catch (err) {
    console.error(err);
  }
}
