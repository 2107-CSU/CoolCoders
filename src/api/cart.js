import axios from "axios";
import BASE_URL, { setHeaders } from "./constant";
import jwt from "jsonwebtoken";
const { verify } = jwt;

export async function createCart(token) {
  try {
    const headers = setHeaders(token);
    if (token) {
      //   const user = verify(token, process.env.REACT_APP_JWT_SECRET);
      const response = await axios.post(
        `${BASE_URL}/orders`,
        {
          totalPrice: 0,
          orderDate: Date(),
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

export async function addItemToCart(token, productId) {
  try {
    const headers = setHeaders(token);
    if (token) {
      const user = verify(token, process.env.REACT_APP_JWT_SECRET);
    }
  } catch (err) {
    console.error(err);
  }
}
