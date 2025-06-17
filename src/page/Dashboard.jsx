import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Hackathon Images
import herossectionImage from "../images/herossection-image.avif";
import firstImage from "../images/1-image.avif";
import secondImage from "../images/2-image.avif";
import thirdImage from "../images/3-image.avif";
import AICreativeMediaHackathon from "../images/AICreativeMediaHackathon.jpeg";
import BiotechnologyBreakThroughHackathon from "../images/BiotechnologyBreakThroughHackathon.jpeg";
import COOPHackathon from "../images/CO-OPHackathon.jpeg";
import DebugOnHackathon from "../images/DebugOnHackathon.jpeg";
import ICA2025Hackathon from "../images/ICA2025Hackathon.jpeg";
import StartUpHackathon from "../images/StartUpHackathon.jpeg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Meteors } from "../components/ui/Meteors";
// import './src/dash.css'

export default function Dashboard() {
  const navigate = useNavigate();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
  return (
    <div className="relative w-full text-white min-h-screen">
      <Meteors number={30}  />
      <img className="absolute w-[1405px] h-[1000px] -z-10" src={herossectionImage} alt="" />
      {/* ------------------- Header ------------------- */}
      <header className="w-full shadow-sm px-[35px] top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">C E R</h1>
          <nav className="flex gap-[20px] text-sm font-medium">
            <Link to="/" className="text-white font-bold no-underline">Home</Link>
            <Link to="/events" className="text-white font-bold no-underline">Events</Link>
            <Link to="/about" className="text-white font-bold no-underline">About Us</Link>
            <Link to="/contact" className="text-white font-bold no-underline">Contact Us</Link>
          </nav>
          <div>
            <button className="text-black bg-[#ffffff] px-[15px] py-[5px] rounded-[7px] font-[700] tracking-[1px]">SignIn</button>
          </div>
        </div>
      </header>
      <div className="h-[50px]"></div>

      {/* ------------------- Carousel ------------------- */}
   {/* <section className="w-full max-w-3xl mx-auto mt-10 relative">
  <div ref={emblaRef} className="overflow-hidden">
    <Carousel className="h-64">
      <CarouselContent>
        <CarouselItem><img className="object-cover" src={AICreativeMediaHackathon} alt="AI Hackathon" /></CarouselItem>
        <CarouselItem><img className="object-cover" src={BiotechnologyBreakThroughHackathon} alt="Biotech Hackathon" /></CarouselItem>
        <CarouselItem><img className="object-cover" src={COOPHackathon} alt="CO-OP Hackathon" /></CarouselItem>
        <CarouselItem><img className="object-cover" src={DebugOnHackathon} alt="DebugOn Hackathon" /></CarouselItem>
        <CarouselItem><img className="object-cover" src={ICA2025Hackathon} alt="ICA 2025 Hackathon" /></CarouselItem>
        <CarouselItem><img className="object-cover" src={StartUpHackathon} alt="Startup Hackathon" /></CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow" />
      <CarouselNext className="ml-[1380px] absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow" />
    </Carousel>
  </div>
</section> */}


      {/* ------------------- Main Content ------------------- */}
      <main className="pt-20 flex flex-col items-center text-center px-4">
        <p>4.7/5.0 on google.com</p>
        <h2 className="text-3xl font-[<value>] md:text-4xl font-bold text-[6rem] p-[20px] mb-4">
          Register for Upcoming College Events
        </h2>
        <p className="text-gray-400 max-w-md mb-6">
          Your all-in-one platform for college event discovery.<br />
          Simple registrations, instant updates, zero hassle.<br />
          Because every great campus story starts with showing up.<br />
        </p>
        <div className="flex gap-4">
          <Button size="lg" className={'px-[15px] py-[7px] rounded-[5px]'} onClick={() => navigate("/register")}>Register Now</Button>
          <Button size="lg"  className={'px-[15px] py-[7px] rounded-[5px]'}  variant="outline" onClick={() => navigate("/events")}>View My Events</Button>
        </div>

        {/* <div className="framer-1vx2gfm">
          <div className="ssr-variant hidden-natfdx">
            <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                    <img src={firstImage} alt="" />
                </div>
            </div>
          </div>
            <div className="ssr-variant hidden-natfdx">
            <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                    <img src={secondImage} alt="" />
                </div>
            </div>
          </div>
            <div className="ssr-variant hidden-natfdx">
            <div className="framer-btk4y7 will-change-transform opacity-[1] skew-y-[8deg]">
                <div className="absolute rounded-[inherit] top-[0] right-[0] bottom-[0] left-[0]">
                    <img src={thirdImage} alt="" />
                </div>
            </div>
          </div> */}
        {/* </div> */}
      </main>

      {/* ------------------- Footer (optional) ------------------- */}
      
      <footer className="mt-20 py-10 text-center text-gray-400">
        &copy; 2025 College Event Registration Portal. All rights reserved.
      </footer> 
     
    </div>
  );
}
