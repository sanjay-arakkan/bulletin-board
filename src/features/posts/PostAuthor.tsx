import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Typography } from "@mui/joy";

interface PostAuthorProps {
  userId: string | undefined;
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  return (
    <Typography level="body-sm">
      by <b>{author ? author.name : "Unknown author"}</b>
    </Typography>
  );
};

export default PostAuthor;
