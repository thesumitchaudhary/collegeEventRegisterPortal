// src/components/CursorShadow.jsx
import { useEffect, useRef } from "react";

const CursorShadow = () => {
  const shadowRef = useRef(null);

  useEffect(() => {
    const moveShadow = (e) => {
      const shadow = shadowRef.current;
      if (shadow) {
        shadow.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
      }
    };
    window.addEventListener("mousemove", moveShadow);
    return () => window.removeEventListener("mousemove", moveShadow);
  }, []);

  return (
    <div
      ref={shadowRef}
      className="fixed top-0 left-0 w-[30px] h-[30px] rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out
                 bg-white/20 shadow-[0_0_15px_10px_rgba(0,0,0,0.15)] animate-pulse"
    ></div>
  );
};

export default CursorShadow;
