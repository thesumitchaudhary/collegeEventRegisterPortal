import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <header className="flex justify-between">
        <h1>CER</h1>
        <nav className="text-black flex gap-10">
          <Link to="/admin">Home</Link>
          <Link to="/admin/adminblog">Event</Link>
          <Link to="/admin/adminevent">blog</Link>
          {/* <Link to="">resource</Link> */}
        </nav>
      </header>
      <main>
        <section></section>
      </main>
      <footer></footer>
    </div>
  );
}
