/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

function NewPost({
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
  handleSubmit,
}) {
  return (
    <div style={{ marginLeft: "78px", width: "50%" }}>
      <h1>New Post</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label
          htmlFor=""
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            fontWeight: "450",
            marginBottom: "10px",
            fontSize: "21px",
          }}
        >
          Title
          <input
            id="postTitle"
            required
            value={postTitle}
            style={{ height: "25px" }}
            onChange={(e) => setPostTitle(e.target.value)}
            type="text"
            name="title"
          />
        </label>
        <label
          htmlFor=""
          style={{
            gap: "5px",
            display: "flex",
            flexDirection: "column",
            fontWeight: "450",
            marginBottom: "13px",
            fontSize: "21px",
          }}
        >
          Post
          <textarea
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
            name="body"
            id="postBody"
            cols="30"
            rows="10"
          ></textarea>
        </label>
        <button
          style={{
            width: "15%",
            height: "30px",
            backgroundColor: "transparent",
            fontWeight: "bold",
            border: "1px solid gray",
            fontSize: "15px",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPost;
