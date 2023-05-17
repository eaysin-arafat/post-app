/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

function PostDetails({ posts, handleDelete }) {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const post = posts.find((post) => `${post.id}` === id);
  return (
    <div style={{ marginLeft: "78px", width: "71%" }}>
      {post && (
        <div>
          <h2 style={{ marginBottom: "-7px" }}>{post.title}</h2>
          <p style={{ marginBottom: "-10px" }}>{post.date}</p>
          <h4>{post.body}</h4>
          <button
            style={{
              marginTop: "-13px",
              color: "red",
              height: "30px",
              width: "70px",
            }}
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </div>
      )}
      {!post && (
        <Fragment>
          <h2>Page Not Found</h2>
          <p>
            Go to<Link to={"/"}>Homepage</Link>
          </p>
        </Fragment>
      )}
    </div>
  );
}

export default PostDetails;
