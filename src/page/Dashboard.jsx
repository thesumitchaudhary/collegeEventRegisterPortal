import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Meteors } from "../components/ui/Meteors";
import { Marquee } from "../components/magicui/Marquee";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";
import { OrbitingCircles } from "../components/magicui/orbiting-circles";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../components/ui/navbar-menu";
import CursorShadow from "../components/ui/CursorShadow";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Importing all Images and icon
import herossectionImage from "../images/herossection-image.avif";
import herossectionMiddleImage from "../images/herossection-image-2.avif";
import RuleImage from "../images/rule-regimage.avif";
import footerImage from "../images/footer-img.avif";
import firstImage from "../images/1-image.avif";
import secondImage from "../images/2-image.avif";
import thirdImage from "../images/3-image.avif";
import reactLogo from "../images/react.png";
import { Icons } from "../components/ui/icons";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { X } from "lucide-react";
import { Menu as MenuIcon } from "lucide-react";

// importing custom hooks

import { useAuth } from "../hooks/useAuth";
import { supabase } from "@/supabaseClient";

export default function Dashboard() {
  const [menuActive, setMenuActive] = useState();
  const [active, setActive] = useState();

  // custom hooks
  const { user, loading } = useAuth();

  const items = [
    {
      title: "Tyler Durden",
      image:
        "https://images.unsplash.com/photo-1732310216648-603c0255c000?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      image:
        "https://images.unsplash.com/photo-1697909623564-3dae17f6c20b?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      image:
        "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];

  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
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
            {/* <div>
              {user ? <p>welcome,{user}</p> : <p>Please signin</p>}
            </div> */}
            <div>
               {user ? (
              <Button
                onClick={async () => {
                  await supabase.auth.signOut();
                  className =
                    "text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[1.25rem] rounded-[.43rem] font-[700] tracking-[.06rem]";
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
              onClick={() => navigate("/register")}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              className={"px-[.93rem] py-[.43rem] text-black rounded-[.31rem]"}
              variant="outline"
              onClick={() => navigate("/events")}
            >
              View My Events
            </Button>
            <Button
              size="lg"
              className={"px-[.93rem] py-[.43rem] text-black rounded-[.31rem]"}
              variant="outline"
              onClick={() => navigate("/admin")}
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
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                      <Link to="/register">Sign up</Link>
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
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                      <Link to="/register">Sign up</Link>
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
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                      <Link to="/register">Sign up</Link>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </section>
        <section className="h-[63.75rem] bg-[#04060e] lg:w-[79.06rem] lg:h-[43rem]">
          <div className="mt-[20rem] text-white px-10 lg:mt-[5rem]">
            <div className="flex justify-between ">
              <h2 className=" text-2xl mt-10">
                Advanced AI features for smarter automation
              </h2>
              <button className="bg-blue-500 p-[10px] mt-10">
                Get Started
              </button>
            </div>
            <div className="flex mt-20 justify-between">
              <ul>
                <li>
                  <a href="#">coding</a>
                </li>
                <li>
                  <a href="#">sports</a>
                </li>
                <li>
                  <a href="#">registered number</a>
                </li>
                <li>
                  <a href="#">cetificate</a>
                </li>
              </ul>
              <div className=" bg-[#070b15] w-250">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
                  pariatur nam, repellat dolor reprehenderit assumenda deleniti
                  cum velit sunt accusantium reiciendis non architecto, nostrum
                  ipsam impedit ipsa officiis, dolorum fugit?
                </p>
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
              <div className="relative flex h-[31.25] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
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
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-[25rem] h-[37.5rem] bg-[#04060e] lg:w-[79.06rem]">
            <div className="lg:w-[79.09rem]">
              <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
                <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
                  If its your first day at Fight Club, you have to fight.
                </p>
                {items.map((item) => (
                  <DraggableCardBody className={item.className}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="pointer-events-none relative z-10 h-80 w-80 object-cover"
                    />
                    <h3 className="mt-4 text-center text-2xl  text-neutral-700 dark:text-neutral-300">
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
          <div className="w-[25rem] h-[12.5rem] bg-[#04060e] lg:w-[79.06rem]">
            <ul className="">
              <li>
                <h3>Increased efficiency</h3>
                <p>
                  Automate repetitive tasks and streamline workflows to save
                  time and resources.
                </p>
              </li>
              <li>
                <h3>AI-driven accuracy</h3>
                <p>
                  Reduce human errors with intelligent automation that ensures
                  precision and reliability.
                </p>
              </li>
              <li>
                <h3>Scalable & Flexible</h3>
                <p>
                  Adapt AI automation to fit your business needs, whether you're
                  a startup or an enterprise.
                </p>
              </li>
              <li>
                <h3>Seamless integration</h3>
                <p>
                  Easily connect with 50+ tools and platforms to enhance your
                  existing systems.
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div className="w-[25rem] h-[37.5rem] bg-[#04060e] lg:w-[79.06rem]">
            <h2>Rules for registration</h2>
            <div className="flex justify-between">
              <div className="py-[6.25rem] mt-30 bg-[#070b15]">
                <h3>Do</h3>
                <ul className="">
                  <li>sumit</li>
                  <li>sumit</li>
                  <li>sumit</li>
                </ul>
              </div>
              <div className="w-[18.75rem] mt-30 bg-[#070b15]">
                <div className="relative">
                  <img src={RuleImage} className="absolute z-10" alt="" />
                </div>
                <div className="-z-10">
                  <h3 className="text-white">Don't</h3>
                  <ul className="">
                    <li>pradip</li>
                    <li>pradip</li>
                    <li>pradip</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  <Link to="/" className="text-white text-lg  no-underline">
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
