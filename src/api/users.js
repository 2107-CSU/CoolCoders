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

export async function editUser(token, userId, newEmail, newName, active) {
  try {
    const response = await fetch (`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        {
            email: newEmail,
            name: newName,
            active: active

        })
    })
    const data = await response.json();

    //if call was successful...
    if (data.id) {
      alert("Account successfully updated!");
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
    console.log("USER: ", data);

    return data
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}

export async function deleteUser(token, userId) {
  try {
    const response = await fetch (`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json();

    if (data) {
      alert("Account deactivated");
      return data
    }
  }
  catch (error) {
    console.log(error)
    throw error;
  }
}