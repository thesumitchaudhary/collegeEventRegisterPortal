import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Meteors } from "../components/ui/Meteors";
import { Marquee } from "../components/magicui/Marquee";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../components/ui/draggable-card";
import { OrbitingCircles } from "../components/magicui/orbiting-circles";
import CursorShadow from "../components/ui/CursorShadow";
import { Icons } from "../components/ui/icons";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { X } from "lucide-react";

// Hackathon Images
import herossectionImage from "../images/herossection-image.avif";
import herossectionMiddleImage from "../images/herossection-image-2.avif";
import RuleImage from "../images/rule-regimage.avif";
import footerImage from "../images/footer-img.avif";
import firstImage from "../images/1-image.avif";
import secondImage from "../images/2-image.avif";
import thirdImage from "../images/3-image.avif";
import reactLogo from "../images/react.png";
import AICreativeMediaHackathon from "../images/AICreativeMediaHackathon.jpeg";
import BiotechnologyBreakThroughHackathon from "../images/BiotechnologyBreakThroughHackathon.jpeg";
import COOPHackathon from "../images/CO-OPHackathon.jpeg";
import DebugOnHackathon from "../images/DebugOnHackathon.jpeg";
import ICA2025Hackathon from "../images/ICA2025Hackathon.jpeg";
import StartUpHackathon from "../images/StartUpHackathon.jpeg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";


export default function Dashboard() {
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
    <div className="relative w-full text-white min-h-screen">
      <Meteors number={30} />
      <CursorShadow />
      <img
        className="absolute w-[1265px] h-[1400px] -z-10"
        src={herossectionImage}
        alt=""
      />
      {/* ------------------- Header ------------------- */}
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
              to="/resource"
              className="text-white text-lg  no-underline"
            >
              Resource
            </Link>
            <Link
              to="/blog"
              className="text-white text-lg  no-underline"
            >
              Blog
            </Link>
          </nav>
          <div>
            <Link to="/register" className="text-black bg-[#ffffff] py-[.4rem] px-[1rem] mt-[20px] rounded-[7px] font-[700] tracking-[1px]">
              SignIn
            </Link>
          </div>
        </div>
      </header>

      {/* ------------------- Carousel ------------------- */}
      {/* <section className="w-full max-w-3xl mx-auto mt-10 relative">
  <div ref={emblaRef} className="overflow-hidden">
    <Carousel className="h-64">
      <CarouselContent>
        <CarouselItem><img className="" className="object-cover" src={AICreativeMediaHackathon} alt="AI Hackathon" /></CarouselItem>
        <CarouselItem><img className="" className="object-cover" src={BiotechnologyBreakThroughHackathon} alt="Biotech Hackathon" /></CarouselItem>
        <CarouselItem><img className="" className="object-cover" src={COOPHackathon} alt="CO-OP Hackathon" /></CarouselItem>
        <CarouselItem><img className="" className="object-cover" src={DebugOnHackathon} alt="DebugOn Hackathon" /></CarouselItem>
        <CarouselItem><img className="" className="object-cover" src={ICA2025Hackathon} alt="ICA 2025 Hackathon" /></CarouselItem>
        <CarouselItem><img className="" className="object-cover" src={StartUpHackathon} alt="Startup Hackathon" /></CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow" />
      <CarouselNext className="ml-[1380px] absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow" />
    </Carousel>
  </div>
</section> */}

      {/* ------------------- Main Content ------------------- */}
      <main className="pt-20 flex flex-col items-center text-center px-4">
        <section className="z-100">
          <p>4.7/5.0 on google.com</p>
          <h2 className="text-8xl mt-7  mb-4">
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
              className={"px-18px py-10px bg-blue-500 rounded-5px"}
              onClick={() => navigate("/register")}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              className={"px-[15px] py-[7px] text-black rounded-[5px]"}
              variant="outline"
              onClick={() => navigate("/events")}
            >
              View My Events
            </Button>
          </div>
        </section>
        <section className="w-[100%] h-[800px]">
          <div
            className="mt-[40px] flex gap-[470px]"
            style={{
              backgroundColor:
                "var(--token-7f644d3c-fafa-4df1-9482-cf8ab29882f1, rgb(7, 11, 21))",
              borderRadius: "16px",
              opacity: "1",
            }}
          >
            <div className="ssr-variant hidden-natfdx">
              <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                  <img className="h-[630px]" src={firstImage} alt="" />
                </div>
              </div>
            </div>
            <div className="ssr-variant hidden-natfdx">
              <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                  <img className="h-[630px]" src={secondImage} alt="" />
                </div>
              </div>
            </div>
            <div className="ssr-variant hidden-natfdx">
              <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                  <img className="h-[630px]" src={thirdImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="overflow-hidden bg-[#04060e] w-[1265px]">
          <p className=" mt-[120px] text-[20px]">
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
        <section>
          <div className="h-[600px] bg-[#04060e] text-white w-[1265px]">
            <h2>The smartest way to automate your tasks</h2>
            <div className="flex justify-center gap-10">
              <CardContainer className="inter-var w-90">
                <CardBody className="bg-[#070b15] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl  text-neutral-600 dark:text-white"
                  >
                    Make things float in air
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
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs "
                    >
                      Sign up
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
                    Make things float in air
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
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs "
                    >
                      Sign up
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
                    Make things float in air
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
                    >
                      Try now →
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs "
                    >
                      Sign up
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </section>
        <section>
          <div className="h-[700px] bg-[#04060e] text-white w-[1265px] px-10">
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
          <div className="w-[1265px] h-[800px]">
            <img
              className="absolute w-[1265px] h-[800px] -z-10"
              src={herossectionMiddleImage}
              alt=""
            />
            <div className="z-10 ">
              <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg ">
                <OrbitingCircles
                  className="h-[50px] w-[50px] border-none [animation-delay:-3s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.notion />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[50px] w-[50px] border-none [animation-delay:-9s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.whatsapp />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[50px] w-[50px] border-none [animation-delay:-15s]"
                  radius={180}
                  duration={20}
                >
                  <Icons.googleDrive />
                </OrbitingCircles>
                <OrbitingCircles
                  className="h-[50px] w-[50px] border-none [animation-delay:-21s]"
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
          <div className="w-[1265px] h-[600px] bg-[#04060e]">
            <div className="">
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
          <div className="w-[1265px] h-[200px] bg-[#04060e]">
            <ul className="flex">
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
          <div className="w-[1265px] h-[600px] bg-[#04060e]">
            <h2>Rules for registration</h2>
            <div className="flex justify-between">
              <div className="py-[100px] mt-30 bg-[#070b15]">
                <h3>Do</h3>
                <ul className="">
                  <li>sumit</li>
                  <li>sumit</li>
                  <li>sumit</li>
                </ul>
              </div>
              <div className="w-[300px] mt-30 bg-[#070b15]">
                <h3>Don't</h3>
                <ul className="">
                  <li>pradip</li>
                  <li>pradip</li>
                  <li>pradip</li>
                </ul>
              </div>
            </div>
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
              <h2 className=" text-4xl w-150 text-center">
                Enter your Email for getting Event Notification Timely
              </h2>
              <p className="mt-5">
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
                <div className="mt-5 flex gap-10">
                  <p>No credit card is required</p>
                  <p>Early access & Special offers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mx-30">
            <div>
              <h2 className="mt-50 text-center">CER</h2>
              <div className="flex gap-5 mt-10">
                <Facebook />
                <Linkedin />
                <X />
                <Instagram />
              </div>
            </div>
            <div className="flex gap-10 mt-50">
              <div>
                <h4 className="text-base mb-5">Main mages</h4>
                <div className="flex flex-col gap-5">
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
                    Home
                  </Link>
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
                    Features
                  </Link>
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
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
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-base mb-5">Utilities</h4>
                <div className="flex flex-col gap-5">
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
                    Event Schedule
                  </Link>
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
                    Download Certificate
                  </Link>
                  <Link
                    to="/"
                    className="text-white text-lg  no-underline"
                  >
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
