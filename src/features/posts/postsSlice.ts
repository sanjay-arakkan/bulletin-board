import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface PostState {
  posts: Post[];
  status: "idle" | "loading" | "succceeded" | "failed";
  error: string | undefined;
}

export interface Post {
  id?: number | string;
  title: string;
  body: string;
  userId?: string;
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  error: undefined,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: Post) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succceeded";
        console.log(action.payload);
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const getAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
