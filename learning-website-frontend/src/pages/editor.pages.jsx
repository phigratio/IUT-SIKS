import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

const Editor = () => {
  const [editorState, setEditorState] = useState("editor");
  //We check whether there is a session or not using userContext.First destructure the context.

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  return access_token === null ? (
    <Navigate to="/signin" />
  ) : editorState == "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};

export default Editor;
