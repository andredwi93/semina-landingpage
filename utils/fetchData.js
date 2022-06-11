import instance from '../configs';

export async function getData(url, params, token) {
  return await instance.get(`${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function postData(url, payload, token) {
  return await instance.post(`${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}