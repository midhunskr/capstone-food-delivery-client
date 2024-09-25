import PropTypes from "prop-types";
import React from "react";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LoginForm } from "./landing/loginform/LoginForm";
import { Link } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Width will be responsive for smaller screens
  maxWidth: 450, // Max width for larger screens
  p: 4,
};

export const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <header className="shadow-[0px_4px_45.6px_-19px_rgba(0,_0,_0,_0.25)] overflow-hidden px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] bg-bg-white flex flex-row items-center justify-between sm:py-[1rem] z-[99] sticky text-center">
        <div className="flex items-center">
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

        <div className="flex items-center justify-start gap-8 sm:gap-6 md:gap-8 lg:gap-10">
          <div className="hidden sm:flex items-center gap-2">
            <img className="w-[12.4px] h-[12.4px]" loading="lazy" alt="" src="/group-33.svg" />
            <a className="[text-decoration:none] text-dark text-xl font-semibold text-[inherit]">Search</a>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <img className="w-[13.8px] h-[13.8px]" loading="lazy" alt="" src="/frame-41.svg" />
            <a className="[text-decoration:none] text-dark text-xl font-semibold text-[inherit]">Offers</a>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <img className="w-[13.8px] h-[13.8px]" loading="lazy" alt="" src="/group-40.svg" />
            <a className="[text-decoration:none] text-dark text-xl font-semibold text-[inherit]">Help</a>
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={handleOpen}
            className="cursor-pointer px-4 py-[.4rem] flex rounded-full gap-3 justify-between bg-tradewind items-center"
          >
            <img
              className="h-[1.5rem] w-[1.5rem]"
              alt=""
              src="/login-1.svg"
            />
            <a className="[text-decoration:none] text-mid-5 text-bg-white whitespace-nowrap">
              Login
            </a>
          </button>

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
              <Box sx={style}>
                <LoginForm />
              </Box>
            </Fade>
          </Modal>
        </div>
      </header>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
