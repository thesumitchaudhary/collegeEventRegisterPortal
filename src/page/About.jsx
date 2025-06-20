import CursorShadow from "../components/ui/CursorShadow";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function About(){
   return( 
    <div className="bg-[#04060e]">
    <CursorShadow />
    <header className="w-full shadow-sm top-0 z-10">
        <div className="max-w-8xl flex items-center justify-between px-6 py-4">
          <h1 className=" text-white text-4xl mt-[20px] ">C E R</h1>
          <nav className="flex gap-[20px] mt-[20px] text-sm font-medium">
            <Link to="/" className="text-white text-lg  no-underline">
              Home
            </Link>
            <Link
              to="/events"
              className="text-white text-lg  no-underline"
            >
              Events
            </Link>
            <Link
              to="/about"
              className="text-white text-lg  no-underline"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white text-lg  no-underline"
            >
              Contact Us
            </Link>
          </nav>
          <div>
            <button className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[20px] rounded-[7px] font-[700] tracking-[1px]">
              SignIn
            </button>
          </div>
        </div>
      </header>
      <p>  sumit</p>
      </div>
   )
}