import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import AddButton from "../golbals/Buttons/AddButton";
import DownloadButton from "../golbals/Buttons/DownloadButton";

const PreviewSlider = ({ slides, selectPrevImage }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate("/task-manager/preview");
  };

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => {
          selectPrevImage(slides[swiper.activeIndex]);
          console.log("Current slide index:", swiper);
        }}
        className="w-full h-full overflow-hidden"
      >
        {slides?.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="w-full h-full relative  ">
              <img className="w-full h-full object-cover" src={slide} alt="" />
              <div className=" cursor-pointer absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/50  opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <button
                    onClick={handlePlay}
                    className="w-[100px] h-[100px] bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <FaPlay className="text-white text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
      </Swiper>

      {/* Optional bottom navigation bar */}
      <div className="flex gap-4 items-center justify-between w-[400px] h-[50px] bg-[#716D9C]/40 backdrop-blur-md radius absolute z-20 bottom-0 left-0 px-4">
        <div className="flex items-center gap-2">
          <button
            ref={prevRef}
            className="transtion cursor-pointer hover:bg-white/30 backdrop-blur-md p-1 rounded-full"
          >
            <img
              src="/icons/Left Arrow.svg"
              alt="Previous"
              className="w-4 h-4"
            />
          </button>
          <button
            ref={nextRef}
            className="transtion cursor-pointer hover:bg-white/30 backdrop-blur-md p-1 rounded-full"
          >
            <img
              src="/icons/Right Arrow.svg"
              alt="Previous"
              className="w-4 h-4"
            />
          </button>
        </div>
        <div className="flex gap-5 ">
          <AddButton click={() => {}} />
          <DownloadButton click={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default PreviewSlider;
