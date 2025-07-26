import React, { useState, useEffect } from "react";
import {Link , useNavigate} from 'react-router-dom'


// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const UserDashboardControl = () => {
  return (
       <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute w-full h-full object-cover -z-[10]"
      />

      <div>
        <header className="max-w-[50rem] mx-auto px-8 py-10 z-10 relative">
          <h1 className="text-6xl font-semibold mb-6">
            Welcome to College Blog Manage Page
          </h1>
          <Link to="/admin">Home</Link>
        </header>

        <main className="p-6 max-w-4xl mx-auto space-y-6 z-[10]">

        </main>
        </div>
        </div>
  )
}
