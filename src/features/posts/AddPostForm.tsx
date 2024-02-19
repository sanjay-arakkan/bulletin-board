import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Option,
  Select,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { AppDispatch } from "../../app/store";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch<AppDispatch>();

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostHander = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        dispatch(addNewPost({ title, body: content, userId }));
        setTitle("");
        setContent("");
        setUserId("1");
      } catch (err) {
        console.error("Failed to save the post.", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <Option key={user.id} value={user.id}>
      {user.name}{" "}
    </Option>
  ));

  return (
    <form>
      <Stack gap={2} pt={8} minWidth={500}>
        <Typography level="h2">Add a New Post</Typography>
        <FormControl>
          <FormLabel>
            <b>Title</b>
          </FormLabel>
          <Input
            variant="soft"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            <b>User</b>
          </FormLabel>
          <Select
            placeholder="Choose one…"
            onChange={(e, newValue) => {
              const value = newValue ? String(newValue) : "";
              setUserId(value);
            }}
          >
            <Option value=""></Option>
            {userOptions}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>
            <b>Content</b>
          </FormLabel>
          <Textarea
            minRows={2}
            variant="soft"
            value={content}
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <Button onClick={onSavePostHander} variant="solid" disabled={!canSave}>
          Add Post
        </Button>
      </Stack>
    </form>
  );
};

export default AddPostForm;
