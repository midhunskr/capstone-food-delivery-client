import PropTypes from "prop-types";
import './RestaurantAndCuisine.css'
import { useEffect, useRef, useState } from "react";

export const CuisineListing = () => {

  //Data
  const SAMPLE_DATA = [
    { image: "/punjabi.png", cuisineName: "Punjabi", hotelName: "Gurji Dhaba" },
    { image: "/chinese.png", cuisineName: "Chinese", hotelName: "Chiyang" },
    { image: "/south-indian.png", cuisineName: "South Indian", hotelName: "Saravana Bhavan" },
    { image: "/sea-food.png", cuisineName: "Seafood", hotelName: "Arabian Palace" },
  ];

  //Scroller
  const [scrollPosition, setScrollPosition] = useState(0)
  const [buttonColor, setButtonColor] = useState({ left: '#CACACA', right: '#CACACA' })

  const containerRef = useRef();

  const handleScroll = (scrollAmount) => {
    const container = containerRef.current;

    // Calculate new scroll position with boundary checks
    const newScrollPosition = Math.max(
      0,
      Math.min(
        scrollPosition + scrollAmount,
        container.scrollWidth - container.clientWidth
      )
    );

    // Update state and apply new scroll position
    setScrollPosition(newScrollPosition);
    container.scrollLeft = newScrollPosition;
  };

  //Find scroll limit for changing scroll navigation buttons color accordingly
  useEffect(() => {
    const container = containerRef.current;

    // Check if the scroll position is at the left or right limit
    const atLeftLimit = container.scrollLeft === 0;
    const atRightLimit = container.scrollLeft === container.scrollWidth - container.clientWidth;

    setButtonColor({
      left: atLeftLimit ? '#E0E0E0' : '#CACACA',
      right: atRightLimit ? '#E0E0E0' : '#CACACA',
    });
  }, [scrollPosition]);

  return (
    <>
      <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] pt-[1rem]">
        <div className="flex items-center justify-between">
          <h3 className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem]">
            Top Cuisines near by
          </h3>
          <div className="leftAndRightNavigationButtons flex flex-row gap-2 sm:hidden">
            <button onClick={() => handleScroll(-300)} className="cursor-pointer buttonLeft top-[0rem] left-[0rem] w-[1.625rem] h-[1.625rem] rounded-xl" style={{ backgroundColor: buttonColor.left }}>
              <img src="/arrow-left.svg" alt="" />
            </button>
            <button onClick={() => handleScroll(300)} className="cursor-pointer buttonRight top-[0rem] left-[2.063rem] w-[1.625rem] h-[1.625rem] rounded-xl" style={{ backgroundColor: buttonColor.right }}>
              <img src="/arrow-right.svg" alt="" />
            </button>
          </div>
        </div>

        {/* Scroller */}
        <div className="scrollSection2 flex flex-col py-[2rem]">
          <div
            ref={containerRef}
            style={{
              overflowX: "scroll",
              scrollBehavior: "smooth",
            }}
            className="scroll-container w-full"
          >
            <div className="flex flex-row sm:gap-[4.818rem] text-[1.413rem]">
              {SAMPLE_DATA.map((item, index) => (
                <div key={index} className="w-[15.2rem] shrink-0 flex flex-col items-start justify-start gap-[1.062rem]">
                  <div className="cuisineCard rounded-[1.5rem] relative overflow-hidden w-[13rem] sm:w-[15rem] h-[11rem] text-bg-white shadow-md" style={{ border: "8px solid white", backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <b className="w-[10rem] top-[7rem] left-[1rem] relative inline-block z-[2] mq450:text-[1.125rem]">
                      {item.cuisineName}
                    </b>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[0.75rem]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CuisineListing.propTypes = {
  className: PropTypes.string,
};