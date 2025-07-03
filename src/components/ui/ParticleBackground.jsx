import Particles from "react-tsparticles";

const ParticleBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: {
            value: "#ffffff00"
          }
        },
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#000000" },
          opacity: { value: 0.5, random: true },
          size: { value: 1.5, random: true },
          move: {
            enable: true,
            speed: 0.5,
            direction: "bottom",
            straight: false
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticleBackground;
