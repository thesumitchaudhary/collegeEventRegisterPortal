import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CursorShadow from "../components/ui/CursorShadow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InfoCard from "../components/ui/infoCard";
import footerImage from "../images/footer-img.avif";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { X } from "lucide-react";

// Hackathon Image

import AICreativeMediaHackathon from "../images/AICreativeMediaHackathon.jpeg";
import BiotechnologyBreakThroughHackathon from "../images/BiotechnologyBreakThroughHackathon.jpeg";
import COOPHackathon from "../images/CO-OPHackathon.jpeg";
import DebugOnHackathon from "../images/DebugOnHackathon.jpeg";
import ICA2025Hackathon from "../images/ICA2025Hackathon.jpeg";
import StartUpHackathon from "../images/StartUpHackathon.jpeg";

export default function EventsList() {
  return (
    <div className="relative w-full text-white min-h-screen xs:w-[370px] lg:bg-black">
      <CursorShadow />
            <header className="w-full shadow-sm top-0 z-10">
              <div className="max-w-8xl flex items-center justify-between px-6 py-4">
                <h1 className=" text-white text-4xl mt-[20px] ">C E R</h1>
                <nav className="flex gap-[20px] mt-[20px] text-sm font-medium">
                  <Link to="/" className="text-white text-lg  no-underline">
                    Home
                  </Link>
                  <Link to="/events" className="text-white text-lg  no-underline">
                    Events
                  </Link>
                  <Link to="/resource" className="text-white text-lg  no-underline">
                    Resource
                  </Link>
                  <Link to="/blog" className="text-white text-lg  no-underline">
                    Blog
                  </Link>
                </nav>
                <div>
                  <Link
                    to="/register"
                    className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[20px] rounded-[7px] font-[700] tracking-[1px]"
                  >
                    SignIn
                  </Link>
                </div>
              </div>
            </header>
      <main className="h-[92rem] bg-[#04060e]">
        {/* ------------------- Carousel ------------------- */}
        {/* <section className="w-full max-w-3xl mx-auto mt-10 relative">
          <div ref={emblaRef} className="overflow-hidden">
            <Carousel className="h-64">
              <CarouselContent>
                <CarouselItem>
                  <img
                    className="object-cover"
                    src={AICreativeMediaHackathon}
                    alt="AI Hackathon"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    className="object-cover"
                    src={BiotechnologyBreakThroughHackathon}
                    alt="Biotech Hackathon"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    className="object-cover"
                    src={COOPHackathon}
                    alt="CO-OP Hackathon"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    className="object-cover"
                    src={DebugOnHackathon}
                    alt="DebugOn Hackathon"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    className="object-cover"
                    src={ICA2025Hackathon}
                    alt="ICA 2025 Hackathon"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img
                    className="object-cover"
                    src={StartUpHackathon}
                    alt="Startup Hackathon"
                  />
                </CarouselItem>
              </CarouselContent>

              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow" />
              <CarouselNext className="ml-[1380px] absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow" />
            </Carousel>
          </div>
        </section> */}
        <section className="flex h-100 mx-w-2xl">
          <div className="flex justify-center items-center mt-30 gap-[5rem]">
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </div>
        </section>
        <section className="flex h-100 mx-w-2xl">
          <div className="flex justify-center items-center mt-70 gap-[5rem]">
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </div>
        </section>
        <section className="flex h-100 mx-w-2xl">
          <div className="flex justify-center items-center mt-105 gap-[5rem]">
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </div>
        </section>
      </main>

      {/* ------------------- Footer (optional) ------------------- */}

      <footer className="h-[900px]">
        <div className="absolute -z-10">
          <img className="h-[900px]" src={footerImage} alt="" />
        </div>
        <div className="z-10">
          <div className="flex flex-col justify-center">
            <div className="mt-20 ml-100">
              <h2 className=" text-4xl w-150 text-center text-white">
                Enter your Email for getting Event Notification Timely
              </h2>
              <p className="mt-5 text-white">
                Subscribe to our newsletter and get updates on upcoming college
                events, registration deadlines, and exclusive student
                opportunities—delivered straight to your inbox.
              </p>
              <div className="mt-30">
                <div className="flex gap-5">
                  <input
                    type="text"
                    className="text-white bg-black w-[400px]"
                  />
                  <button className="px-[15px] py-[10px] rounded-2xl bg-blue-900">
                    Submit
                  </button>
                </div>
                <div className="mt-5 flex gap-10 text-white">
                  <p>No credit card is required</p>
                  <p>Early access & Special offers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex g-10 mx-30">
            <div>
              <h2 className="mt-50 text-center text-white">CER</h2>
              <div className="flex gap-5 mt-10 text-white">
                <Facebook />
                <Linkedin />
                <X />
                <Instagram />
              </div>
            </div>
            <div className="flex gap-10 mt-50">
              <div>
                <h4 className="text-base mb-5 text-white">Main mages</h4>
                <div className="flex flex-col gap-5">
                  <Link to="/" className="text-white text-lg  no-underline">
                    Home
                  </Link>
                  <Link to="/" className="text-white text-lg  no-underline">
                    Features
                  </Link>
                  <Link to="/" className="text-white text-lg  no-underline">
                    Pricing
                  </Link>
                  <Link to="/" className="text-white text-lg  no-underline">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-base mb-5">Information</h4>
                <div className="flex flex-col gap-5">
                  <Link
                    to="/about"
                    className="text-white text-lg  no-underline"
                  >
                    About
                  </Link>
                  <Link to="/" className="text-white text-lg  no-underline">
                    FAQ
                  </Link>
                  <Link to="/" className="text-white text-lg  no-underline">
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-base mb-5">Utilities</h4>
                <div className="flex flex-col gap-5">
                  <Link to="/" className="text-white text-lg  no-underline">
                    Event Schedule
                  </Link>
                  <Link to="/" className="text-white text-lg  no-underline">
                    Download Certificate
                  </Link>
                  <Link to="/" className="text-white text-lg  no-underline">
                    Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-10">
            <p>Developed by Chaudhary Sumit And Chaudhary Raj</p>
            <p className="text-white ">
              2025 College Event Registration Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
