import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/ui/navbar-menu";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";
import { Textarea } from "../components/ui/textarea";
import { supabase } from "@/supabaseClient";

// import image,svg,icon
import blogHeader from "../images/blog-header.avif";
import footerImage from "../images/footer-img.avif";
import logo from "../images/logo-college.png";
import { X as cross } from "lucide-react";
import { Menu as MenuIcon } from "lucide-react";
import { Icons } from "../components/ui/icons";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { X } from "lucide-react";


export default function PrivacyPolicy() {
  const [menuActive, setMenuActive] = useState();
  const [active, setActive] = useState();

   const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
      const { user, role } = useAuth();
  
    useEffect(() => {
      const fetchAbout = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("privacypolicy")
          .select("*")
          .single();
  
        if (error) {
          console.error("Error fetching aboutus:", error.message);
          setErrorMsg("Could not fetch About Us content.");
        } else {
          setContent(data.content);
        }
  
        setLoading(false);
      };
  
      fetchAbout();
    }, []);
  

  return (
       <div className="relative w-full text-white min-h-screen xs:w-[370px] lg:bg-transparent">
          <img
            className="absolute w-[1265px] h-[1400px] -z-10 xs:w-[370px] xs:bg-[#ff00ff]"
            src={blogHeader}
            alt=""
          />
          <header className="w-full shadow-sm top-0 z-10">
            <div className="max-w-8xl flex items-center justify-between px-6 py-4">
              <img src={logo} className="h-25 w-30" alt="website logo" />
    
              {/* this nav for laptop */}
              <Navbar />
              <div>
                <div>
                  {user ? <p>welcome, {user.user_metadata.full_name}</p> : null}
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
                  className={`max-w-2xl  mx-auto text-[10px] ${
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
    
          <main className="min-h-[900px] bg-black p-6">
             <div className="max-w-3xl mx-auto  p-6  rounded-xl shadow space-y-4">
          <h2 className="text-2xl text-white font-bold">PRIVACY POLICY</h2>

          {loading ? (
            <p>Loading...</p>
          ) : errorMsg ? (
            <p className="text-red-500">{errorMsg}</p>
          ) : (
            <p className="text-gray-100 whitespace-pre-wrap ">{content}</p>
          )}
        </div>
        {/* <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

          <p className="mb-4">
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our College Event Registration
            Portal.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            - Name, Email Address, Phone Number, College Details <br />
            - Event Registration Information <br />- Feedback and Communications
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">
            - To register you for events <br />
            - To send confirmation emails and updates <br />- To improve our
            portal and services
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            3. Information Sharing
          </h2>
          <p className="mb-4">
            We do not sell or rent your personal data. We may share data only
            with college authorities or organizing committees for event
            purposes.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">4. Data Security</h2>
          <p className="mb-4">
            We use appropriate security measures to protect your data including
            authentication, encryption, and database rules.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">5. Your Rights</h2>
          <p className="mb-4">
            You can contact us anytime to update or delete your data by emailing
            the event organizing team.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            6. Changes to This Policy
          </h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. Please check
            this page periodically for any changes.
          </p>

          <p className="text-sm text-gray-500">Last Updated: July 1, 2025</p>
        </div> */}
         </main>
   
    {/* ------------------- Footer (optional) ------------------- */}
   
     
           <footer className="h-[56.25rem] lg:h-[47rem]">
             <div className="absolute -z-10">
               <img
                 className="h-[60rem] w-[25rem] lg:h-[50rem] lg:w-[79.06rem]"
                 src={footerImage}
                 alt=""
               />
             </div>
             <div className="z-10">
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
                   <p className="text-white p-[.75rem] text-[10px]">
                     Developed by Chaudhary Sumit And Chaudhary Raj
                   </p>
                 </div>
                 <div className="flex gap-10 mt-10">
                   <div>
                     <h4 className="text-base mb-5 text-white">Main Pages</h4>
                     <div className="flex flex-col gap-3">
                       <Link to="/" className="text-white text-lg no-underline">
                         Home
                       </Link>
                       <Link to="/feature" className="text-white text-lg no-underline">
                         Features
                       </Link>
                       <Link to="/gallery" className="text-white text-lg no-underline">
                         Gallery
                       </Link>
                       <Link to="/contact" className="text-white text-lg no-underline">
                         Contact Us
                       </Link>
                     </div>
                   </div>
                   <div>
                     <h4 className="text-base mb-5 text-white">Information</h4>
                     <div className="flex flex-col gap-5">
                       <Link to="/about" className="text-white text-lg no-underline">
                         About
                       </Link>
                       <Link to="/faq" className="text-white text-lg no-underline">
                         FAQ
                       </Link>
                       <Link to="/policy" className="text-white text-lg no-underline">
                         Privacy Policy
                       </Link>
                     </div>
                   </div>
                   <div>
                     <h4 className="text-base mb-5 text-white">Utilities</h4>
                     <div className="flex flex-col gap-5">
                       <Link to="/eventschedules" className="text-white text-lg no-underline">
                         Event Schedule
                       </Link>
                       <Link to="/certificate" className="text-white text-lg no-underline">
                         Download Certificate
                       </Link>
                       <Link to="/feedback" className="text-white text-lg no-underline">
                         Feedback
                       </Link>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="mt-5 flex lg:justify-center lg:mt-[4rem] gap-10">
                 <p className="text-white">
                   2025 College Event Registration Portal. All rights reserved.
                 </p>
               </div>
             </div>
           </footer>
         </div>
  );
}
