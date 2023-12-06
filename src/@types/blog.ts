import { FormikProps } from 'formik';

// ----------------------------------------------------------------------

export type NewPostFormValues = {
  title: string;
  description: string;
  content: string;
  cover: File | any;
  tags: String[];
  publish: boolean;
  comments: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: String[];
};

export type PostBlogFormValues = {
  title: string;
  blogContent: string;
  image: File | any;
  isDialog: boolean;
  status: string;
  metaData: string;
  priority: number;
  brandId: string;
};

export type NewPostViewFormikInstance = FormikProps<PostBlogFormValues>;

export type BlogState = {
  isLoading: boolean;
  error: boolean;
  posts: IBlog[];
  post: Post | null;
  recentPosts: Post[];
  hasMore: boolean;
  index: number;
  step: number;
};

export type BlogUser = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type ReplyComment = {
  id: string;
  userId: string;
  message: string;
  postedAt: Date;
  tagUser?: string;
};

export type PostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date;
  users: BlogUser[];
  replyComment: ReplyComment[];
};

export type Post = {
  id: string;
  cover: string;
  title: string;
  description: string;
  createdAt: Date;
  view: number;
  comment: number;
  share: number;
  favorite: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  tags: string[];
  body: string;
  favoritePerson: {
    name: string;
    avatarUrl: string;
  }[];
  comments: PostComment[];
};

export interface IBlog {
  blogContent?: string;
  id?: string;
  brandId?: string;
  image?: string;
  isDialog?: string;
  metaData?: string;
  priority?: number;
  status?: string;
  title?: string;
}
