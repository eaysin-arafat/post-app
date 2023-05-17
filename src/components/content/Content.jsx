import { useState, useEffect } from "react";
import apiRequest from "../apiRequest";
function Content() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fatchError, setFatchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fatchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFatchError(null);
      } catch (err) {
        console.log(err.message);
        setFatchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fatchItems())();
    }, 2000);
  }, []);

  const searchItems = items.filter((item) =>
    item.item.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFatchError(result);
  };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFatchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFatchError(result);
  };
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          role="searchbox"
          id="search"
          placeholder="Search Items"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <form className="add-form" action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          autoFocus
          id="addItem"
          placeholder="Add Item"
          required
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">ADD</button>
      </form>
      {items.length ? (
        !fatchError &&
        !isLoading && (
          <ul>
            {searchItems.map((item) => (
              <li key={item.id} className="list">
                <input
                  onChange={() => handleCheck(item.id)}
                  type="checkbox"
                  checked={item.checked}
                />
                <label>{item.item}</label>
                <button onClick={() => handleDelete(item.id)}>DELETE</button>
              </li>
            ))}
          </ul>
        )
      ) : (
        <h3>Your List is EMPTY</h3>
      )}

      {isLoading && <p style={{ fontWeight: "bold" }}>Loading Items...</p>}

      {fatchError && <p style={{ color: "red" }}>{`Error: ${fatchError}`}</p>}

      <p>
        {items.length} List {items.length === 1 ? "item" : "items"}
      </p>
    </>
  );
}

export default Content;
