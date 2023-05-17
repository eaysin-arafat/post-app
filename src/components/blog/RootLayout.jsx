/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function RootLayout({ search, setSearch }) {
  return (
    <div>
      <Nav search={search} setSearch={setSearch} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
