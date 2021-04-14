import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createBlog = async (data) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, data, config);
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config);
  return response
}

const exportList = {
  getAll,
  createBlog,
  deleteBlog,
  setToken,
}
export default exportList;