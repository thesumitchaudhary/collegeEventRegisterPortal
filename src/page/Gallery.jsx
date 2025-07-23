import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import CursorShadow from "../components/ui/CursorShadow";
import { useAuth } from "../context/AuthContext";
import {
  HoveredLink,
  Menu,
  MenuItem,
} from "../components/ui/navbar-menu";
import InfoCard from "../components/ui/infoCard";

// Assets 
import headerImg from "../images/otherPageHeaderImage.avif";
import footerImage from "../images/footer-img.avif";
import logo from "../images/logo-college.png";
import { X, Menu as MenuIcon, Facebook, Instagram, Linkedin } from "lucide-react";

import { supabase } from "@/supabaseClient";

export const Gallery = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [active, setActive] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created-at", { ascending: false });

      if (error) {
        console.log(error);
        // console.error("Error fetching gallery:", error);
      } else {
        setGalleryItems(data);
      }
      setLoading(false);
    };

    fetchGallery();
  }, []);

  if (loading) return <p>Loading gallery...</p>;
  return (
    <div className="relative w-full overflow-hidden text-white min-h-screen">
      <div className="hidden lg:block">
        <CursorShadow />
      </div>

      {/* Background Image */}
      <img
        className="absolute w-[25rem] h-[57.5rem] 2xl:w-[120rem] -z-10 lg:h-[68rem] lg:w-[79.06rem]"
        src={headerImg}
        alt=""
      />

      {/* Header */}
      <header className="w-full shadow-sm top-0 z-10">
        <div className="max-w-8xl flex items-center justify-between px-6 py-4">
          <img src={logo} className="h-20 w-28" alt="website logo" />

          {/* Desktop Menu */}
          <nav className="lg:flex hidden gap-6 text-lg">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/resource">Resource</Link>
            <Link to="/blog">Blog</Link>
            {user && <p>Welcome, {user.user_metadata?.full_name}</p>}
            {user ? (
              <Button
                className="bg-white text-black font-bold px-4 py-1"
                onClick={async () => await supabase.auth.signOut()}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/signup" className="bg-white text-black font-bold px-4 py-1">
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile Menu */}
          <nav className="lg:hidden block">
            {menuActive && (
              <div className="bg-black absolute top-20 right-5 p-4 rounded-lg shadow-lg">
                <Menu setActive={setActive}>
                  {["Home", "Events", "Resource", "Blog"].map((item, i) => (
                    <MenuItem key={i} setActive={setActive} active={active} item={item}>
                      <HoveredLink to={`/${item.toLowerCase()}`}>{item}</HoveredLink>
                    </MenuItem>
                  ))}
                </Menu>
                <Link
                  to="/signup"
                  className="block text-black bg-white px-4 py-2 mt-2 rounded"
                >
                  Sign In
                </Link>
              </div>
            )}
            <Button size="icon" onClick={() => setMenuActive(!menuActive)}>
              {menuActive ? <X /> : <MenuIcon />}
            </Button>
          </nav>
        </div>
      </header>

      {/* Gallery Section */}
      <main className="p-6 bg-black">
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {galleryItems.map((item) => (
        <div key={item.id} className="border rounded-lg shadow p-4">
          <img
            src={item.imageurls}
            alt={item.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
        </div>
      ))}
    </div>
      </main>

      {/* Footer */}
      <footer className="relative mt-10 pt-10 text-white">
        <img
          className="absolute -z-10 h-full w-full object-cover"
          src={footerImage}
          alt=""
        />
        <div className="relative z-10 p-6 lg:w-[80rem] mx-auto">
          <h2 className="text-xl text-center">
            Enter your Email for getting Event Notification Timely
          </h2>
          <p className="text-center mt-2">
            Subscribe to our newsletter and get updates on college events,
            registration deadlines, and exclusive student opportunities.
          </p>
          <div className="flex flex-col items-center mt-6 gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="text-white bg-black px-4 py-2 w-72 rounded"
            />
            <button className="bg-blue-900 text-white px-6 py-2 rounded-2xl">
              Submit
            </button>
          </div>

          {/* Footer Links */}
          <div className="lg:flex justify-around mt-10">
            <div>
              <img src={logo} className="h-16 w-20" alt="logo" />
              <div className="flex gap-4 mt-4 text-white">
                <Facebook />
                <Linkedin />
                <Instagram />
              </div>
              <p className="text-xs mt-2">
                Developed by Chaudhary Sumit And Chaudhary Raj
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <p>© 2025 College Event Registration Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
