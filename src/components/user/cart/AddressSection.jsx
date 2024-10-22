import PropTypes from "prop-types"
import { axiosInstance } from "../../../config/axioInstance";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const AddressSection = () => {
    const [defaultAddress, setDefaultAddress] = useState(null);
    const fetchAddresses = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/addresses",
                method: "GET",
                withCredentials: true,
            });
            console.log(response.data[0]);

            if (response.data.length > 0) {
                // Set the first address as default address
                setDefaultAddress(response.data[0]);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
            toast.error("Error fetching addresses");
        }
    };
    useEffect(() => {
        fetchAddresses()
    }, [])
    return (
        <>
            <div className="w-[18rem] sm:w-full">
                <div className="sm:py-[1rem] border-2 border-solid border-selection-tint rounded-2xl">
                    <div className="sm:px-[2rem] px-[1rem] py-[2rem] flex flex-col">
                        <div className="flex gap-3 border-b-2 border-solid border-selection-tint pb-[2rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" className="text-dark">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="none" strokeWidth="1" />
                            </svg>
                            <div className="flex flex-col">
                                <b className="text-lg">Home</b>
                                <b className="addressSection text-sm font-normal text-label-tint py-1">
                                    {defaultAddress ? (
                                        <>
                                            {defaultAddress.street}, {defaultAddress.state}, {defaultAddress.city}
                                            <br />
                                            {defaultAddress.zip}, {defaultAddress.country}
                                        </>
                                    ) : (
                                        "No address found"
                                    )}
                                </b>
                                <div className="text-sm py-[1.5rem]">
                                    <b>40 mins</b>
                                </div>

                                <div className="bg-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md hover:shadow-xl">
                                    <b className="text-mid text-bg-white">DELIVER HERE</b>
                                </div>

                            </div>
                        </div>
                        <div className="flex gap-3 pt-[2rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" className="text-dark">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="none" strokeWidth="1" />
                            </svg>
                            <div>
                                <div className="flex flex-col pb-[1.5rem]">
                                    <b className="text-lg">Add new address</b>
                                    <b className="text-sm font-normal text-label-tint py-1">Street name, State 12345, India</b>
                                </div>
                                <div className="border-solid border-2 border-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md hover:shadow-xl">
                                    <b className="text-mid text-tradewind ">ADD NEW</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

AddressSection.propTypes = {
    className: PropTypes.string
}
