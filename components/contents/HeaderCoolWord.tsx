import React from "react";

const HeaderCoolWord = () => {
  return (
    <section
      className="absolute z-10 left-0 top-[16%] sm:top-[20%] w-full flex"
      aria-labelledby="hero-title"
    >
      <div className="cq mx-0 max-w-full md:w-[min(92vw,450px)] h-full m-auto">
        <h1
          id="hero-title"
          className="antialiased font-extrabold uppercase tracking-tight text-white m-auto"
        >
          <span
            className="block w-full xl:text-justify after:content-[''] after:inline-block after:w-full 
                       text-[clamp(24px,10cqw,20px)] leading-4 text-center
                       xl:text-[clamp(24px,10cqw,40px)] xl:leading-0"
          >
            Crafting code into
          </span>
          <span
            className="block w-full
                    text-red-500 text-[clamp(32px,16cqw,48px)] leading-5 text-center
                      xl:text-left xl:text-[clamp(32px,16cqw,76px)] xl:leading-[0.9]"
          >
            experiences
          </span>
        </h1>

        <p className="mt-3 xl:mt-0 text-white/90 uppercase font-semibold text-[clamp(12px,3.5cqw,18px)] leading-4 text-center xl:text-start xl:leading-5">
          I merge creativity with logic to build solutions that inspire and
          endure.
        </p>
      </div>
    </section>
  );
};

export default HeaderCoolWord;
