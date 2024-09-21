import PropTypes from "prop-types"
import './RestaurantAndCuisine.css'
import { useEffect, useRef, useState } from "react"

export const ItemScroller = ({ className = "" }) => {

  //Data
  const SAMPLE_DATA = [
    { image: "/biriyani-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹70", itemName: "Biriyani" },
    { image: "/noodles-1@2x.png", discountPercentage: "15% OFF", upToAmount: "Up to ₹90", itemName: "Noodles" },
    { image: "/burgers-1@2x.png", discountPercentage: "35% OFF", upToAmount: "Up to ₹120", itemName: "Burgers" },
    { image: "/pizza-5@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Pizzas" },
    { image: "/rolls-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Rolls" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
    { image: "/parotta-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Parotta" },
  ];

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
      <div className="px-[1rem] md:px-[5rem] lg:px-[25rem] pt-[2rem]">
        <div className="flex items-center justify-between">
          <h3 className="text-dark font-bold text-[1rem]">
            Hello, what's on your mind?
          </h3>
          <div className="leftAndRightNavigationButtons flex gap-2">
              <button onClick={() => handleScroll(-300)} className="cursor-pointer buttonLeft top-[0rem] left-[0rem] w-[1.625rem] h-[1.625rem] rounded-xl" style={{ backgroundColor: buttonColor.left }}>
                <img src="/arrow-left.svg" alt="" />
              </button>
              <button onClick={() => handleScroll(300)} className="cursor-pointer buttonRight top-[0rem] left-[2.063rem] w-[1.625rem] h-[1.625rem] rounded-xl" style={{ backgroundColor: buttonColor.right }}>
                <img src="/arrow-right.svg" alt="" />
              </button>
            </div>
        </div>

        {/* Scroller */}
        <div className="scrollSection2 flex flex-col items-center py-[2rem] ">
          <div
            ref={containerRef}
            className="scroll-container w-full"
            style={{
              // width: "900px",
              overflowX: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            <div className="flex flex-row justify-start gap-[2.7rem] max-w-full text-[1.413rem] text-white">
              {SAMPLE_DATA.map((item, index) => (
                <div key={index} className="w-[10rem] flex flex-col">
                  <div className="itemCard overflow-hidden w-[6rem] h-[5rem] md:w-[8rem] md:h-[6rem]" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="hotelLabel bottom-0 w-full text-center py-[.5rem]">
                    <b className="font-normal text-item-tint text-lg">
                      {item.itemName}
                    </b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ItemScroller.propTypes = {
  className: PropTypes.string,
};