import axios from "axios";
import BASE_URL, { setHeaders } from "./constant";

export async function loginUser(email, password) {
  try {
    const headers = setHeaders();
    const user = await axios.post(
      `${BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: headers,
      }
    );
    return user.data;
  } catch (err) {
    console.error(err);
  }
}

export async function registerUser(email, password, name, userStatus) {
  try {
    const headers = setHeaders();
    const user = await axios.post(
      `${BASE_URL}/users/register`,
      {
        email: email,
        name: name,
        password: password,
        userStatus
      },
      {
        headers: headers,
      }
    );
    return user.data;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchUserObj(token) {
  if (!token) return {};

  try {
    const response = await fetch (`${BASE_URL}/users/userinfo/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();
    console.log("FETCH USER OBJ: ", data);
    return data
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}

export async function editUser(token, userId, email, name) {
  try {
    const response = await fetch (`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        {
            email: email,
            name: name
        })
    })
    const data = await response.json();

    //if call was successful...
    if (data.id) {
      console.log("UPDATED USER: ",data);
      alert("User successfully updated!");
      return data;
    }
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}

export async function getUser(userId) {
  try {
    const response = await fetch (`${BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log("USER RETRIEVED: ", data);

    return data
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}