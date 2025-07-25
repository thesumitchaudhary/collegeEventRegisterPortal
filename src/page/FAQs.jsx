import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/ui/navbar-menu";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useAuth } from "../context/AuthContext";

// import image,icon,svg and logo
import { Icons } from "../components/ui/icons";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { X } from "lucide-react";
import { Menu as MenuIcon } from "lucide-react";

// importing image
import headerImg from "../images/otherPageHeaderImage.avif";
import footerImage from "../images/footer-img.avif";
import logo from "../images/logo-college.png";

export default function FAQs() {
  const [menuActive, setMenuActive] = useState();
  const [faqs, setFaqs] = useState([]);
       const { user, role} = useAuth();

  useEffect(() => {
    const fetchFAQs = async () => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setFaqs(data);
    };
    fetchFAQs();
  }, []);

  return (
        <div className="relative w-full overflow-hidden text-white min-h-screen">
        <img
          className="absolute block -z-10 h-[10rem] object-center object-cover w-[100%]"
          src={headerImg}
          alt="header image"
        />
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
      <main className="bg-[#000] lg:h-[20rem]">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border rounded-lg shadow-sm">
                <button className="w-full text-left px-4 py-3 font-medium text-lg bg-gray-100">
                  {faq.question}
                </button>
                <div className="px-4 py-3 text-gray-700 bg-white border-t">
                  {faq.answer}
                </div>
              </div>
            ))}
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
                    to="/viewmyevents"
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
