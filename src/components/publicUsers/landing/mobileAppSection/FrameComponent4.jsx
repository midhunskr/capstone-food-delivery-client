import PropTypes from "prop-types";
import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LoginForm } from "../loginform/LoginForm";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Width will be responsive for smaller screens
  maxWidth: 450, // Max width for larger screens
  p: 4,
};

export const FrameComponent4 = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex bg-bg-white flex-col items-center relative gap-[5rem] text-left text-[1.313rem] text-dark py-[0rem] px-[1rem] md:px-[2rem] lg:px-[10rem] overflow-hidden xl:px-[25rem] sm:pt-[4rem]">
      <div className="flex flex-col text-[2.5rem]">
        <div className="sm:w-[80rem] flex flex-col sm:flex sm:flex-row items-center gap-[2rem] sm:gap-[5rem]">
          <h2 className="m-0 relative text-inherit font-bold">
            <span>Our</span>
            <span className="text-black">{` `}</span>
            <span className="text-jaffa">Best Delivered</span>
            <span className="text-black">{` `}</span>
            <span>Categories</span>
          </h2>
          <b className="font-normal text-mid">It is just not bringing your favorite food, we deliver you
            experience.</b>
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex sm:flex-row items-center justify-center gap-[3rem] sm:gap-[13rem]">
        <div className="flex flex-col items-center">
          <img
            className="w-[12rem] sm:w-[15rem]"
            loading="lazy"
            alt=""
            src="/group-67.svg"
          />
          <div className="pt-[.6rem] flex flex-col items-center">
            <div className="font-bold">
              Masala Chicken
            </div>
            <b onClick={handleOpen} className="font-bold text-lg text-jaffa cursor-pointer">{`Order Now >`}</b>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img
            className="w-[15rem] sm:w-[21rem]"
            loading="lazy"
            alt=""
            src="/group-69.svg"
          />
          <div className="flex flex-col items-center">
            <div className="font-bold">
              French Fires
            </div>
            <b onClick={handleOpen} className="font-bold text-lg text-jaffa cursor-pointer">{`Order Now >`}</b>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img
            className="w-[12rem] sm:w-[15rem]"
            loading="lazy"
            alt=""
            src="/group-68.svg"
          />
          <div className="pt-[1.5rem] flex flex-col items-center">
            <div className="font-bold">
              Soft Drinks
            </div>
            <b onClick={handleOpen} className="font-bold text-lg text-jaffa cursor-pointer">{`Order Now >`}</b>
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
              <Box sx={style}>
                <LoginForm />
              </Box>
            </Fade>
          </Modal>
        </div>

      </div>
    </div>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,
};