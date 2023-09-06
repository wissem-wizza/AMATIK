import Container from "../Container/Container";
// import { Outlet, NavLink } from "react-router-dom";
import Login from "../Login/Login";
// import { useState } from "react";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Container />
      {/* <Login /> */}
      {/* <header>
        <nav>
          <h1>Jobarouter</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="help">Help</NavLink>
        </nav>
      </header> */}

      {/* <main>
        <Outlet />
      </main> */}
    </div>
  );
}
