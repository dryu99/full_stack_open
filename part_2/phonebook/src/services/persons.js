import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  console.log('fetching data...');
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (newObject) => {
  console.log('creating data...');
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);  
}

const update = (id, newObject) => {
  console.log(`updating data with id ${id}...`);
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
}

const remove = (id) => {
  console.log(`deleting data with id ${id}...`);
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
}

export default { getAll, create, update, remove };