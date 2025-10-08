import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ui/ParticleBackground";
import { Button } from "../components/ui/button";
import { Meteors } from "../components/ui/Meteors";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/supabaseClient";
import { Calendar, FileText, HelpCircle, MessageSquare, Shield, Info, Star, Phone, Upload, Clock, Book, Image, Users } from "lucide-react";


// Importing image

import herossectionImage from "../images/herossection-image.avif";

export default function AdminDashboard() {
  const { user, role, loading } = useAuth();
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
        <h1 className="text-6xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to College Event Registration Admin Panel
        </h1>
        <div>
          <div>
            {user ? <p className="text-xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">welcome,{user.user_metadata.full_name}</p> : <p></p>}
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
      </header>

      {/* Main Content */}
      <main className="max-w-[53rem] mx-auto px-8 py-12 z-10 relative">
        <div className=" flex gap-[90px] flex-wrap">
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminevent")}
            >
             <Calendar className="w-5 h-5 mr-2" />Event Manage
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminblog")}
            >
               <FileText className="w-5 h-5 mr-2" /> Blog Manage
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/faqs")}
            >
              <HelpCircle className="w-5 h-5 mr-2" /> FAQ Manage
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminfeedbackview")}
            >
             <MessageSquare className="w-5 h-5 mr-2" />View Feedback
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminprivacypolicy")}
            >
             <Shield className="w-5 h-5 mr-2" />Privacy Policy
            </Button>
          </div>
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminaboutus")}
            >
            <Info className="w-5 h-5 mr-2" />About Us Manage
            </Button>
          </div>

          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminfeatures")}
            >
              <Star className="w-5 h-5 mr-2" /> Features Manage
            </Button>
          </div>

          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminviewcontact")}
            >
              <Phone className="w-5 h-5 mr-2" /> Contact Manage
            </Button>
          </div>

          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminuploadcertificates")}
            >
              <Upload className="w-5 h-5 mr-2" />Upload Certificate
            </Button>
          </div>

          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/admineventschedule")}
            >
             <Clock className="w-5 h-5 mr-2" /> Event Schedule
            </Button>
          </div>

          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/adminresource")}
            >
              <Book className="w-5 h-5 mr-2" /> Resource Manage
            </Button>
          </div>
          
          <div className="perspective">
            <Button
              className="w-[12.5rem] h-[3rem] bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => navigate("/admin/admingallerymanage")}
            >
              <Image className="w-5 h-5 mr-2" /> Gallery Manage
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
