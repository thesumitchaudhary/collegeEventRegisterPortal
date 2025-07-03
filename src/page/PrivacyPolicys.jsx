import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../components/ui/navbar-menu";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Icons } from "../components/ui/icons";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { X } from "lucide-react";
import { Menu as MenuIcon } from "lucide-react";

// importing image
import headerImg from "../images/otherPageHeaderImage.avif";
import footerImage from "../images/footer-img.avif";

export default function PrivacyPolicy() {
  const [menuActive, setMenuActive] = useState();
  const [active, setActive] = useState();

  return (
    <div>
      <div className="h-[10rem]">
        <img
          className="absolute block -z-10 h-[10rem] object-center object-cover w-[100%]"
          src={headerImg}
          alt="header image"
        />
      </div>
      <header className="w-full h-[100px] absolute shadow-sm top-0 z-10">
        <div className="max-w-8xl flex items-center justify-between px-6 py-4">
          <h1 className={`text-white text-[19px]  mt-[1.25rem]`}>C E R</h1>
          <nav className="lg:flex hidden gap-[20px] mt-[20px] text-sm font-medium">
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
            <div>
              <Link
                to="/signup"
                className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[1.25rem] rounded-[.43rem] font-[700] tracking-[.06rem]"
              >
                SignIn
              </Link>
            </div>
          </nav>
          <nav className="lg:hidden block">
            <div
              className={`max-w-2xl  mx-auto text-[10px]  ${
                menuActive ? "block" : "hidden"
              }`}
            >
              <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Home">
                  <div className="flex flex-col space-y-4 text-sm  bg-black ">
                    <HoveredLink to="/">Web Development</HoveredLink>
                    <HoveredLink to="/">Interface Design</HoveredLink>
                    <HoveredLink to="/">Search Engine Optimization</HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Event">
                  <div className="flex flex-col space-y-4 text-sm  bg-black ">
                    <HoveredLink href="/web-dev">Web Development</HoveredLink>
                    <HoveredLink href="/interface-design">
                      Interface Design
                    </HoveredLink>
                    <HoveredLink href="/seo">
                      Search Engine Optimization
                    </HoveredLink>
                    <HoveredLink href="/branding">Branding</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Resource">
                  <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                    <ProductItem
                      title="Algochurn"
                      href="https://algochurn.com"
                      src="https://assets.aceternity.com/demos/algochurn.webp"
                      description="Prepare for tech interviews like never before."
                    />
                    <ProductItem
                      title="Tailwind Master Kit"
                      href="https://tailwindmasterkit.com"
                      src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                      description="Production ready Tailwind css components for your next project"
                    />
                    <ProductItem
                      title="Moonbeam"
                      href="https://gomoonbeam.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                      description="Never write from scratch again. Go from idea to blog in minutes."
                    />
                    <ProductItem
                      title="Rogue"
                      href="https://userogue.com"
                      src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                      description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
                    />
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Blog">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink to="/hobby">Hobby</HoveredLink>
                    <HoveredLink to="/individual">Individual</HoveredLink>
                    <HoveredLink to="/team">Team</HoveredLink>
                    <HoveredLink to="/enterprise">Enterprise</HoveredLink>
                  </div>
                </MenuItem>
              </Menu>
            </div>
            <div className={`${menuActive ? "block" : "hidden"}`}>
              <Link
                to="/signup"
                className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[1.25rem] rounded-[.43rem] font-[700] tracking-[.06rem]"
              >
                SignIn
              </Link>
            </div>
            <Button
              size={"icon"}
              className={`${menuActive ? "hidden" : "block"}`}
              onClick={() => setMenuActive(true)}
            >
              <MenuIcon />
            </Button>
            <Button
              size={"icon"}
              className={`${menuActive ? "block" : "hidden"}`}
              onClick={() => setMenuActive(false)}
            >
              <X />
            </Button>
          </nav>
        </div>
      </header>
      <main className="h-[900px] bg-[#000] text-white">
        <div className="max-w-4xl mx-auto p-6">
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
        </div>
      </main>
      {/* ------------------- Footer (optional) ------------------- */}

      <footer className="h-[56.25rem] ">
        <div className="absolute -z-10">
          <img
            className="h-[60rem] w-[25rem] lg:h-[60rem] lg:w-[79.06rem]"
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
              <h2 className="mt-10 text-center text-white">CER</h2>
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
                  <Link to="/" className="text-white text-lg  no-underline">
                    Pricing
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
