import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export default function Navbar() {
  const [active, setActive] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setActive("resources");
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(null);
    }, 200);
  };

  return (
    <nav className="flex space-x-6 items-center px-6 py-4 ">
      <Link
        to="/"
        className="text-white dark:text-white"
      >
        Home
      </Link>
      <Link
        to="/events"
        className="text-white dark:text-white"
      >
        Event
      </Link>

      {/* Dropdown Menu (Resources) */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="cursor-pointer text-white ">
          Resources
        </span>

      

        {active === "resources" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="absolute top-full left-0 mt-2 w-48 bg-blue  border rounded-md shadow-xl z-50"
          >
            <Link
              to="/resource"
              className="block px-4 py-2 text-sm text-white"
            >
              Documentation
            </Link>
            <Link
              to="/resource"
              className="block px-4 py-2 text-sm text-white"
            >
              Tutorials
            </Link>
            <Link
              to="/resource"
              className="block px-4 py-2 text-sm text-white dark:hover:bg-gray-800"
            >
              Community
            </Link>
          </motion.div>
        )}
      </div>
        <Link
          to="/blog"
          className="text-white "
        >
          Blog
        </Link>
    </nav>
  );
}
