import PropTypes from "prop-types";

export const FastestDeliverySection = () => {
    return (
        <div>
            <section className="self-stretch bg-bg-white overflow-hidden flex flex-col px-[0rem] box-border max-w-full text-left text-[2.5rem] text-bg-white py-[3rem]">
                <div className="h-full flex flex-col relative max-w-full ">
                    <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] overflow-hidden xl:px-[20rem] sm:pt-[3rem] flex flex-col sm:flex sm:flex-row items-center justify-center bg-dark sm:gap-[5rem]">
                        <div className="sm:w-[25rem]  flex flex-col gap-[2.062rem] py-[2rem] sm:py-[0rem]">
                            <h2 className=" relative text-inherit font-bold">
                                <span>{`Fastest Food `}</span>
                                <span className="text-jaffa">Delivery</span>
                                <span> in Town</span>
                            </h2>
                            <div className="text-[1.313rem] font-semibold ">
                                Get your dream order fresh, steam hot at 20min break time.
                            </div>
                        </div>
                        <div className="bg-dark">
                            <img
                                className="h-[20rem] sm:h-[28rem] relative max-w-full overflow-hidden object-cover sm:py-6"
                                loading="lazy"
                                alt=""
                                src="/group-74@2x.png"
                            />
                        </div>
                        <div className="flex flex-col gap-[3.937rem] text-center text-[1rem] pb-[2rem]">
                            <div className="self-stretch flex flex-row items-center justify-start text-left gap-[0.937rem]">
                                <div className="">
                                    <img
                                        className="w-[3.313rem] h-[3.313rem] object-cover"
                                        loading="lazy"
                                        alt=""
                                        src="/group-3600@2x.png"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="">
                                        Contactless Delivery
                                    </div>
                                    <div className="text-[0.75rem] w-[11rem]">
                                        Delivered at your doorstep, no ring!
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-row items-center justify-start text-left gap-[0.937rem]">
                                <div className="">
                                    <img
                                        className="w-[3.313rem] h-[3.313rem] object-cover"
                                        loading="lazy"
                                        alt=""
                                        src="/247@2x.png"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="">
                                        24/7 Support
                                    </div>
                                    <div className="text-[0.75rem] w-[11rem]">
                                        We are available throughout day and night
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] flex flex-col items-center py-[4rem] gap-[5rem]">
                    <div className="flex flex-col items-center">
                        <h2 className="text-[2.5rem]">
                            <span>{`How we `}</span>
                            <span className="text-jaffa">Serve</span>
                            <span> you</span>
                        </h2>
                    </div>
                    <div className="text-dark sm:flex sm:flex-row flex flex-col items-center gap-[4rem] sm:gap-[10rem]">
                        <div className="flex flex-col">
                            <div className="">
                                <img
                                    className="w-[12rem] sm:w-[14rem] sm:h-[15rem] "
                                    loading="lazy"
                                    alt=""
                                    src="/group-67-1@2x.png"
                                />
                            </div>
                            <div className="text-xl font-bold">
                                Automated Packing
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col items-center">
                                <img
                                    className="w-[15rem] sm:w-[18rem]"
                                    loading="lazy"
                                    alt=""
                                    src="/group-76.svg"
                                />
                                <div className="text-xl pt-[.7rem] font-bold">
                                    Packed with Love
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col items-center">
                                <img
                                    className="w-[12rem] sm:w-[14rem] sm:h-[15rem]"
                                    alt=""
                                    src="/group-68-1.svg"
                                />
                                <div className="text-xl pt-[1.4rem] font-bold">
                                    Serve hot Appetite
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

FastestDeliverySection.propTypes = {
    className: PropTypes.string,
};
