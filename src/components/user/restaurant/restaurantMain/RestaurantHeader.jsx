import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../config/axioInstance";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, addToCart } from "../../../../redux/features/cartSlice";

export const RestaurantHeader = () => {

  //Data
  const SAMPLE_DATA = [
    { image: "/biriyani-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹70", itemName: "Biriyani" },
    { image: "/noodles-1@2x.png", discountPercentage: "15% OFF", upToAmount: "Up to ₹90", itemName: "Noodles" },
    { image: "/burgers-1@2x.png", discountPercentage: "35% OFF", upToAmount: "Up to ₹120", itemName: "Burgers" },
    { image: "/pizza-5@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Pizzas" },
    { image: "/rolls-1@2x.png", discountPercentage: "10% OFF", upToAmount: "Up to ₹40", itemName: "Rolls" }
  ];

  const [scrollPosition, setScrollPosition] = useState(0)
  const [buttonColor, setButtonColor] = useState({ left: '#CACACA', right: '#CACACA' })
  const containerRef = useRef();
  const { id } = useParams() // Extract restaurant ID from URL
  const [restaurant, setRestaurant] = useState({}) //Setting State for Restaurant Fetcher
  const [quantityItems, setQuantityItems] = useState({});
  const cartItems = useSelector((state) => state.cart.cartItems) //Counter Redux
  console.log(cartItems);
  


  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Scroller
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

  //Scroll button
  useEffect(() => {
    if (containerRef.current) {  // Check if containerRef is not null
      const container = containerRef.current;
      const atLeftLimit = container.scrollLeft === 0;
      const atRightLimit = container.scrollLeft === container.scrollWidth - container.clientWidth;
      setButtonColor({
        left: atLeftLimit ? '#E0E0E0' : '#CACACA',
        right: atRightLimit ? '#E0E0E0' : '#CACACA',
      });
    }
  }, [scrollPosition]);

  //Fetch backend data
  const fetchRestaurant = async () => {
    try {
      const response = await axiosInstance({
        url: `/restaurant/${id}`,  // Ensure this URL is correct
        method: 'GET',
        withCredentials: true
      });
      // Check if the response contains the expected data
      if (response?.data?.restaurant) {
        setRestaurant(response.data.restaurant);
      } else {
        console.log("No restaurant data found"); // Log if restaurant data is missing
        setRestaurant(null); // Fallback if restaurant not found
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error); // Log any errors
      toast.error('Error fetching restaurant data');
    }
  };

  useEffect(() => {
    if (id) {
      fetchRestaurant(); // Fetch restaurant when component mounts
    }
  }, [id]);

  // Function to handle button click and show quantity selector
  const handleAddToCart = (item) => {

    setQuantityItems((prevState) => ({
      ...prevState,
      [item._id]: { ...item, quantity: 1 },
    }));

    dispatch(addToCart(item))

  };

  return (
    <>
      <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] py-[1rem] bg-bg-white text-dark">
        <div className="flex items-center justify-between">
          {restaurant ? (
            <h3 className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem] py-[1rem]">
              {restaurant.name}
            </h3>
          ) : (
            <p>Loading restaurant data...</p>
          )}
        </div>

        <div className="shrink w-full py-[1.2rem] flex items-center px-[1.2rem] rounded-3xl" style={{ background: "linear-gradient(180deg, rgba(167,208,139,1) 0%, rgba(104,177,159,1) 100%)" }}>
          <div className="bg-bg-white shrink px-[1rem] py-[1rem] w-full flex-row rounded-2xl shadow-lg">
            <div className="flex items-center ">
              <div className="w-[1.7rem] h-[1.7rem] rounded-full bg-tradewind flex justify-center">
                <img className="w-[1.2rem]" src="/star.svg" alt="" />
              </div>
              <div>
                <b className="text-sm px-[.5rem]">4.2 <b className="text-label-tint font-normal">(60 ratings)</b></b>
              </div>
            </div>
            <div className="text-sm text-jaffa py-[1rem]">
              <b>{restaurant.description}</b>
            </div>
            <div className="flex items-center">
              <div>
                <img className="w-[.5rem] pt-[.5rem]" src="/connecting-line.svg" alt="" />
              </div>
              <div className="flex flex-col gap-[2.5rem]">
                <div className="flex items-center">
                  <b className="text-sm text-dark px-[1rem]">Outlet</b>
                  <b className="text-sm text-label-tint font-normal">{restaurant.location}</b>
                </div>
                <b className="flex flex-row text-sm text-dark px-[1rem]">25-30 mins</b>
              </div>
            </div>
            <div className="py-[1rem] flex items-center">
              <img className="w-5 text-label-tint" src="/delivery.svg" alt="" />
              <b className="text-sm text-label-tint font-light px-[1rem]">Order above 149 eligible for free delivery</b>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-[2rem]">
          <h3 className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem]">
            Deals for you
          </h3>
          <div className="leftAndRightNavigationButtons flex flex-row gap-2">
            <button onClick={() => handleScroll(-320)} className="cursor-pointer buttonLeft top-[0rem] left-[0rem] w-[1.625rem] h-[1.625rem] rounded-xl" style={{ backgroundColor: buttonColor.left }}>
              <img src="/arrow-left.svg" alt="" />
            </button>
            <button onClick={() => handleScroll(320)} className="cursor-pointer buttonRight top-[0rem] left-[2.063rem] w-[1.625rem] h-[1.625rem] rounded-xl" style={{ backgroundColor: buttonColor.right }}>
              <img src="/arrow-right.svg" alt="" />
            </button>
          </div>
        </div>

        <div className="scrollSection2 flex flex-col py-[1rem]">
          <div
            ref={containerRef}
            className="scroll-container w-full"
            style={{
              overflowX: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            <div className="flex flex-row justify-start gap-[10rem] max-w-full text-[1.413rem] text-white">
              {SAMPLE_DATA.map((item, idx) => (
                <div key={`${item.itemName}-${idx}`} className="w-[10rem] flex flex-col">
                  <div className="w-[18rem] rounded-2xl h-[7rem] border-[.2rem] border-solid border-selection-tint" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="flex items-center justify-center gap-4 py-[2rem]">
          <div className="w-[7rem] sm:w-[31rem] h-[.1rem] bg-selection-tint" />
          <div>
            <b>M E N U</b>
          </div>
          <div className="w-[7rem] sm:w-[31rem] h-[.1rem] bg-selection-tint" />
        </div>

        <div className="w-[70.5rem] flex flex-col px-[0rem] pb-[0rem] box-border max-w-full text-left text-[1.5rem]">
          <div className="h-full pt-[0rem] px-[0rem] pb-[0rem] box-border gap-[2.012rem] max-w-full ">
            <h3 className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem]">
              Top Picks
            </h3>
          </div>

          <div className="flex flex-col gap-6 sm:flex sm:flex-row sm:justify-between py-[1rem] border-b-[.1rem] border-solid border-selection-tint pb-[2rem]">
            {restaurant.menuItems && restaurant.menuItems.length > 0 ? (
              // Shuffle the menu items array and then slice to get up to 3 items
              [...restaurant.menuItems]
                .sort(() => Math.random() - 0.5) // Shuffle array
                .slice(0, 3) // Take up to 3 items
                .map((item) => (
                  <div key={item._id} className="flex-col topPicksCard sm:w-[20rem] h-[7rem] sm:h-[11rem] flex relative overflow-hidden rounded-3xl text-bg-white shadow-md" style={{
                    border: "8px solid white", backgroundImage: `url(${item.image})`, backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                    <b className="top-[2rem] left-[.7rem] sm:top-[5.8rem] sm:left-[1rem] relative inline-block z-[2] text-2xl">{item.name.length < 16 ? item.name : (item.name.slice(0, 15) + '....')}</b>
                    <div className="top-[2rem] left-[.7rem] sm:top-[6rem] sm:left-[1rem] text-mid relative z-[2]">
                      {"₹" + item.price || "Up to ₹50"} {/* Sample default */}
                    </div>
                  </div>
                ))
            ) : (
              <p>No menu items available</p> // Fallback in case of no menu items
            )}
          </div>

          <div className="divide-y-[.3rem] rounded-md divide-solid divide-selection-tint">
            {[
              {
                title: "Recommended",
                filter: item => item.recommended,
                img: item => (item.veg ? "/veg.svg" : "/non-veg.svg"),
                alt: item => (item.veg ? "Veg" : "Non-Veg"),
              },
              {
                title: "Veg",
                filter: item => item.veg,
                img: () => "/veg.svg",
                alt: () => "Veg",
              },
              {
                title: "Non-Veg",
                filter: item => !item.veg,
                img: () => "/non-veg.svg",
                alt: () => "Non-Veg",
              },
              ...[...new Set(restaurant.menuItems ? restaurant.menuItems.map(item => item.category) : "")]
                .filter(Boolean)
                .map(category => ({
                  title: category,
                  filter: item => item.category === category,
                  img: item => (item.veg ? "/veg.svg" : "/non-veg.svg"),
                  alt: item => (item.veg ? "Veg" : "Non-Veg"),
                })),
            ].map((section, index) => {
              const filteredItems = restaurant.menuItems ? restaurant.menuItems.filter(section.filter) : "";
              return filteredItems.length > 0 && (
                <div key={index} className="collapse bg-bg-white rounded-none">
                  <input type="radio" name="my-accordion-1" defaultChecked={index === 0} />
                  <div className="collapse-title text-xl font-bold text-dark">
                    <b className="sectionAndCount">
                      {section.title} ({filteredItems.length})
                    </b>
                  </div>
                  <div className="collapse-content text-dark">
                    {filteredItems.map((item, index) => (
                      <div
                      key={item._id}
                      className={`flex flex-col sm:flex sm:flex-row sm:items-center justify-between pb-[2rem] sm:pb-[4rem] py-[2rem] ${
                        index !== filteredItems.length - 1 ? 'border-b border-solid border-selection-tint' : ''
                      }`}
                    >
                        {/* Left Content Section */}
                        <div className="flex flex-col items-start gap-2 sm:w-2/3">
                          <div className="flex gap-2 font-bold">
                            <img className="w-5" src={section.img(item)} alt={section.alt(item)} />
                            {item.name}
                          </div>
                          <div className="text-lg flex items-center gap-3 py-2">
                            ₹{item.price}
                            <div className="sm:hidden flex gap-2">
                              <svg className="w-5 h-5 fill-tradewind" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                              <b className="text-lg font-medium">4.2 (12)</b>
                            </div>
                            <div className="hidden text-label-tint font-bold sm:flex gap-1">
                              <img className="w-5" src="/offer-tag.svg" alt="" />
                              <b>50% OFF USE FIRSTBITE</b>
                            </div>
                          </div>
                          <div className="sm:hidden text-label-tint font-bold flex gap-1 text-[1rem] pb-[2rem] sm:pb-[0rem]">
                            <img className="w-5" src="/offer-tag.svg" alt="" />
                            <b>50% OFF USE FIRSTBITE</b>
                          </div>
                          <div className="hidden sm:flex gap-2">
                            <svg className="w-5 h-5 fill-tradewind" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <b className="text-lg font-medium">4.2 (12)</b>
                          </div>
                          <div className="hidden sm:inline-block text-mid text-label-tint sm:w-full py-5">
                            {item.description}
                          </div>
                        </div>

                        {/* Right Background Image Section with Button */}
                        <div className="flex flex-col items-center justify-end relative h-[10rem] sm:w-[14rem] sm:h-[14rem] rounded-3xl overflow-visible shadow-md z-1 "
                          style={{
                            border: "10px solid white",
                            backgroundImage: `url(${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'left center',
                            backgroundRepeat: "no-repeat"
                          }}>

                          {/* Button or Quantity Section */}
                          {!cartItems.find((i) => i._id === item._id) ? (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="addToCartButton absolute top-[5rem] left-[14.5rem] w-[3rem] h-[3rem] flex items-center justify-center sm:left-[2rem] sm:top-[11.5rem] sm:w-[9rem] sm:h-[3rem] text-mid font-bold bg-tradewind text-bg-white sm:bg-bg-white sm:text-tradewind border-[.3rem] border-solid border-white px-3 py-1 rounded-full sm:rounded-xl shadow-md z-2 cursor-pointer"
                            > 
                              <img className="w-[1.5rem] sm:hidden" src="/add-symbol.svg" alt="" />
                              <b className="hidden sm:inline-block">Add to Cart</b>
                            </button>
                            
                          ) : (
                            <div className="absolute top-[5rem] left-[8rem] sm:top-[11.5rem] sm:left-[2rem] w-[9rem] h-[3rem] flex items-center px-[1rem] justify-between text-tradewind text-mid font-bold gap-2 bg-bg-white border-[.3rem] border-solid sm:border-white rounded-xl shadow-lg cursor-pointer">
                              <button
                                onClick={() => {
                                  dispatch(decrement(item._id));
                                }}
                                className="decrementButton bg-white px-2 py-1 rounded-md border-[.1rem] border-solid border-disabled-tint text-tradewind cursor-pointer"
                              >
                                -
                              </button>

                              <span className="quantityValue font-bold">
                                {cartItems.find(cartItem => cartItem._id === item._id)?.quantity || 1}
                                {console.log(cartItems)
                                }
                              </span>

                              <button
                                onClick={() => {
                                  handleAddToCart(item); // Ensure this function is called
                                  dispatch(increment(item._id));
                                }}
                                className="incrementButton bg-white px-2 py-1 rounded-md border-[.1rem] border-solid border-disabled-tint text-tradewind cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                        {/* Sticky 'View Cart' Button */}
                        {cartItems.length > 0 && (
                          <div className="fixed bottom-0 left-[3.8rem] sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50">
                            <button
                              onClick={() => {
                                // Ensure all items have valid properties
                                const validItems = cartItems.every(
                                  (item) => item._id && item.name && item.price
                                );
                                if (validItems) {
                                  navigate(`/user/restaurant/${id}/checkout`);
                                } else {
                                  console.error('Cart contains invalid items');
                                }
                              }}
                              className="bg-tradewind text-white w-[16rem] h-[4rem] sm:w-full sm:h-full sm:px-[8rem] sm:py-[1.3rem] rounded-t-3xl shadow-2xl sm:flex sm:items-center sm:gap-2 cursor-pointer cartButton border-l-[.5rem] border-r-[.5rem] border-t-[.5rem] border-solid border-white"
                            >
                              <b className="text-lg sm:text-xl">View Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})</b>

                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

RestaurantHeader.propTypes = {
  className: PropTypes.string,
}
