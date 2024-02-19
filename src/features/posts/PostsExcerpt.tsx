import { Box, Stack, Typography } from "@mui/joy";
import PostAuthor from "./PostAuthor";
import { Post } from "./postsSlice";

interface PostExcerptProps {
  post: Post;
}

const PostsExcerpt = ({ post }: PostExcerptProps) => {
  return (
    <Stack
      minWidth={500}
      sx={{
        borderRadius: 10,
        backgroundColor: "#edf6f9",
        boxShadow: "0 8px 12px -4px #006d77",
      }}
    >
      <Typography level="h2" px={2} py={2}>
        {post.title}
      </Typography>
      <Typography px={2} pb={2}>
        {post.body}
      </Typography>
      <Box px={2} pb={2}>
        <PostAuthor userId={post.userId} />
      </Box>
    </Stack>
  );
};

export default PostsExcerpt;
