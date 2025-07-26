import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import CursorShadow from "../components/ui/CursorShadow";
import { useAuth } from "../context/AuthContext";
// import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import InfoCard from "../components/ui/infoCard";

// Assets
import headerImg from "../images/otherPageHeaderImage.avif";
import footerImage from "../images/footer-img.avif";
import logo from "../images/logo-college.png";
import {
  X,
  Menu as MenuIcon,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

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
              <Link
                to="/signup"
                className="bg-white text-black font-bold px-4 py-1"
              >
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
                    <MenuItem
                      key={i}
                      setActive={setActive}
                      active={active}
                      item={item}
                    >
                      <HoveredLink to={`/${item.toLowerCase()}`}>
                        {item}
                      </HoveredLink>
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

      {/* ------------------- Footer (optional) ------------------- */}

      <footer className="h-[56.25rem] lg:h-[47rem]">
        <div className="absolute -z-10">
          <img
            className="h-[60rem] w-[25rem] lg:h-[50rem] lg:w-[79.06rem] "
            src={footerImage}
            alt=""
          />
        </div>
        <div className=" z-10">
          <div className="p-[1rem] lg:w-[80rem]">
            <h2 className="text-xl lg:mx-auto text-center lg:w-[20rem]">
              Enter your Email for getting Event Notification Timely
            </h2>
            <p className="mt-5 lg:mx-auto lg:w-[50rem] text-center">
              Subscribe to our newsletter and get updates on upcoming college
              events, registration deadlines, and exclusive student
              opportunities—delivered straight to your inbox.
            </p>
            <div className="lg:mt-20 text-center mx-[25rem]">
              <div className="flex flex-col lg:flex-row gap-1">
                <input
                  type="text"
                  className="text-white bg-black px-20 py-[.25rem] w-[20rem]"
                  placeholder="Enter email"
                />
                <button className="w-[5.9rem] mx-[1rem] py-[10px] rounded-2xl bg-blue-900">
                  Submit
                </button>
              </div>
              <div className="mt-5 flex flex-col lg:flex-row lg:justify-between gap-2 text-center text-white">
                <p>No credit card is required</p>
                <p>Early access & Special offers</p>
              </div>
            </div>
          </div>
          <div className="mx-30 lg:flex lg:justify-around lg:mt-[5rem]">
            <div>
              <img src={logo} className="h-25 w-30" alt="website logo" />
              <div className="flex gap-5 mt-5">
                <Facebook />
                <Linkedin />
                <X />
                <Instagram />
              </div>
              <p className="text-whie p-[.75rem] text-[10px]">
                Developed by Chaudhary Sumit And Chaudhary Raj
              </p>
            </div>
            <div className="flex gap-10 mt-10">
              <div>
                <h4 className="text-base mb-5 text-white">Main mages</h4>
                <div className="flex flex-col gap-3">
                  <Link to="/" className="text-white text-lg  no-underline">
                    Home
                  </Link>
                  <Link
                    to="/feature"
                    className="text-white text-lg  no-underline"
                  >
                    Features
                  </Link>
                  <Link
                    to="/gallery"
                    className="text-white text-lg  no-underline"
                  >
                    Gallery
                  </Link>
                  <Link
                    to="/contact"
                    className="text-white text-lg  no-underline"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-base mb-5 text-white">Information</h4>
                <div className="flex flex-col gap-5">
                  <Link
                    to="/about"
                    className="text-white text-lg  no-underline"
                  >
                    About
                  </Link>
                  <Link to="/faq" className="text-white text-lg  no-underline">
                    FAQ
                  </Link>
                  <Link
                    to="/policy"
                    className="text-white text-lg  no-underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-base mb-5 text-white">Utilities</h4>
                <div className="flex flex-col gap-5">
                  <Link
                    to="/eventschedules"
                    className="text-white text-lg  no-underline"
                  >
                    Event Schedule
                  </Link>
                  <Link
                    to="/certificate"
                    className="text-white text-lg  no-underline"
                  >
                    Download Certificate
                  </Link>
                  <Link
                    to="/feedback"
                    className="text-white text-lg  no-underline"
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:justify-center lg:mt-[4rem] gap-10">
            <p className="text-white ">
              2025 College Event Registration Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
