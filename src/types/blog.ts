/* eslint-disable prettier/prettier */
export interface TBlog {
    id: string;
    title: string;
    blogContent: string;
    brandId: string;
    image: string;
    isDialog: boolean;
    metaData: string;
    status: string;
    priority: number;
}

export interface TBlogCreate {
    title: string;
    blogContent: string;
    image: string | null;
    isDialog: boolean;
    metaData: string;
    priority: number;
}
