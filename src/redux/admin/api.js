import request from '../../utils/axios';

export const getCollection = () =>
  request
    .get(`/collections`, {
      params: {
        page: 1,
        size: 100
      }
    })
    .then((res) => res.data.data);

export const getCategories = () =>
  request
    .get(`/categories`, {
      params: {
        page: 1,
        size: 100
      }
    })
    .then((res) => res.data.data);

export const getTags = () =>
  request
    .get(`/tags`, {
      params: {
        page: 1,
        size: 100
      }
    })
    .then((res) => res.data.data);

export const getStores = () =>
  request
    .get(`/stores`, {
      params: {
        page: 1,
        size: 100
      }
    })
    .then((res) => res.data.data);
