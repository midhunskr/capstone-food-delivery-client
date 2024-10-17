import PropTypes from "prop-types"

export const AddressSection = () => {
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
                                <b className="defaultAddress text-sm font-normal text-label-tint py-1">123 House, Street name, City <br />State, 12345, India</b>
                                <div className="text-sm py-[1.5rem]">
                                    <b>40 mins</b>
                                </div>
                                <div className="bg-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md shadow-md">
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
                                <div className="border-solid border-2 border-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md shadow-md">
                                    <b className="text-mid text-tradewind">ADD NEW</b>
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

// import PropTypes from "prop-types";
// import { useState } from "react";

// export const AddressSection = ({ addresses = [], onDeliver, onAddAddress }) => {
//     const [isAdding, setIsAdding] = useState(false);
//     const [newAddress, setNewAddress] = useState({
//         street: '',
//         city: '',
//         zip: '',
//         state: '',
//         country: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewAddress((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddAddress = () => {
//         onAddAddress(newAddress); // Call the function to add a new address
//         setNewAddress({ street: '', city: '', zip: '', state: '', country: '' });
//         setIsAdding(false);
//     };

//     return (
//         <div className="w-[18rem] sm:w-full">
//             <div className="sm:py-[1rem] border-2 border-solid border-selection-tint rounded-2xl">
//                 <div className="sm:px-[2rem] px-[1rem] py-[2rem] flex flex-col">
//                     {/* Display default address */}
//                     {addresses.length > 0 && (
//                         <div className="flex gap-3 border-b-2 border-solid border-selection-tint pb-[2rem]">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" className="text-dark">
//                                 <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="none" strokeWidth="1" />
//                             </svg>
//                             <div className="flex flex-col">
//                                 <b className="text-lg">Home</b>
//                                 <b className="defaultAddress text-sm font-normal text-label-tint py-1">
//                                     {addresses[0].street}, {addresses[0].city}<br />
//                                     {addresses[0].state}, {addresses[0].zip}, {addresses[0].country}
//                                 </b>
//                                 <div className="text-sm py-[1.5rem]">
//                                     <b>40 mins</b>
//                                 </div>
//                                 <div
//                                     className="bg-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md shadow-md"
//                                     onClick={onDeliver}
//                                 >
//                                     <b className="text-mid text-bg-white">DELIVER HERE</b>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                     {/* Button to add new address */}
//                     <div className="flex gap-3 pt-[2rem]">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" className="text-dark">
//                             <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="none" strokeWidth="1" />
//                         </svg>
//                         <div>
//                             <div className="flex flex-col pb-[1.5rem]">
//                                 <b className="text-lg">Add new address</b>
//                                 <b className="text-sm font-normal text-label-tint py-1">Street name, State 12345, India</b>
//                             </div>
//                             <div
//                                 className="border-solid border-2 border-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md shadow-md"
//                                 onClick={() => setIsAdding(!isAdding)}
//                             >
//                                 <b className="text-mid text-tradewind">ADD NEW</b>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Render address form when adding a new address */}
//                     {isAdding && (
//                         <div className="flex flex-col pt-4">
//                             <input
//                                 type="text"
//                                 name="street"
//                                 placeholder="Street"
//                                 value={newAddress.street}
//                                 onChange={handleInputChange}
//                                 className="mb-2 p-1 border border-gray-300 rounded"
//                             />
//                             <input
//                                 type="text"
//                                 name="city"
//                                 placeholder="City"
//                                 value={newAddress.city}
//                                 onChange={handleInputChange}
//                                 className="mb-2 p-1 border border-gray-300 rounded"
//                             />
//                             <input
//                                 type="text"
//                                 name="state"
//                                 placeholder="State"
//                                 value={newAddress.state}
//                                 onChange={handleInputChange}
//                                 className="mb-2 p-1 border border-gray-300 rounded"
//                             />
//                             <input
//                                 type="text"
//                                 name="zip"
//                                 placeholder="Zip Code"
//                                 value={newAddress.zip}
//                                 onChange={handleInputChange}
//                                 className="mb-2 p-1 border border-gray-300 rounded"
//                             />
//                             <input
//                                 type="text"
//                                 name="country"
//                                 placeholder="Country"
//                                 value={newAddress.country}
//                                 onChange={handleInputChange}
//                                 className="mb-2 p-1 border border-gray-300 rounded"
//                             />
//                             <button
//                                 onClick={handleAddAddress}
//                                 className="bg-tradewind text-bg-white rounded py-1"
//                             >
//                                 Save Address
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// AddressSection.propTypes = {
//     addresses: PropTypes.array.isRequired,
//     onDeliver: PropTypes.func.isRequired,
//     onAddAddress: PropTypes.func.isRequired,
// };
