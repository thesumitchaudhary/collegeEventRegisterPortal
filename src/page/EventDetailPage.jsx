import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "../components/ui/button";
import Navbar from "../components/ui/navbar-menu";
import { useAuth } from "../context/AuthContext";

// import image,svg,icon
import blogHeader from "../images/blog-header.avif";
import footerImage from "../images/footer-img.avif";
import logo from "../images/logo-college.png";
import { X as cross } from "lucide-react";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Menu as MenuIcon } from "lucide-react";

function EventDetailPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState();
  const { user, role } = useAuth();

  // ✅ Fetch event by slug
  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching event:", error.message);
      } else {
        setEvent(data);
      }
    };

    fetchEvent();
  }, [slug]);

  // ✅ Check if user is already registered for this event
  useEffect(() => {
    const checkRegistration = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !event) return;

      const { data: existing, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", user.id)
        .eq("event_id", event.id)
        .maybeSingle();

      if (existing) {
        setAlreadyRegistered(true);
        setMessage("You are already registered for this event!");
      }
    };

    checkRegistration();
  }, [event]);

  // ✅ Handle Registration
  const register = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/signup");
      return;
    }

    // Check again before inserting (optional extra safety)
    const { data: existing, error: existingError } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user.id)
      .eq("event_id", event.id)
      .maybeSingle();

    if (existing) {
      setAlreadyRegistered(true);
      setMessage("You are already registered for this event!");
      return;
    }

    // Insert new registration
    const { error: insertError } = await supabase.from("registrations").insert([
      {
        user_id: user.id,
        event_id: event.id,
        date: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Registration error:", insertError.message);
      setMessage("Failed to register. Try again.");
    } else {
      setAlreadyRegistered(true);
      setMessage("Successfully registered!");
    }
  };

  if (!event) return <p className="p-4 text-white">Loading...</p>;

  return (
    <div className="relative w-full overflow-hidden text-white min-h-screen">
      <img
        className="absolute w-[25rem] h-[57.5rem] 2xl:w-[120rem] -z-10 lg:h-[68rem] lg:w-[79.06rem]"
        src={blogHeader}
        alt=""
      />
      {/* ------------------- Header ------------------- */}
      <header className="w-full shadow-sm top-0 z-10">
        <div className="max-w-8xl flex items-center justify-between px-6 py-4">
          <img src={logo} className="h-25 w-30" alt="website logo" />

          {/* this nav for laptop */}
          <Navbar />
          <div>
            <div>
              {user ? <p>welcome,{user.user_metadata.full_name}</p> : <p></p>}
            </div>
            {user ? (
              <Button
                className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[1.25rem] rounded-[.43rem] font-[700] tracking-[.06rem]"
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Link
                to="/signup"
                className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[1.25rem] rounded-[.43rem] font-[700] tracking-[.06rem]"
              >
                SignIn
              </Link>
            )}
          </div>
          {/* this nav for mobile */}
          <nav className="lg:hidden block">
            <div
              className={`max-w-2xl  mx-auto text-[10px]  ${
                menuActive ? "block" : "hidden"
              }`}
            >
              <Navbar />
            </div>
            <div>
              <Link
                to="/signup"
                className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[1.25rem] rounded-[.43rem] font-[700] tracking-[.06rem]"
              >
                SignIn
              </Link>
            </div>
            <Button size={"icon"} onClick={() => setMenuActive(true)}>
              <MenuIcon />
            </Button>
            <Button size={"icon"} onClick={() => setMenuActive(false)}>
              <X />
            </Button>
          </nav>
        </div>
      </header>

      {/* ------------------- Main Content ------------------- */}
      <main className="pt-20 flex flex-col items-center text-center px-4">
        <div className="p-4 bg-[#04060e] text-white min-h-screen">
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <p className="mt-2">{event.description}</p>
          <p className="mt-2">Date: {event.date}</p>
          <p className="mt-1">Location: {event.location}</p>

          <div className="mt-4">
            <Button
              className="bg-white text-black"
              onClick={register}
              disabled={alreadyRegistered}
            >
              {alreadyRegistered ? "Already Registered" : "Register"}
            </Button>

            {message && <p className="mt-2 text-sm">{message}</p>}
          </div>
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
}

export default EventDetailPage;
