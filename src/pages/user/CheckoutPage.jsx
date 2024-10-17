import PropTypes from "prop-types"
import { AddressSection } from "../../components/user/cart/AddressSection";
import { ProceedToPayment } from "../../components/user/cart/ProceedToPayment";
import { PaymentDetails } from "../../components/user/cart/PaymentDetails";

export const CheckoutPage = () => {
    return (
        <>
            <div className="px-[1rem]  md:px-[2rem] lg:px-[10rem] xl:px-[25rem]  bg-bg-white text-dark">
                <div className="self-stretch flex flex-col items-center bg-bg-white text-dark justify-center pt-[2rem] px-[1.25rem] box-border max-w-full text-left text-[1.5rem] font-montserrat">
                    <div className="h-full w-[70.5rem] flex flex-col items-start justify-start box-border gap-[2.012rem] max-w-full">
                        <div className="self-stretch flex flex-col items-start justify-start pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full">
                            <b className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem] lg:py-[1rem]">Select delivery address</b>
                            <b className="text-sm lg:text-mid font-normal text-label-tint pt-[1rem] lg:py-[.5rem]">Select your address or add a new one</b>
                        </div>
                    </div>
                </div>
                <div className="self-stretch flex flex-col items-center bg-bg-white text-dark  pt-[2rem] px-[1.25rem] box-border max-w-full text-left text-[1.5rem] font-montserrat">
                    <div className="h-full w-[70.5rem] flex flex-col box-border gap-[2.012rem] max-w-full">
                        <div className="self-stretch flex flex-col pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full">
                            <div className="flex flex-col gap-[2rem] sm:flex sm:flex-row w-12/12 justify-between pb-[4rem]">
                                <div className="flex w-6/12 flex-col bg-bg-white text-dark gap-[3rem]">
                                    <AddressSection />
                                    {/* <ProceedToPayment /> */}
                                </div>
                                <div className=" bg-bg-white text-dark">
                                    <PaymentDetails />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

CheckoutPage.propTypes = {
    className: PropTypes.string,
};

// import PropTypes from "prop-types";
// import { AddressSection } from "../../components/user/cart/AddressSection";
// import { ProceedToPayment } from "../../components/user/cart/ProceedToPayment";
// import { PaymentDetails } from "../../components/user/cart/PaymentDetails";
// import { useEffect, useState } from "react"; // Import useState and useEffect

// export const CheckoutPage = () => {
//     const [addresses, setAddresses] = useState([]); // Initialize addresses as an empty array
//     const [loading, setLoading] = useState(true); // Track loading state
    
//     useEffect(() => {
//         const fetchAddresses = async () => {
//             try {
//                 // Assuming you have an API to fetch addresses
//                 const response = await api.getAddresses(); // Replace with your API call
//                 setAddresses(response.data); // Set the addresses state
//             } catch (error) {
//                 console.error("Error fetching addresses:", error);
//             } finally {
//                 setLoading(false); // Set loading to false once done
//             }
//         };

//         fetchAddresses();
//     }, []);

//     const handleDeliver = (address) => {
//         // Handle deliver logic
//         console.log("Delivering to:", address);
//     };

//     const handleAddAddress = () => {
//         // Handle add new address logic
//         console.log("Add new address clicked");
//     };

//     return (
//         <>
//             <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] bg-bg-white text-dark">
//                 <div className="self-stretch flex flex-col items-center bg-bg-white text-dark justify-center pt-[2rem] px-[1.25rem] box-border max-w-full text-left text-[1.5rem] font-montserrat">
//                     <div className="h-full w-[70.5rem] flex flex-col items-start justify-start box-border gap-[2.012rem] max-w-full">
//                         <div className="self-stretch flex flex-col items-start justify-start pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full">
//                             <b className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem] lg:py-[1rem]">Select delivery address</b>
//                             <b className="text-sm lg:text-mid font-normal text-label-tint pt-[1rem] lg:py-[.5rem]">Select your address or add a new one</b>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="self-stretch flex flex-col items-center bg-bg-white text-dark pt-[2rem] px-[1.25rem] box-border max-w-full text-left text-[1.5rem] font-montserrat">
//                     <div className="h-full w-[70.5rem] flex flex-col box-border gap-[2.012rem] max-w-full">
//                         <div className="self-stretch flex flex-col pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full">
//                             <div className="flex flex-col gap-[2rem] sm:flex sm:flex-row w-12/12 justify-between pb-[4rem]">
//                                 <div className="flex w-6/12 flex-col bg-bg-white text-dark gap-[3rem]">
//                                     {loading ? (
//                                         <div>Loading addresses...</div> // Show a loading message while fetching
//                                     ) : (
//                                         <AddressSection addresses={addresses} onDeliver={handleDeliver} onAddAddress={handleAddAddress} />
//                                     )}
//                                     {/* <ProceedToPayment /> */}
//                                 </div>
//                                 <div className="bg-bg-white text-dark">
//                                     <PaymentDetails />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// CheckoutPage.propTypes = {
//     className: PropTypes.string,
// };
