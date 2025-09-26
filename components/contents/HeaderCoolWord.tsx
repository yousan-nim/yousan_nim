import { style } from "@/style";
import React from "react";

const HeaderCoolWord = () => {
  return (
    <div
      className={`absolute z-10 top-[20%] left-0 max-w-[430px]`}
    >
      <div className="w-full text-justify text-white uppercase text-[52px] leading-11 font-bold p-0 m-0">
        Crafting code into
      </div>

      <div className="w-full text-start text-red-500 uppercase text-[68px] leading-11 font-bold py-[4px] m-0 ">
        experiences
      </div>

      <div className="text-white font-semibold uppercase text-xl leading-5 text-start py-2">
        I merge creativity with logic to build
        solutions that inspire and endure.
      </div>
    </div>
  );
};

export default HeaderCoolWord;
