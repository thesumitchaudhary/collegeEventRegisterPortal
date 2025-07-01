import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function BlogAdmin(){
  return(
    <div>
                <header className="flex justify-between">
                    <h1>CER</h1>
                    <nav className="text-black flex gap-10">
                        <Link >Home</Link>
                        <Link>Event control</Link>
                        <Link>blog control</Link>
                        <Link>resource</Link>
                    </nav>
                </header>
                <main></main>
                <footer></footer>
            </div>
  )
}