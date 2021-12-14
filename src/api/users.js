import axios from "axios";
import BASE_URL from "./constant";

export async function loginUser(email, password) {
  try {
    const user = await axios.post(
      `${BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return user.data;
  } catch (err) {
    console.error(err);
  }
}
