import PropTypes from "prop-types";

export const CallToAction = () => {
  return (
    <div>

      <section className="self-stretch bg-tradewind flex flex-col sm:flex sm:flex-row sm:justify-center pt-[2.225rem] pb-[2.231rem] max-w-full text-center text-[2.5rem] px-[1rem] md:px-[2rem] lg:px-[10rem] overflow-hidden xl:px-[25rem] sm:pt-[4rem]">
        <div className="w-[67.5rem] flex flex-row items-end justify-start py-[0rem] pl-[19.812rem] pr-[18.812rem] box-border max-w-full mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq800:pl-[4.938rem] mq800:pr-[4.688rem] mq800:box-border mq1350:flex-wrap mq1350:pl-[9.875rem] mq1350:pr-[9.375rem] mq1350:box-border">
          <img
            className="ml-[-21.2rem] h-[27.544rem] w-[21.2rem] relative object-cover shrink-0 max-w-full"
            loading="lazy"
            alt=""
            src="/frame-66@2x.png"
          />
          <div className="flex flex-col sm:items-end justify-start pt-[0rem] px-[0rem] pb-[6.831rem] relative gap-[3.812rem]">
            <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start gap-[1.45rem]">
              <div className="w-[22.788rem] flex flex-row items-start justify-start py-[0rem] px-[2.687rem] box-border">
                <div className="flex-1 flex flex-row items-end justify-between gap-[1.25rem]">
                  <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.393rem]">
                    <img
                      className="w-[5.344rem] h-[5.125rem] relative object-cover"
                      loading="lazy"
                      alt=""
                      src="/frame-71@2x.png"
                    />
                  </div>
                  <img
                    className="h-[3.788rem] w-[3.15rem] relative object-cover"
                    loading="lazy"
                    alt=""
                    src="/frame-70@2x.png"
                  />
                </div>
              </div>
              <div className="text-bg-white ">
                <h2 className="m-0 relative text-inherit font-normal font-[inherit] sm:w-[28rem] ">
                  <span>{`Enjoy `}</span>
                  <span className="text-goldenrod">1500+</span>
                  <span>{` foods from `}</span>
                  <span className="text-goldenrod">280</span>
                  <span> Restaurants</span>
                </h2>
              </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-center">
              <button className="cursor-pointer [border:none] py-[0.968rem] px-[1.687rem] bg-goldenrod w-[16.5rem] rounded-51xl flex flex-row items-start justify-start box-border whitespace-nowrap hover:bg-darkkhaki">
                <div className="relative text-[2.313rem] text-dark text-center font-bold">
                  Order Now
                </div>
              </button>
            </div>
            <img
              className="w-[3.306rem] h-[3.275rem] absolute !m-[0] bottom-[0.788rem] left-[3.8rem] overflow-hidden shrink-0 object-contain"
              loading="lazy"
              alt=""
              src="/pizza-2@2x.png"
            />
            <img
              className="w-[6.844rem] h-[6.313rem] absolute !m-[0] right-[7.544rem] bottom-[0rem] overflow-hidden shrink-0 object-contain"
              loading="lazy"
              alt=""
              src="/popcorn-2@2x.png"
            />
          </div>
          <div className="h-[26.925rem] w-[20.206rem] flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.612rem] box-border max-w-full shrink-0">
            <img
              className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover shrink-0"
              loading="lazy"
              alt=""
              src="/frame-68@2x.png"
            />
          </div>
        </div>
      </section>

    </div>
  )
}

CallToAction.propTypes = {
  className: PropTypes.string,
};