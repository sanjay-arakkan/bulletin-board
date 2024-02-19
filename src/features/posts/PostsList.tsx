import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Typography } from "@mui/joy";
import {
  fetchPosts,
  getAllPosts,
  getPostsError,
  getPostsStatus,
} from "./postsSlice";
import { AppDispatch } from "../../app/store";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(getAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <Typography level="body-lg">Loading...</Typography>;
  } else if (postsStatus === "succceeded") {
    const orderedPosts = posts.slice().reverse();
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "failed") {
    content = <Typography level="body-lg">{postsError}</Typography>;
  }

  return (
    <Stack gap={2} my={6} width={500}>
      <Typography level="h2">Posts</Typography>
      {content}
    </Stack>
  );
};

export default PostsList;
