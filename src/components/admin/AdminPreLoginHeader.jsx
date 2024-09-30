import PropTypes from "prop-types";
import React from "react";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AdminLogin } from "./adminloginform/AdminLogin";
import { Link } from "react-router-dom";

export const AdminPreLoginHeader = () => {

  return (
    <div className="w-full shadow-[0px_4px_45.6px_-19px_rgba(0,_0,_0,_0.25)] bg-bg-white overflow-hidden flex items-center justify-center py-[27px] gap-[232px] top-[0] z-[99] sticky text-center text-5xs text-white font-montserrat">
      <div className="w-[145.8px] flex flex-col items-start justify-end pt-0 px-0 pb-[4.8px] box-border">
        <div className="self-stretch flex flex-col items-end justify-start gap-[8.9px]">
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
      <div className="overflow-hidden flex flex-row items-start justify-start py-[17.7px] px-px gap-[29.6px] text-left text-base-5 text-dark">
        <div className="flex flex-row items-start justify-start gap-[14.8px]">
          <div className="flex flex-col items-start justify-start pt-[4.8px] px-0 pb-0">
            <img
              className="w-[12.4px] h-[12.4px] relative"
              loading="lazy"
              alt=""
              src="/group-33.svg"
            />
          </div>
          <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[59.1px]">
            Search
          </a>
        </div>
        <div className="flex flex-row items-end justify-start py-0 pl-0 pr-[15px] gap-[15px]">
          <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[3.7px]">
            <img
              className="w-[13.8px] h-[13.8px] relative"
              loading="lazy"
              alt=""
              src="/frame-41.svg"
            />
          </div>
          <div className="flex flex-row items-start justify-start">
            <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[53.2px]">
              Offers
            </a>
          </div>
        </div>
        <div className="flex flex-row items-end justify-start py-0 pl-0 pr-[15px] gap-[15px]">
          <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[3.7px]">
            <img
              className="w-[13.8px] h-[13.8px] relative"
              loading="lazy"
              alt=""
              src="/group-40.svg"
            />
          </div>
          <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[53.2px]">
            Help
          </a>
        </div>
      </div>
      <div className="w-[190px] flex flex-col items-start justify-end pt-0 px-0 pb-[6.3px] box-border">
        <div className="self-stretch flex flex-row items-start justify-start">
          <div className="flex-1 flex flex-row items-end justify-start gap-[23.8px]" />
        </div>
      </div>
    </div>
  );
};

AdminPreLoginHeader.propTypes = {
  className: PropTypes.string,
};