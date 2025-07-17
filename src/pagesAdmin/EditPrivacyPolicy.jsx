import React from "react";
import {Link, useNavigate} from "react-router-dom"

// Importing image
import herossectionImage from "../images/herossection-image.avif";

export const EditPrivacyPolicy = () => {
  return (
    <div className="relative w-full text-white min-h-screen overflow-hidden">
      <img
        src={herossectionImage}
        alt="hero section"
        className="absolute  w-full h-full object-cover -z-[10]"
      />
      <div>
        <header className="flex justify-between p-4  text-white z-[10]">
          <h1 className="text-xl font-bold">CER</h1>
          <Link to="/admin">Home</Link>
        </header>

        <main>dfghdsffghberhn</main>
      </div>
    </div>
  );
};
