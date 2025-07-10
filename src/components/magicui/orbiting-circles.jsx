// components/magicui/HalfOrbitingCircle.jsx
import React, { useEffect, useRef } from "react";

export function OrbitingCircles({ radius = 150, duration = 20, children, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.style.animationDelay = `${delay}s`;
      el.style.animationDuration = `${duration}s`;
    }
  }, [delay, duration]);

  return (
    <div
      ref={ref}
      className="absolute animate-halfOrbit origin-center"
      style={{
        transformOrigin: `0 ${radius}px`,
        top: 0,
        left: "50%",
      }}
    >
      <div
        className="rounded-full flex items-center justify-center bg-black"
        style={{
          width: "4rem",
          height: "4rem",
          transform: `translate(-50%, -${radius}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
