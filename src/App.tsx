import { Stack } from "@mui/joy";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <AddPostForm />
      <PostsList />
    </Stack>
  );
}

export default App;
