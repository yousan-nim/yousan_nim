import React from "react";

const HeaderCoolWord = () => {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative h-[130vh] lg:h-screen"
    >
      <div className="relative w-[95%] md:w-[80%] xl:max-w-screen-2xl mx-auto h-full">
        <div
          className="absolute z-10 left-0 top-[30%] sm:top-[18%] w-full flex justify-center xl:justify-start"
          aria-labelledby="hero-title"
        >
          <div className="cq mx-0 max-w-full md:w-[min(92vw,720px)] h-full">
            <h1
              id="hero-title"
              className="antialiased font-extrabold uppercase tracking-tight text-white m-auto"
            >
              <span
                className="
          block w-full text-center xl:text-left
          text-[clamp(24px,5vw,56px)] leading-[0.95]
          text-transparent bg-clip-text
          bg-gradient-to-r from-white/20 via-white to-white/20
          drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]
        "
              >
                Crafting code into
              </span>

              <span
                className="
          block w-full text-center xl:text-left
          text-[clamp(40px,10vw,120px)] leading-[0.8]
          lg:text-[clamp(40px,10vw,100px)]
          text-transparent bg-clip-text
          bg-gradient-to-br from-white/30 via-white to-white/20
          drop-shadow-[0_1px_0_rgba(255,255,255,0.2)] 
        "
              >
                experiences
              </span>
            </h1>

            <p
              className="
        w-full m-auto lg:w-full mt-4 xl:mt-6
        max-w-[60ch]
        text-white/90 uppercase font-semibold
        text-[clamp(11px,2.5vw,18px)] leading-5
        text-center xl:text-left lg:ml-0
      "
            >
              I merge creativity with logic to build solutions that inspire and
              endure.
            </p>
          </div>
        </div>
      </div>

      <div
        className="
    absolute inset-x-0 bottom-12 sm:bottom-16 md:bottom-20
    w-[min(95%,800px)] mx-auto
    lg:w-[min(90%,1000px)] xl:w-[min(85%,1200px)]
    text-center
    px-4
  "
      >
        <h1
          className="
            rounded-xl
            text-[clamp(28px,6vw,52px)] leading-[0.9]
            uppercase font-black
            text-transparent bg-clip-text
            bg-gradient-to-br from-white/30 via-white to-white/20 
            drop-shadow-[0_1px_0_rgba(255,255,255,0.25)]
          "
        >
          Pongchanok Nuamteam
        </h1>

        <p
          className="
      mt-3 md:mt-4
      text-[clamp(14px,3.5vw,20px)] leading-snug
      uppercase font-black
      text-transparent bg-clip-text
      bg-gradient-to-br from-white/30 via-white to-white/20
      drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]
    "
        >
          Full-Stack Developer & AI Engineer
        </p>

        <div
          className="
      mt-5 md:mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-3
    "
        >
          <a
            href="#contact"
            className="
        inline-flex items-center justify-center rounded-md
        px-4 md:px-5 py-2 md:py-2.5
        text-xs md:text-sm font-medium
        bg-white/20 border border-white/30 text-white
        hover:bg-white/30 transition-all duration-200
      "
          >
            Contact
          </a>

          <a
            href="#projects"
            className="
        inline-flex items-center justify-center rounded-md
        px-4 md:px-5 py-2 md:py-2.5
        text-xs md:text-sm font-medium
        bg-white/5 border border-white/10 text-slate-200
        hover:bg-white/10 transition-all duration-200
      "
          >
            Projects
          </a>

          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="
        inline-flex items-center justify-center rounded-md
        px-4 md:px-5 py-2 md:py-2.5
        text-xs md:text-sm font-medium
        bg-transparent border border-white/15 text-white/90
        hover:bg-white/10 transition-all duration-200
      "
            aria-label="GitHub"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeaderCoolWord;
