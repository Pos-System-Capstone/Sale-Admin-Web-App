/* eslint-disable prettier/prettier */
import { TCollection } from 'types/collection';
import { BaseReponse } from 'types/response';
import request from 'utils/axios';
import { generateAPIWithPaging } from './utils';

import { TBlog, TBlogCreate } from 'types/blog';

const getBlogs = (params?: any) => {
    return request.get<BaseReponse<TBlog>>(`/blogposts`, {
        params
    });
};
const getBlogById = (id: string, params?: any) => {
    return request.get<TBlog>(`/blogposts/${id}`, { params });
};
const createNewBlog = (id: string, values: TBlogCreate) => request.post<any>(`/blogposts`, values);

const blogApi = {
    ...generateAPIWithPaging<TCollection>('collections'),
    getBlogById,
    getBlogs,
    createNewBlog
};

export default blogApi;
