import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ParticleBackground from '../components/ui/ParticleBackground';


export default function AdminDashboard() {
  return (
    <div>
      <ParticleBackground />
      <header className="flex justify-between">
        <h1>CER</h1>
        <nav className="text-black flex gap-10">
          <Link to="/admin">Home</Link>
          <Link to="/admin/adminevent">Event</Link>
          <Link to="/admin/adminblog">blog</Link>
          <Link to="/admin/resouces">resource</Link>
        </nav>
      </header>
      <main>
        <section></section>
      </main>
      <footer>
          <Link to="/admin/faqs">FAQs</Link>
          {/* <Link to="/admin/resouces">resource</Link> */}
          {/* <Link to="/admin/resouces">resource</Link> */}
          {/* <Link to="/admin/resouces">resource</Link> */}
          {/* <Link to="/admin/resouces">resource</Link> */}
          {/* <Link to="/admin/resouces">resource</Link> */}

      </footer>
    </div>
  );
}
