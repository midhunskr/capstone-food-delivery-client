import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from "../../services/userApi";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { axiosInstance } from "../../config/axioInstance";
import { clearUser } from "../../redux/features/userSlice";

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Width will be responsive for smaller screens
  maxWidth: 450, // Max width for larger screens
  p: 4,
}

export const UserHeader = () => {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [searchResults, setSearchResults] = useState([]); // Search results state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleLogout = async () => {
    try {
      await userLogout(setUser, navigate, dispatch); // Call userLogout with setUser and navigate
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsProfileMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsProfileMenuOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make the API call to search endpoint
      const response = await axiosInstance({
        url: 'restaurant/search/:id',
        method: 'GET',
        withCredentials: true,
        params: { query: searchQuery }
      });
      setSearchResults(response.data); // Set the results into state
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false); // Stop the loader after response
    }
  }

  return (
    <header className="shadow-[0px_4px_45.6px_-19px_rgba(0,_0,_0,_0.25)] h-[5rem] px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] bg-bg-white flex flex-row items-center justify-between pt-[1.625rem] pb-[1.5rem] gap-[1rem] sm:gap-[5.35rem] top-[0] z-[99] sticky max-w-full text-left text-[1.031rem] text-text-dark">
      <div className="flex w-7/12 justify-between">
        <div className="flex flex-col items-start justify-start pt-[0.118rem] px-[0rem] pb-[0rem]">
          <div className="w-full flex flex-row items-center justify-between gap-[0.267rem]">
            <Link to={'/user'} >
              <div className="hidden sm:flex flex-col items-start justify-end">
                <img
                  className="h-[3rem]"
                  loading="lazy"
                  alt=""
                  src="/brand-logo.svg"
                />
              </div>
            </Link>
            <Link to={'/user'} >
              <div className="flex flex-col items-start justify-end sm:hidden">
                <img
                  className="h-[5rem]"
                  loading="lazy"
                  alt=""
                  src="/brand-logo-text-only.svg"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="hidden w-[16.444rem] flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[0.375rem] box-border gap-[1rem] text-center">
          <div className="w-[3.313rem] flex flex-col items-end justify-start gap-[0.318rem]">
            <Link to={"/"}><div className="self-stretch relative leading-[121.88%] font-semibold inline-block min-w-[3.313rem] text-dark">Home</div></Link>
            <div className="self-stretch h-[0.125rem] relative border-dark border-t-[2px] border-solid box-border" />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start pt-[0.218rem] px-[0rem] pb-[0rem] text-left text-[0.875rem] text-gray-100 font-quicksand">
            <div className="self-stretch h-[1.125rem] relative">
              <b className="absolute top-[0rem] left-[0rem] inline-block w-[10.063rem] h-[1.125rem] whitespace-nowrap text-label-tint font-normal">
                123, Street name, City....
              </b>
              <img
                className="absolute top-[0.35rem] left-[10.519rem] w-[0.688rem] h-[0.438rem]"
                alt=""
                src="/frame-3804.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="overflow-hidden flex flex-row pt-[0.006rem] px-[0rem] pb-[0.012rem] box-border gap-[1.681rem] max-w-full text-[1.2rem]">
            <div onClick={handleOpen} className="flex flex-row items-center sm:items-start justify-start gap-[1.087rem] cursor-pointer">
              <div className="flex flex-col items-start justify-start pt-[0.325rem] px-[0rem] pb-[0rem]">
                <img
                  className="w-[0.9rem] h-[0.9rem] relative"
                  alt=""
                  src="/frame-3796.svg"
                />
              </div>
              <a className="[text-decoration:none] text-sm sm:text-xl relative font-semibold text-[inherit] inline-block text-dark">
                Search
              </a>
            </div>
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box className="bg-bg-white rounded-xl" sx={style}>
                <div className="search-modal">
                  <form className="flex gap-2 items-center" onSubmit={handleSearchSubmit}>
                    <div>
                      <input
                        className="bg-white border-[.1rem] border-selection-tint rounded-md p-1 text-label-tint"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for items..."
                      />
                    </div>
                    <div>
                      <button className="p-1 rounded-md" type="submit">Search</button>
                    </div>
                  </form>

                  {isLoading && <p>Loading...</p>}

                  <div className="search-results pt-[1rem] bg-bg-white flex flex-col gap-3">
                    {searchResults.length > 0 ? (
                      searchResults.map((item) => (
                        <div key={item._id} className="search-item border-[.1rem] border-solid rounded-lg border-tradewind p-3 hover:bg-tradewind">
                          <Link onClick={handleClose} className="no-underline text-tradewind hover:text-bg-white" to={`user/restaurant/${item._id}`}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p>No results found.</p>
                    )}
                  </div>
                </div>
              </Box>
            </Fade>
          </Modal>

          <div className="hidden sm:flex flex-row items-start justify-start py-[0rem] pl-[0rem] pr-[1rem] gap-[1rem]">
            <div className="flex flex-col items-center justify-start pt-[0.275rem] px-[0rem] pb-[0rem]">
              <img
                className="w-[1rem] h-[1rem] relative shrink-0"
                alt=""
                src="/frame-41.svg"
              />
            </div>
            <a className="[text-decoration:none] relative text-sm sm:text-xl font-semibold text-[inherit] inline-block min-w-[3.863rem] shrink-0 text-dark">
              Offers
            </a>
          </div>
          <div className="hidden sm:flex flex-row items-start justify-start gap-[1.093rem]">
            <div className="flex flex-col items-start justify-start pt-[0.275rem] px-[0rem] pb-[0rem]">
              <img
                className="w-[1rem] h-[1rem] relative"
                alt=""
                src="/frame-3791.svg"
              />
            </div>
            <Link to={'/help'} className="[text-decoration:none] text-sm sm:text-xl relative font-semibold text-[inherit] text-dark">
              Help
            </Link>
          </div>
        </div>
      </div>
      {/* Profile Section with Dropdown */}
      <div className="relative flex flex-row items-start justify-start gap-[2.218rem] text-[1.225rem]">
        <div
          className="relative flex flex-row items-center sm:items-start justify-start gap-[1.187rem] shrink-0"
          onMouseEnter={handleMouseEnter}
        >
          <div className="flex flex-col items-start justify-start pt-[0.268rem] px-[0rem] pb-[0rem]">
            <img
              className="w-[1.019rem] h-[1.019rem] relative shrink-0"
              alt=""
              src="/clip-path-group.svg"
            />
          </div>
          <div>
            <Link
              to="profile"
              className="[text-decoration:none] text-sm sm:text-xl relative font-semibold text-[inherit] inline-block  shrink-0 whitespace-nowrap text-dark"
            >
              Profile
            </Link>
            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div
                className="absolute top-[3.5rem] left-0 bg-bg-white shadow-lg rounded-lg p-3 w-[10rem] z-[9999] text-[0.9rem] transition-opacity duration-300"
                style={{ zIndex: 9999 }}
                onMouseEnter={handleMouseEnter} // Keep the dropdown open on hover
                onMouseLeave={handleMouseLeave} // Close the dropdown when cursor leaves
              >
                <Link
                  to={"user/profile"}
                  className="block mb-2 hover:bg-tradewind hover:text-bg-white p-2 rounded no-underline text-dark"
                >
                  View Profile
                </Link>
                <Link
                  to={"/settings"}
                  className="block mb-2 hover:bg-tradewind hover:text-bg-white p-2 rounded no-underline text-dark"
                >
                  Settings
                </Link>
                <Link>
                  <div onClick={handleLogout} className="block mb-2 w-full hover:bg-jaffa hover:text-bg-white p-2 rounded no-underline text-dark">
                    Logout
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex px-[1rem] sm:px-0 flex-row items-start justify-start gap-[1.187rem] shrink-0">
          <Link to={'/user/checkout'}><div className="flex flex-col items-start justify-start pt-[0.268rem] px-[0rem] pb-[0rem] cursor-pointer">
            <img
              className="w-[1.019rem] h-[1.019rem] relative object-cover"
              alt=""
              src="/frame-3798@2x.png"
            />
            <div className="absolute pl-[.7rem] bottom-[.8rem]">
              <div className="w-[1.2rem] h-[1.2rem]  text-mid bg-tradewind text-bg-white rounded-full flex items-center justify-center">
                <b >{cartItems.reduce((a, b) => a + b.quantity, 0)}</b>
              </div>
            </div>
          </div>
          </Link>
          <a
            className="cartIcon [text-decoration:none] relative font-semibold text-[inherit] hidden sm:inline-block min-w-[2.813rem] whitespace-nowrap text-dark"
          >
            Cart
          </a>
        </div>
      </div>
    </header>
  );
};

UserHeader.propTypes = {
  className: PropTypes.string,
};