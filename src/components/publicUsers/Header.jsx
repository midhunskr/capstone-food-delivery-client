import PropTypes from "prop-types";
import React from "react";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LoginForm } from "./landing/loginform/LoginForm";

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
    <header className="px-[28rem] self-stretch shadow-[0px_4px_45.6px_-19px_rgba(0,_0,_0,_0.25)] bg-bg-white overflow-hidden flex flex-row items-center justify-between py-[27px] z-[99] sticky text-center text-5xs text-white font-montserrat gap-6 sm:gap-10 md:gap-16 lg:gap-24 xl:gap-[232px]">
      <div className="flex items-center justify-start">
        <div className="flex flex-col items-start justify-end">
          <img
            className="h-[22.9px] max-w-full"
            loading="lazy"
            alt=""
            src="/group-42.svg"
          />
          <div className="flex items-center gap-1">
            <img
              className="w-[61px] h-auto object-cover"
              loading="lazy"
              alt=""
              src="/group-43@2x.png"
            />
            <a className="[text-decoration:none] font-bold text-[inherit]">
              ESTD. 2003
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start gap-8 sm:gap-6 md:gap-8 lg:gap-10">
        <div className="flex items-center gap-2">
          <img className="w-[12.4px] h-[12.4px]" loading="lazy" alt="" src="/group-33.svg" />
          <a className="[text-decoration:none] text-dark text-xl font-semibold text-[inherit]">Search</a>
        </div>

        <div className="flex items-center gap-2">
          <img className="w-[13.8px] h-[13.8px]" loading="lazy" alt="" src="/frame-41.svg" />
          <a className="[text-decoration:none] text-dark text-xl font-semibold text-[inherit]">Offers</a>
        </div>

        <div className="flex items-center gap-2">
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
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
