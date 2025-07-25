// for feature react icon
import {
  FaCode,
  FaFutbol,
  FaClipboardList,
  FaCertificate,
  FaReact,
} from "react-icons/fa";
import { SiDjango } from "react-icons/si";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Meteors } from "../components/ui/Meteors";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";
import { OrbitingCircles } from "../components/magicui/orbiting-circles";
import Navbar from "../components/ui/navbar-menu";
import { Marquee } from "../components/magicui/Marquee";

import CursorShadow from "../components/ui/CursorShadow";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAuth } from "../context/AuthContext";

// for blog carousal
import BlogCarousel from "../components/ui/BlogCarousel";

// Importing all Images, icon and svg
import herossectionImage from "../images/herossection-image.avif";
import herossectionMiddleImage from "../images/herossection-image-2.avif";
import RuleImage from "../images/rule-regimage.avif";
import footerImage from "../images/footer-img.avif";
import firstImage from "../images/1-image.avif";
import secondImage from "../images/2-image.avif";
import thirdImage from "../images/3-image.avif";
import reactLogo from "../images/react.png";
import logo from "../images/logo-college.png";
import Hackathon from "../images/collegeHackathon.png";
import Orentiation from "../images/collegeOrentation.png";
import sports from "../images/collegeSport.png";
import { Icons } from "../components/ui/icons";
import {
  ClipboardList,
  CheckCircle,
  Layers,
  PlugZap,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { X } from "lucide-react";
import { Menu as MenuIcon } from "lucide-react";
import CodeSVG from "../images/SVGs/code-generation.svg";
import SportsSVG from "../images/SVGs/sports.svg";
import RegistrationSVG from "../images/SVGs/registration.svg";
import CertificateSVG from "../images/SVGs/certificate.svg";

// importing custom hooks

// import { useAuth } from "../hooks/useAuth";
import { supabase } from "@/supabaseClient";

// this css for draggable card
const randomClasses = [
  "absolute top-10 left-[20%] rotate-[-5deg]",
  "absolute top-40 left-[25%] rotate-[-7deg]",
  "absolute top-5 left-[40%] rotate-[8deg]",
  "absolute top-32 left-[55%] rotate-[10deg]",
  "absolute top-20 right-[35%] rotate-[2deg]",
  "absolute top-24 left-[45%] rotate-[-7deg]",
  "absolute top-8 left-[30%] rotate-[4deg]",
];

export default function Dashboard() {
  const [menuActive, setMenuActive] = useState();

  // for feature selection
  const [activeTab, setActiveTab] = useState("coding");

  // custom hooks
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  // for draggable card
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase.from("gallery").select("*");

      if (error) console.error("Error fetching gallery:", error);
      else setGalleryItems(data);
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (!loading && role) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/");
      }
    }
  }, [role, loading, navigate]);

  const content = {
    coding: {
      title: "Join Coding Competitions & Hackathons",
      description:
        "Participate in technical fests, hackathons, and code challenges organized by various departments and clubs.",
      icon: <FaCode className="text-3xl text-blue-400" />,
      image: CodeSVG,
    },
    sports: {
      title: "College Sports Meets & Tournaments",
      description:
        "Take part in thrilling sports tournaments like cricket, football, badminton, and athletics.",
      icon: <FaFutbol className="text-3xl text-green-400" />,
      image: SportsSVG,
    },
    registered: {
      title: "Your Registered Events",
      description:
        "View all the events you've registered for in one place. Stay organized and informed.",
      icon: <FaClipboardList className="text-3xl text-yellow-400" />,
      image: RegistrationSVG,
    },
    certificate: {
      title: "Download Certificates",
      description:
        "Access and download participation and winner certificates after the events are completed.",
      icon: <FaCertificate className="text-3xl text-purple-400" />,
      image: CertificateSVG,
    },
  };
  return (
    <div className="relative w-full overflow-hidden text-white min-h-screen">
      <Meteors number={30} />
      <div className="hidden lg:block">
        <CursorShadow />
      </div>
      <img
        className="absolute w-[25rem] h-[57.5rem] 2xl:w-[120rem] -z-10 lg:h-[68rem] lg:w-[79.06rem]"
        src={herossectionImage}
        alt=""
      />
      {/* ------------------- Header ------------------- */}
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

      {/* ------------------- Main Content ------------------- */}
      <main className="pt-20 flex flex-col items-center text-center px-4">
        <section className="z-100">
          <h2 className="text-1xl mt-7  mb-4">
            Register for Upcoming College Events
          </h2>
          <p className="text-gray-400 mx-auto mt-6  max-w-md mb-6">
            Your all-in-one platform for college event discovery.
            <br />
            Simple registrations, instant updates, zero hassle.
            <br />
            Because every great campus story starts with showing up.
            <br />
          </p>
          <div className="flex gap-4 justify-center mt-50px ml-40%">
            <Button
              size="lg"
              className={
                "px-[1.12rem] py-[.62rem] bg-blue-500 rounded-[.31rem]"
              }
              onClick={() => navigate("/events")}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              className={"px-[.93rem] py-[.43rem] text-black rounded-[.31rem]"}
              variant="outline"
              onClick={() => navigate("/viewmyevents")}
            >
              View My Events
            </Button>
          </div>
        </section>
        <section className="w-[25rem] h-[28.2rem] lg:w-[79.06rem] lg:h-[34.2rem]">
          <div
            className="mt-[2.5rem] grid grid-cols-3"
            style={{
              backgroundColor:
                "var(--token-7f644d3c-fafa-4df1-9482-cf8ab29882f1, rgb(7, 11, 21))",
              borderRadius: "1rem",
              opacity: "1",
            }}
          >
            <div className="ssr-variant hidden-natfdx">
              <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                  <img
                    className="w-[10rem] mt-15 lg:h-[30rem] lg:w-[22rem]"
                    src={firstImage}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="ssr-variant hidden-natfdx">
              <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                  <img
                    className="w-[10rem] mt-10 lg:h-[30rem] lg:w-[22rem]"
                    src={secondImage}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="ssr-variant hidden-natfdx">
              <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                  <img
                    className="w-[10rem] mt-5 lg:h-[30rem] lg:w-[22rem]"
                    src={thirdImage}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="overflow-hidden bg-[#04060e] w-[25rem] lg:w-[79.06rem]">
          <p className=" mt-[7.5rem] text-[1.25rem]">
            Simplifying event participation for every student
          </p>
          <div className="relative flex w-full h-20 flex-col items-center justify-center overflow-hidden">
            <Marquee className="[--duration:20s]">
              <div className="flex justify-around align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <SiDjango className="text-blue-600" />
                <p>Django</p>
              </div>
              <div className="flex align-center">
                <FaReact className="text-blue-400" />
                {/* <img className="w-5 h-5" src={reactLogo} alt="" /> */}
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
              <div className="flex align-center">
                <img className="w-5 h-5" src={reactLogo} alt="" />
                <p>react</p>
              </div>
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 from-background"></div>
          </div>
        </section>
        <section className="h-[98.5rem] w-[25rem] bg-[#04060e] lg:w-[79.06rem] lg:h-[40rem] ">
          <div className=" text-white">
            <h2>The smartest way to automate your tasks</h2>
            <div className="lg:flex lg:gap-10">
              <CardContainer className="inter-var w-90">
                <CardBody className="bg-[#070b15] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl  text-neutral-600 dark:text-white"
                  >
                    Hackathon
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={Hackathon}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href="https://twitter.com/mannupaaji"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    ></CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs "
                    >
                      <Link to="/signup">Sign up</Link>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
              <CardContainer className="inter-var w-90">
                <CardBody className="bg-[#070b15] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl  text-neutral-600 dark:text-white"
                  >
                    Sports
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={sports}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href="https://twitter.com/mannupaaji"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    ></CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs "
                    >
                      <Link to="/signup">Sign up</Link>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
              <CardContainer className="inter-var w-90">
                <CardBody className="bg-[#070b15] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl  text-neutral-600 dark:text-white"
                  >
                    Oreintation
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    Hover over this card to unleash the power of CSS perspective
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={Orentiation}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-between items-center mt-20">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href="https://twitter.com/mannupaaji"
                      target="__blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    ></CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs "
                    >
                      <Link to="/signup">Sign up</Link>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </section>
        <section className="h-[89.75rem] bg-[#04060e] lg:w-[79.06rem] lg:h-[43rem]">
          <div className="mt-[20rem] text-white px-10 lg:mt-[5rem]">
            <div className="flex mt-20 justify-between">
              <div className="bg-[#04060e] text-white min-h-screen p-10">
                <div className="flex justify-between items-center mb-12">
                  <h1 className="text-4xl font-semibold">
                    Explore and Register for Exciting College Events
                  </h1>
                  <Button
                    onClick={() => navigate("/signup")}
                    className="bg-blue-500 p-[10px] mt-10"
                  >
                    signup
                  </Button>
                </div>

                <div className="flex gap-10 bg-[#04060e]">
                  {/* Left Menu */}
                  <div className="flex flex-col gap-4 w-60">
                    {Object.keys(content).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left text-lg font-medium transition ${
                          activeTab === key
                            ? "bg-gray-900 text-black"
                            : "hover:bg-gray-800 text-gray-300"
                        }`}
                      >
                        {content[key].icon}
                        <span className="capitalize">{key}</span>
                      </button>
                    ))}
                  </div>

                  {/* Right Content */}
                  <div className="bg-[#070b15] w-[50rem] p-8 rounded-xl flex-1 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                      {content[activeTab].title}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {content[activeTab].description}
                    </p>
                    <img
                      src={content[activeTab].image}
                      alt={activeTab}
                      className="object-fill mt-5 w-full h-[270px] rounded-xl border border-gray-700 shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-[25rem] h-[50rem] lg:w-[79.09rem]">
            <img
              className="absolute w-[26rem] h-[50rem] -z-10v lg:w-[79.09rem]"
              src={herossectionMiddleImage}
              alt=""
            />
            <div className="z-10 ">
              <div className="relative flex h-[31.25rem] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-3s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.notion />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-9s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.whatsapp />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-15s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.googleDrive />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-21s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.openai />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-27s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.notion />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-33s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.whatsapp />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-39s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.googleDrive />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-45s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.openai />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-51s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.notion />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-57s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.whatsapp />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-63s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.googleDrive />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[3.125rem] w-[3.125rem] border-none [animation-delay:-69s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.openai />
                </OrbitingCircles>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-[25rem] h-[37.5rem] bg-[#04060e] lg:w-[79.06rem]">
            <div className="lg:w-[79.09rem]">
              <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
                {galleryItems.map((item, index) => (
                  <DraggableCardBody
                    key={item.id}
                    className={randomClasses[index % randomClasses.length]}
                  >
                    <img
                      src={item.imageurls}
                      alt={item.title}
                      className="pointer-events-none relative z-10 h-80 w-80 object-cover rounded-lg shadow-xl"
                    />
                    <h3 className="mt-4 text-center text-2xl text-neutral-700 dark:text-neutral-300">
                      {item.title}
                    </h3>
                  </DraggableCardBody>
                ))}
              </DraggableCardContainer>
            </div>
            <div>
              <h2>
                Hero ImageHero ImageAI-Powered solutions for every industry
              </h2>
            </div>
          </div>
        </section>
        <section>
          <div className="w-[25rem] h-[13.5rem] bg-[#04060e] lg:w-[79.06rem]">
            <ul className="flex">
              <li className="mt-5">
                <ClipboardList className="text-blue-500 w-6 h-6 mb-3" />
                <h3 className="font-semibold text-xl">
                  Streamlined Registrations
                </h3>
                <p className="mt-5">
                  Automate student event signups and manage attendees
                  efficiently to save time and reduce manual effort.
                </p>
              </li>
              <li className="mt-5">
                <CheckCircle className="text-blue-500 w-6 h-6 mb-3" />
                <h3 className="font-semibold text-xl">
                  Accurate & Smart Management
                </h3>
                <p className="mt-5">
                  Avoid registration errors with intelligent systems that ensure
                  every student's participation is tracked and confirmed
                  reliably.
                </p>
              </li>
              <li className="mt-5">
                <Layers className="text-blue-500 w-6 h-6 mb-3" />
                <h3 className="font-semibold text-xl">
                  Scalable for Every Event
                </h3>
                <p className="mt-5">
                  Whether it's a small workshop or a large tech fest, the portal
                  adapts to fit your event's scale and requirements.
                </p>
              </li>
              <li className="mt-5">
                <PlugZap className="text-blue-500 w-6 h-6 mb-3" />
                <h3 className="font-semibold text-xl">Easy Integration</h3>
                <p className="mt-5">
                  Connect effortlessly with Google Sheets, email systems, and
                  campus tools to enhance communication and coordination.
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section className="h-[40rem] bg-[#04060e]">
          <div className="w-[79.06rem] mx-auto  p-8  shadow-lg">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Rules for Registration
            </h2>
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* Do Section */}
              <div className="flex-1 bg-[#070b15] rounded-xl p-6 text-white shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-green-400">
                  Do
                </h3>
                <ul className="list-disc list-inside space-y-2 text-left">
                  <li>Be respectful to others</li>
                  <li> Follow event timings</li>
                  <li>Register with accurate details</li>
                  <li>Register using your official college email ID.</li>
                  <li>Carry your college ID card to the event.</li>
                  <li>Read all event guidelines before registering.</li>
                  <li>Join official WhatsApp/Telegram groups if provided.</li>
                  <li>Reach the venue 15 minutes before the event starts.</li>
                  <li>Submit required documents (if any) on time.</li>
                  <li>Respect event coordinators and volunteers.</li>
                  <li>Follow dress code if mentioned for the event.</li>
                  <li>Ask for help if you face any registration issues.</li>
                  <li>Maintain cleanliness at the event venue.</li>
                </ul>
              </div>

              {/* Don't Section */}
              <div className="flex-1 relative bg-[#070b15] rounded-xl p-6 text-white shadow-md overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-20 z-0">
                  <img
                    src={RuleImage}
                    alt="Rules Illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4 text-red-400">
                    Don't
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-left">
                    <li>Don't provide fake info</li>
                    <li>Don't spam the portal</li>
                    <li>Don't miss deadlines</li>
                    <li>
                      Don’t register multiple times with different emails.
                    </li>
                    <li>Don’t share your registration link with others.</li>
                    <li>Don’t register for overlapping events.</li>
                    <li>Don’t misbehave with organizers or attendees.</li>
                    <li>Don’t bring unauthorized guests.</li>
                    <li>Don’t tamper with event equipment or resources.</li>
                    <li>
                      Don’t skip the rules mentioned in event descriptions.
                    </li>
                    <li>
                      Don’t engage in unfair practices (e.g., cheating in coding
                      contests).
                    </li>
                    <li>Don’t forget to check confirmation mail/SMS.</li>
                    <li>Don’t leave early without informing the organizers.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#070b15] w-[79.09rem] h-[52rem]">
          <div className="h-[10rem] bg-black p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Latest Blogs
            </h1>
            <BlogCarousel />
          </div>
        </section>
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
                    to="/eventschedules"
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
