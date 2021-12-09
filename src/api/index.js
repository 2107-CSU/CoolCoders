import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

export const getProducts = async () => {
  try {
      await axios.get('/api/products')
  }
  catch (error) {
    console.error(error);
  }
};