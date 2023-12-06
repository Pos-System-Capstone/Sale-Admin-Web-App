import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { BlogState } from '../../@types/blog';

// ----------------------------------------------------------------------

const initialState: BlogState = {
  isLoading: false,
  error: false,
  posts: [],
  post: null,
  recentPosts: [],
  hasMore: true,
  index: 0,
  step: 11
};

const slice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET POST INFINITE
    getPostsInitial(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    createPostSuccess(state) {
      state.isLoading = false;
    },

    getMorePosts(state) {
      const setIndex = state.index + state.step;
      state.index = setIndex;
    },

    noHasMore(state) {
      state.hasMore = false;
    },

    // GET POST
    getPostSuccess(state, action) {
      state.isLoading = false;
      state.post = action.payload;
    },

    // GET RECENT POST
    getRecentPostsSuccess(state, action) {
      state.isLoading = false;
      state.recentPosts = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { getMorePosts } = slice.actions;

// Authentication function
async function authenticate() {
  try {
    const response = await axios.post('/auth/login', {
      username: 'deercoffeeadmin',
      password: '123456'
    });

    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function getAllPosts() {
  const { dispatch } = store;

  dispatch(slice.actions.startLoading());

  try {
    const accessToken = await authenticate();

    const postsRes = await axios.get('/blogposts', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    dispatch(slice.actions.getPostsSuccess(postsRes.data.items));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
}

// ----------------------------------------------------------------------

export function getPostsInitial(page: number, size: number) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = await authenticate();

      const postsRes = await axios.get('/blogposts', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: { page: 1, size }
      });

      // const response = await axios.get('/blog/blogposts', {
      //   params: { page: 1, size }
      // });
      const results = postsRes.data.items.length;
      const { maxLength } = postsRes.data;

      dispatch(slice.actions.getPostsInitial(postsRes.data.items));

      if (results >= maxLength) {
        dispatch(slice.actions.noHasMore());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPost(id: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = await authenticate();

      const resPost = await axios.get(`/blogposts/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      dispatch(slice.actions.getPostSuccess(resPost.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

// ----------------------------------------------------------------------

export function getRecentPosts(title: string) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title }
      });

      dispatch(slice.actions.getRecentPostsSuccess(response.data.recentPosts));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

///----------------------
export function postBlog(blogData: any) {
  return async (dispatch: any) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = await authenticate();

      await axios.post('/blogposts', blogData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      dispatch(slice.actions.createPostSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(true));
    }
  };
}
