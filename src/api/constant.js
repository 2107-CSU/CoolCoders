const BASE_URL = "http://localhost:2345/api";

export function setHeaders(token) {
  if (token) {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  }
}

export default BASE_URL;
