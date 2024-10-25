import PropTypes from "prop-types";
import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { LoginForm } from "../loginform/LoginForm";
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


export const HeroSection = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] overflow-hidden sm:pt-[4rem] bg-bg-white text-dark">
                <div className="flex flex-row items-start relative">
                    <div className="hidden lg:inline-block absolute bottom-[27rem] lg:right-[62rem]">
                        <img
                            className=""
                            loading="lazy"
                            alt=""
                            src="/frame-53.svg"
                        />
                    </div>
                    <div className="h-full flex-col sm:flex justify-between ">
                        <div className="relative flex items-start sm:justify-between">
                            <div className="relative z-10 sm:w-[46rem] flex flex-col">
                                <h1 className="drop-shadow-md sm:drop-shadow-none pt-[3rem] sm:pt-0 leading-10 sm:leading-tight">
                                    <p className="text-23xl sm:text-37xl font-bold text-dark">Fastest</p>
                                    <p className="text-jaffa text-23xl sm:text-37xl font-bold">
                                        <span>Delivery</span>
                                        <span>{` `}</span>
                                        <span>{`&`}</span>
                                    </p>
                                    <p className="m-0 text-23xl sm:text-37xl font-bold text-dark">
                                        <span className="z-10">Easy</span>
                                        <span>{` `}</span>
                                        <span className="text-jaffa">Pickup</span>
                                    </p>
                                </h1>

                                <div className="w-[433px] overflow-hidden flex flex-row items-center justify-start py-0 px-px box-border gap-[22px] shrink-0 max-w-[104%] text-2xl text-black font-quicksand mq450:flex-wrap">
                                    <div
                                        className="h-[75px] w-[75px] relative rounded-[50%] bg-gainsboro"
                                        style={{
                                            border: "8px solid white",
                                            backgroundImage: "url(./profile-illustration.svg)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    />
                                    <div className="flex flex-col items-start justify-start py-[3rem] sm:py-[2rem]">
                                        <h2 className="relative text-inherit font-semibold font-[inherit] inline-block shrink-0 mq450:text-mid mq450:leading-[21px]">
                                            <p className="[margin-block-start:0] [margin-block-end:9px]">
                                                When you are too lazy to cook,
                                            </p>
                                            <p className="m-0">we are just a click away!</p>
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex py-[1rem] sm:py-[4rem] gap-[3rem]">
                                    <button onClick={handleOpen} className="cursor-pointer [border:none] w-[10rem] py-[1rem] rounded-full sm:py-[15.5px] sm:px-[27px] bg-tradewind sm:w-[264px] sm:rounded-51xl flex flex-row items-center justify-center sm:items-start sm:justify-start box-border whitespace-nowrap hover:bg-teal">
                                        <div className="relative text-xl sm:text-18xl font-bold text-white text-center">
                                            Get Started
                                        </div>
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
                                    <div className="hidden sm:flex gap-[1rem]">
                                        <div className="flex flex-row items-end justify-start relative gap-[41px]">
                                            <div className="w-[77px] !m-[0] top-[0px] left-[305px] flex flex-row items-start justify-start">
                                                <div className="h-[77px] flex-1 relative">
                                                    <div className="absolute top-[0px] left-[77px] rounded-[50%] bg-jaffa w-full h-full [transform:_rotate(90deg)] [transform-origin:0_0]" />
                                                    <div className="absolute w-[calc(100%_-_14px)] top-[7px] right-[7px] left-[7px] h-[63px]">
                                                        <div className="absolute top-[0px] left-[0px] shadow-[0px_0px_34.1px_-17px_rgba(0,_0,_0,_0.42)] rounded-[50%] bg-white w-full h-full z-[1]" />
                                                        <img
                                                            className="absolute top-[16.3px] left-[24.5px] rounded-sm w-5 h-[29px] z-[2]"
                                                            loading="lazy"
                                                            alt=""
                                                            src="/vector-3.svg"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start justify-start pt-[25.3px] px-0 pb-0">
                                            <h2 className="m-0 text-inherit font-bold font-[inherit] mq450:text-mid">
                                                Start a tour!
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-[7rem] inset-0 z-0 sm:relative sm:z-0 flex items-center justify-center">
                                <img
                                    className="w-[18rem] sm:w-[30rem] max-w-full h-auto opacity-20 sm:opacity-100"
                                    loading="lazy"
                                    alt=""
                                    src="/hero-image@2x.png"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="sm:flex sm:flex-row sm:items-start sm:justify-center py-[2rem]">
                    <div className="w-full flex flex-col sm:flex sm:flex-row items-start justify-between gap-5 max-w-full">
                        <div className="w-[178px] flex flex-row items-end justify-start gap-[15px]">
                            <div className="h-[55px] flex flex-col items-start justify-end pt-0 px-0 pb-0.5 box-border">
                                <img
                                    className="w-[53px] h-[53px] relative"
                                    loading="lazy"
                                    alt=""
                                    src="/group-46.svg"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start gap-2">
                                <div className="w-[10rem] relative inline-block text-left">
                                    Fast Delivery
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-0 text-left text-xs font-quicksand">
                                    <div className="flex-1 relative font-semibold">
                                        Promised delivery of 30 minutes!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[178px] flex flex-row items-end justify-start gap-[15px]">
                            <div className="h-[55px] flex flex-col items-start justify-end pt-0 px-0 pb-0.5 box-border">
                                <img
                                    className="w-[53px] h-[53px] relative"
                                    loading="lazy"
                                    alt=""
                                    src="/live-tracking-logo.svg"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start gap-2">
                                <div className="w-[10rem] relative inline-block text-left">
                                    Live Tracking
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-0 text-left text-xs font-quicksand">
                                    <div className="flex-1 relative font-semibold">
                                        Real-time tracking with map!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[178px] flex flex-row items-end justify-start gap-[15px]">
                            <div className="h-[55px] flex flex-col items-start justify-end pt-0 px-0 pb-0.5 box-border">
                                <img
                                    className="w-[53px] h-[53px] relative"
                                    loading="lazy"
                                    alt=""
                                    src="/ai-rec-logo.svg"
                                />
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start gap-2">
                                <div className="w-[15rem] relative inline-block text-left">
                                    AI Recommendations
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-0 pl-px pr-0 text-left text-xs font-quicksand">
                                    <div className="flex-1 relative font-semibold">
                                        An intelligent recommendation engine for hussle free
                                        selection!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

HeroSection.propTypes = {
    className: PropTypes.string,
};