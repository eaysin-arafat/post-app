/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import nav from "./Nav.module.css";

function Nav({ search, setSearch }) {
  return (
    <>
      <div className={nav.navStyle}>
        <div style={{ marginBottom: "5px" }}>
          <input
            style={{ height: "30px", width: "180px", padding: "0 10px" }}
            id="search"
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <NavLink
          className={nav.link}
          to="posts"
          style={({ isActive }) => ({
            color: isActive ? "gray" : "black",
          })}
        >
          Home
        </NavLink>
        <NavLink
          className={nav.link}
          to="post/new"
          style={({ isActive }) => ({
            color: isActive ? "gray" : "black",
          })}
        >
          New Post
        </NavLink>
        <NavLink
          className={nav.link}
          to="about"
          style={({ isActive }) => ({
            color: isActive ? "gray" : "black",
          })}
        >
          About
        </NavLink>
      </div>
    </>
  );
}

export default Nav;
