import { useEffect } from "react";
import { useState } from "react";

function FatchData() {
  const API_URL = "https://jsonplaceholder.typicode.com/";

  const [reqType, setReqType] = useState("users");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}`);
        // if (!response.ok) throw Error("Did not receive expected data");
        const data = await response.json();
        setItems(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchItems();
  }, [reqType]);

  return (
    <>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "collumn",
          gap: "10px",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <button
          className={reqType === "users" ? "selected" : null}
          onClick={() => setReqType("users")}
          type="button"
        >
          USERS
        </button>
        <button
          className={reqType === "posts" ? "selected" : null}
          onClick={() => setReqType("posts")}
          type="button"
        >
          POSTS
        </button>
        <button
          className={reqType === "comments" ? "selected" : null}
          onClick={() => setReqType("comments")}
          type="button"
        >
          COMMENTS
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <div key={item.id}>
            {Object.entries(item).map(([key, value]) => (
              <div key={key}>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    border: "1px solid black",
                  }}
                >
                  {JSON.stringify(value)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </ul>
    </>
  );
}

export default FatchData;
