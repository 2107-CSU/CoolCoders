import BASE_URL from './constant';

export const getProducts = async () => {
  try {
      const response = await fetch (`${BASE_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
    return data
  }
    catch (error) {
    console.log(error)
    throw error;
  }
}

