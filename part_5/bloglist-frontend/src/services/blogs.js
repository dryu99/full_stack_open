import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token }
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (blog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog);
  return response.data;
};

const remove = async (id, token) => {
  const config = {
    headers: { Authorization: 'bearer ' + token }
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default { getAll, create, update, remove };