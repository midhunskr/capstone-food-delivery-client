// import PropTypes from "prop-types";
// import React from "react";

// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import { LoginForm } from "./landing/loginform/LoginForm";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 450,
//   p: 4,
// };

// export const Header = () => {

//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <header className="self-stretch shadow-[0px_4px_45.6px_-19px_rgba(0,_0,_0,_0.25)] bg-bg-white overflow-hidden flex flex-row items-end justify-center py-[27px] px-5 gap-[232px] top-[0] z-[99] sticky text-center text-5xs text-white font-montserrat mq450:gap-[29px] mq750:gap-[58px] mq1125:gap-[116px]">
//       <div className="w-[145.8px] flex flex-col items-start justify-end pt-0 px-0 pb-[4.8px] box-border">
//         <div className="self-stretch flex flex-col items-end justify-start gap-[8.9px]">
//           <img
//             className="self-stretch h-[22.9px] relative max-w-full overflow-hidden shrink-0"
//             loading="lazy"
//             alt=""
//             src="/group-42.svg"
//           />
//           <div className="w-[61px] flex flex-row items-start justify-start pt-[2.3px] pb-[4.9px] pl-[5px] pr-1 box-border relative shrink-0">
//             <img
//               className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
//               loading="lazy"
//               alt=""
//               src="/group-43@2x.png"
//             />
//             <a className="[text-decoration:none] flex-1 relative font-bold text-[inherit] inline-block min-w-[51px] whitespace-nowrap z-[1]">
//               ESTD. 2003
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="overflow-hidden flex flex-row items-start justify-start py-[17.7px] px-px gap-[29.6px] text-left text-base-5 text-dark">
//         <div className="flex flex-row items-start justify-start gap-[14.8px]">
//           <div className="flex flex-col items-start justify-start pt-[4.8px] px-0 pb-0">
//             <img
//               className="w-[12.4px] h-[12.4px] relative"
//               loading="lazy"
//               alt=""
//               src="/group-33.svg"
//             />
//           </div>
//           <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[59.1px]">
//             Search
//           </a>
//         </div>
//         <div className="flex flex-row items-end justify-start py-0 pl-0 pr-[15px] gap-[15px]">
//           <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[3.7px]">
//             <img
//               className="w-[13.8px] h-[13.8px] relative"
//               loading="lazy"
//               alt=""
//               src="/frame-41.svg"
//             />
//           </div>
//           <div className="flex flex-row items-start justify-start">
//             <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[53.2px]">
//               Offers
//             </a>
//           </div>
//         </div>
//         <div className="flex flex-row items-start justify-start gap-[12.2px]">
//           <div className="flex flex-col items-start justify-start pt-[3.6px] px-0 pb-0">
//             <img
//               className="w-[13.8px] h-[13.8px] relative"
//               loading="lazy"
//               alt=""
//               src="/group-40.svg"
//             />
//           </div>
//           <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[53.2px]">
//             Help
//           </a>
//         </div>
//       </div>
//       <div className="w-[190px] flex flex-col items-start justify-end pt-0 px-0 pb-[6.3px] box-border">
//         <div className="self-stretch flex flex-row items-start justify-start">
//           <div className="flex-1 flex flex-row items-end justify-start gap-[23.8px]">
//             <button onClick={handleOpen} className="cursor-pointer px-4 py-[.4rem] flex rounded-full gap-3 justify-between bg-tradewind items-start">
//               <img
//                 className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
//                 alt=""
//                 src="/login-1.svg"
//               />
//               <a className="[text-decoration:none] relative text-mid-5 text-bg-white whitespace-nowrap">
//                   Login
//                 </a>           
//             </button>
//             <Modal
//               aria-labelledby="transition-modal-title"
//               aria-describedby="transition-modal-description"
//               open={open}
//               onClose={handleClose}
//               closeAfterTransition
//               slots={{ backdrop: Backdrop }}
//               slotProps={{
//                 backdrop: {
//                   timeout: 500,
//                 },
//               }}
//             >
//               <Fade in={open}>
//                 <Box sx={style}>
//                   <LoginForm />
//                 </Box>
//               </Fade>
//             </Modal>

//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// Header.propTypes = {
//   className: PropTypes.string,
// };

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
