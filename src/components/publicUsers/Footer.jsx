
import PropTypes from "prop-types";

export const Footer = () => {
  return (
    <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] pt-[2rem] bg-dark overflow-hidden">
      <section className="hidden w-[1074px] sm:flex flex-row items-start justify-between gap-5 max-w-full text-left text-lg text-white font-quicksand mq1025:flex-wrap">
        <div className="flex flex-col items-start justify-start py-0 pl-0 pr-[5px] gap-2.5 text-xl">
          <div className="w-[147.8px] flex flex-row items-start justify-start pt-0 px-px pb-[7px] box-border">
            <div className="flex-1 flex flex-col items-end justify-start gap-[8.9px]">
              <img
                className="flex h-[3rem] relative"
                loading="lazy"
                alt=""
                src="/brand-logo.svg"
              />
              {/* <img
                className="flex sm:hidden h-[3rem] relative"
                loading="lazy"
                alt=""
                src="/brand-logo-text-only.svg"
              /> */}
            </div>
          </div>
          <div className="relative leading-[32px] font-semibold mq450:text-base mq450:leading-[26px]">
            +1 (7635) 547-12-97
          </div>
          <div className="relative text-base leading-[32px] font-semibold">
            support@lift.agency
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-[43px] font-arial-rounded-mt-bold">
          <div className="flex flex-col items-start justify-start gap-[25px]">
            <a className="[text-decoration:none] relative leading-[28px] text-[inherit] inline-block min-w-[106px]">
              Quick Links
            </a>
            <a className="[text-decoration:none] relative text-base font-semibold font-quicksand text-gray-100 inline-block min-w-[60px]">
              Product
            </a>
          </div>
          <div className="relative text-base font-semibold font-quicksand text-gray-100 inline-block min-w-[91px]">
            Information
          </div>
        </div>
        <div className="w-[149px] flex flex-col items-start justify-start pt-[53px] px-0 pb-0 box-border text-base text-gray-100">
          <div className="flex flex-col items-start justify-start gap-[43px]">
            <a className="[text-decoration:none] relative font-semibold text-[inherit] inline-block min-w-[74px]">
              Company
            </a>
            <div className="relative font-semibold inline-block min-w-[76px]">
              Lift Media
            </div>
          </div>
        </div>
        <div className="w-[248px] flex flex-col items-start justify-start gap-[25px] font-arial-rounded-mt-bold">
          <a className="[text-decoration:none] relative leading-[28px] text-[inherit] inline-block min-w-[90px]">
            Subscribe
          </a>
          <div className="self-stretch rounded-md bg-white border-navy border-[1px] border-solid flex flex-row items-start justify-between py-0 pl-[15px] pr-px gap-5">
            <div className="self-stretch w-[249px] relative rounded-md bg-white border-navy border-[1px] border-solid box-border hidden" />
            <input
              className="w-[139px] [border:none] [outline:none] bg-[transparent] h-9 flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border font-quicksand font-semibold text-sm text-gray-200"
              placeholder="Get product updates"
              type="text"
            />
            <div className="h-[50px] w-[50px] relative bg-jaffa z-[1]">
              <img
                className="absolute top-[0px] left-[0px] w-full h-full hidden"
                alt=""
                src="/fill.svg"
              />
              <img
                className="absolute top-[19px] left-[18px] w-[15.3px] h-[13px] object-contain z-[2]"
                alt=""
                src="/arrowsdowntopmove1@2x.png"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="w-[1073.5px] flex flex-col items-start justify-start gap-[34px] py-[2rem]">
        <div className="self-stretch h-px relative">
          <div className="absolute h-full w-full top-[0%] right-[-0.09%] bottom-[-100%] left-[0%] bg-gray-300 border-white border-[1px] border-solid box-border" />
        </div>
        <div className="self-stretch flex flex-col sm:flex sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex flex-row items-start justify-start gap-[15px]">
            <img
              className="h-[35px] w-[35px] relative min-h-[35px]"
              loading="lazy"
              alt=""
              src="/linkedin.svg"
            />
            <img
              className="h-[35px] w-[35px] relative min-h-[35px]"
              loading="lazy"
              alt=""
              src="/facebook.svg"
            />
            <img
              className="h-[35px] w-[35px] relative min-h-[35px]"
              loading="lazy"
              alt=""
              src="/twitter.svg"
            />
          </div>
          <div className="flex flex-col">
            <div className="self-stretch flex flex-row gap-[13px]">
              <div className="flex flex-row items-center px-0 pb-0 gap-0">
                <div className="w-[7rem]">{`A product of `}</div>
                <img
                  className="hidden sm:flex h-[3rem]"
                  loading="lazy"
                  alt=""
                  src="/brand-logo.svg"
                />
                <img
                  className="flex sm:hidden h-[4rem]"
                  loading="lazy"
                  alt=""
                  src="/brand-logo-text-only.svg"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start  px-0 pb-0 font-quicksand">
            <div className="relative font-semibold">
              © 2024 Midhun Shankar. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};