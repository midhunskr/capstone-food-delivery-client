import PropTypes from "prop-types";
import { GroupComponent } from "./GroupComponent";

export const FrameComponent2 = ({
  className = "",
  playStoreIcon,
  playStoreSeparator,
}) => {
  return (
    <div className="bg-bg-white sm:py-[5rem] py-[6rem]">
      <div className="flex  justify-center">
        <div className="relative">
          <img
            className="h-[6rem] sm:h-[19.669rem] "
            alt=""
            src="/frame-3596@2x.png"
          />
        </div>
        <div className="absolute sm:pr-[13.5rem] sm:mt-[8rem] pl-[6rem] mt-[2.3rem]">
          <h2 className="">
            <p className="m-0 text-[1.2rem] sm:text-18xl text-bg-white font-bold">Download</p>
            <p className="m-0 text-[1.2rem] sm:text-18xl text-bg-white font-bold">our Mobile App</p>
          </h2>
        </div>
        <div className="absolute flex items-center ">
          <div className="absolute right-[3rem] bottom-[-120px]  sm:right-[18rem] sm:top-[0rem] sm:bottom-[-380px]">
            <img
              className=" h-full max-h-full w-[6rem] sm:w-[11.438rem] "
              loading="lazy"
              alt=""
              src="/free-iphone-13-pro-mockup-4-1@2x.png"
            />
          </div>
          <div className="absolute hidden sm:flex top-[15rem] right-[0rem]">
            <img
              className=" rounded-[50%] w-[3.313rem] h-[3.313rem] "
              loading="lazy"
              alt=""
              src="/ellipse-15@2x.png"
            />
            <img
              className=" rounded-[50%] w-[3.313rem] h-[3.313rem] "
              loading="lazy"
              alt=""
              src="/ellipse-16@2x.png"
            />
            <img
              className=" rounded-[50%] w-[3.313rem] h-[3.313rem] "
              loading="lazy"
              alt=""
              src="/ellipse-17@2x.png"
            />
            <img
              className=" rounded-[50%] w-[3.313rem] h-[3.313rem] "
              loading="lazy"
              alt=""
              src="/ellipse-18@2x.png"
            />
            <img
              className=" w-[3.313rem] h-[3.313rem] "
              loading="lazy"
              alt=""
              src="/group-56.svg"
            />
          </div>
          <div className="hidden sm:inline-block absolute top-[13rem] left-[5rem]">
              <div className="flex gap-[1.125rem]">

                <GroupComponent
                  playStoreIcon="/play-store-icon.svg"
                  playStoreSeparator="4.5/5"
                />
                <GroupComponent
                  playStoreIcon="/app-store-icon.svg"
                  playStoreSeparator="4.8/5"
                />
              </div>
            </div>
        </div>

      </div>

    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};