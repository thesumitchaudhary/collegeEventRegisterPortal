import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ui/ParticleBackground";
import { Button } from "../components/ui/button";
import { Meteors } from "../components/ui/Meteors";

// Importing image

import herossectionImage from "../images/herossection-image.avif";

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute  w-full h-full object-cover "
      />

      {/* Particle and Meteor Effects */}
      <div className="absolute top-0 left-0 w-full h-full z-[-10]">
        <Meteors number={30} />
        <ParticleBackground />
      </div>

      {/* Header */}
      <header className="max-w-[50rem] mx-auto px-8 py-10  z-10 relative">
        <h1 className="text-6xl font-semibold mb-6">
          Welcome to College Event Registration Admin Panel
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-[53rem] mx-auto px-8 py-12 z-10 relative">
        <div className=" flex gap-[90px] flex-wrap">
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminevent")}
            >
              Event Manage
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminblog")}
            >
              Blog Manage
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/faqs")}
            >
              FAQ Manage
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminfeedbackview")}
            >
              View Feedback
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminprivacypolicy")}
            >
              privacyPolicy Manage
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminaboutus")}
            >
              About Us Manage
            </Button>
          </div>

          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminfeatures")}
            >
              Features Manage
            </Button>
          </div>

            <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminviewcontact")}
            >
              Contact Page Manage
            </Button>
          </div>

            <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminuploadcertificates")}
            >
              Upload Certificate
            </Button>
          </div>

          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/admineventschedule")}
            >
              Event Schedule Manage
            </Button>
          </div>

           <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] transform transition-transform duration-500 hover:rotate-y-180"
              onClick={() => navigate("/admin/adminresource")}
            >
              Resource Manage
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
