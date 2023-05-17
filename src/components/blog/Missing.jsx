import { Fragment } from "react";
import { Link } from "react-router-dom";

function Missing() {
  return (
    <Fragment>
      <div
        style={{
          width: "71%",
          marginLeft: "75px",
        }}
      >
        {/* <h2>{postError.message}</h2> */}
        <h3>
          Back to the <Link to="/">Homepage</Link>
        </h3>
      </div>
    </Fragment>
  );
}

export default Missing;
