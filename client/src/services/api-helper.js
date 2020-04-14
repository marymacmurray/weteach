const axios = require('axios');

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://weteach-marymacmurray.herokuapp.com/' : 'http://localhost:3000'
});

// ====================================
// ============= Auth =================
// ====================================

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', { auth: loginData });
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data.user;
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}


export const removeToken = () => {
  api.defaults.headers.common.authorization = null;
}


// ====================================
// ============= Resources ================
// ====================================

export const readAllResources = async () => {
  const resp = await api.get('/resources');
  return resp.data;
}

export const readOneResource = async (id) => {
  const resp = await api.get(`/resources/${id}`);
  return resp.data;
}

export const createResource = async (resourceData, id) => {
  const formdata = resourceData
  formdata.user_id = id
  const resp = await api.post('/resources', {resource: formdata});
  return resp.data;
}

export const updateResource = async (resourceData, id) => {
  const resp = await api.put(`/resources/${id}`, {resource: resourceData});
  return resp.data;
}

export const destroyResource = async (id) => {
  const resp = await api.delete(`/resources/${id}`);
  return resp.data;
}

// ====================================
// ============= Categories ==============
// ====================================

export const readAllCategories = async () => {
  const resp = await api.get('/categories');
  return resp.data;
}

export const addCategory = async (categoryId, id) => {
  const resp = await api.get(`/categories/${categoryId}/resources/${id}`);
  return resp.data
}