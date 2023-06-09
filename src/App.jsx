import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NewPost from "./components/blog/NewPost";
import Post from "./components/blog/Post";
import About from "./components/blog/About";
import PostDetails from "./components/blog/PostDetails";
import Missing from "./components/blog/Missing";
import { apiRequest } from "./components/apiRequest";
import "./App.css";
import RootLayout from "./components/blog/RootLayout";
import { useEffect, useState } from "react";
import Home from "./components/blog/Home";
import { format } from "date-fns";

function App() {
  const API_URL = "http://localhost:3500/posts";

  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fatchItems = (API_URL) => {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fatchItems(API_URL);
  }, []);

  // filter post
  let filterPost = [];
  if (posts?.length > 0) {
    filterPost = posts.filter((post) => {
      return post.title?.toLowerCase()?.includes(search?.toLowerCase());
    });
  }

  const handleDelete = (id) => {
    const postList = posts.filter((post) => post.id !== id);
    setPosts(postList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateTime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id: "", title: postTitle, dateTime, body: postBody };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    };

    const result = await apiRequest(API_URL, postOptions);
    setPosts(result);
    setPostTitle("");
    setPostBody("");
  };

  // route
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout search={search} setSearch={setSearch} />}
        errorElement={<Missing />}
      >
        <Route path="/" element={<Home />} />
        <Route
          path="posts"
          element={<Post posts={filterPost} isLoading={isLoading} />}
        />
        <Route
          path="posts/:id"
          element={<PostDetails posts={posts} handleDelete={handleDelete} />}
        />

        <Route
          path="post/new"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
