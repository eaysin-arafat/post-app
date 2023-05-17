/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Post({ posts, isLoading }) {
  return (
    <div
      style={{
        width: "71%",
        marginLeft: "75px",
        borderBottom: "1px solid gray",
      }}
    >
      {isLoading || posts.length ? (
        posts.map((post) => (
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to={`${post.id}`}
            key={post.id}
          >
            <h2
              style={{
                marginBottom: "-7px",
                marginTop: "13px",
              }}
            >
              {post.title}
            </h2>
            <p style={{ marginBottom: "-10px" }}>{post.date}</p>
            <h4>
              {post.body.length <= 25
                ? post.body
                : `${post.body.slice(0, 50)}...`}
            </h4>
          </Link>
        ))
      ) : (
        <h5>No Posts to Display</h5>
      )}

      {isLoading && <h3>Loading...</h3>}
    </div>
  );
}

export default Post;
