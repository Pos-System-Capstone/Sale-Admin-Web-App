import { TProductCategory } from 'types/promotion/productCategory';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';

const request = axiosInstances.promotion;

const getCategory = (params?: any) =>
  request.get<BaseReponse<TProductCategory>>(`/product-category`, { params });

const getCategoryById = (id: string | undefined) =>
  request.get<TProductCategory>(`/product-category/${id}`);

const updateCategory = (id: string | undefined, data?: TProductCategory) =>
  request.put<TProductCategory>(`/product-category/${id}/ `, data);
console.log(updateCategory);

const addCategoriesToProductCategory = (body: TProductCategory) =>
  request.post<TProductCategory>(`product-category`, body);
const productCategory = {
  getCategory,
  getCategoryById,
  updateCategory,
  addCategoriesToProductCategory
};

export default productCategory;
