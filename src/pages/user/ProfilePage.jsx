// import PropTypes from "prop-types";
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { userLogout } from '../../services/userApi'
// import toast from 'react-hot-toast'
// import { axiosInstance } from '../../config/axioInstance'

// export const ProfilePage = () => {
//     const navigate = useNavigate()
//     const [user, setUser] = useState(null)
//     const [order, setOrder] = useState({})

//     //logout
//     const handleLogout = async () => {
//         const response = await userLogout()
//         if (response?.success) {
//             navigate('/')
//         }
//     }

//     //user profile
//     const fetchUserProfile = async () => {
//         try {
//             const response = await axiosInstance({
//                 url: '/user/profile',
//                 method: 'GET',
//                 withCredentials: true
//             })
//             setUser(response?.data)
//             // return response?.data

//         } catch (error) {
//             console.log(error, 'Error fetching user data');
//             toast.error('Error fetching user data')
//         }
//     }

//     useEffect(() => {
//         fetchUserProfile()
//     }, [])

//     const fetchOrders = async () => {
//         try {
//             const response = await axiosInstance({
//                 url: '/payment/get-user-orders',
//                 method: 'GET',
//                 withCredentials: true
//             });

//             if (response?.data?.orders) {
//                 setOrder(response.data.orders);
//             } else {
//                 console.log("No order data found")
//                 setOrder(null)
//             }
//         } catch (error) {
//             console.error("Error fetching order data:", error)
//             toast.error('Error fetching order data')
//         }
//     }
//     useEffect(() => {
//         fetchOrders()
//     }, [])

//     console.log(order);


//     const [activeIndex, setActiveIndex] = useState(0);

//     const sections = [
//         { name: 'Orders', content: 'Content for section 1' },
//         { name: 'Payments', content: 'Content for section 2' },
//         { name: 'Addresses', content: 'Content for section 3' },
//     ];
//     return (
//         <>
//             <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] py-[1rem] bg-bg-white text-dark">
//                 <div className="h-full w-[70.5rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0rem] gap-3">
//                     <div className="self-stretch flex flex-col items-start justify-start py-[0rem] pl-[0.5rem] pr-[0rem]">
//                         <h1 className="m-0 w-[22.75rem] relative text-inherit text-dark leading-[121.88%] font-bold font-[inherit] inline-block shrink-0 max-w-full mq450:text-[1.188rem] mq450:leading-[1.438rem] items-start justify-start">Hi, {user ? user.name + "!" : 'loading...'}</h1>
//                     </div>
//                     <div>
//                         <div className="flex">
//                             {/* Left Side Menu */}
//                             <div className="w-6/12 bg-gray-200 border-r border-gray-300">
//                                 <ul className="space-y-2 p-4">
//                                     {sections.map((section, index) => (
//                                         <li
//                                             key={index}
//                                             className={`cursor-pointer p-2 rounded-md ${activeIndex === index ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'
//                                                 }`}
//                                             onClick={() => setActiveIndex(index)}
//                                         >
//                                             {section.name}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>

//                             {/* Right Side Content */}
//                             <div className="w-9/12 p-4">
//                                 {Array.isArray(order) && order.length > 0 ? (
//                                     order.map((id) => (
//                                         <div key={id}>
//                                             <b>Recent orders</b>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No recent orders</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// ProfilePage.propTypes = {
//     className: PropTypes.string,
// };


import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/userApi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axioInstance";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [loadingMore, setLoadingMore] = useState(false); // Load more state

    // Logout
    const handleLogout = async () => {
        try {
          await userLogout(setUser, navigate); // Call userLogout with setUser and navigate
        } catch (error) {
          console.error('Logout failed:', error);
        }
      }

    // User profile
    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/profile",
                method: "GET",
                withCredentials: true,
            });
            setUser(response?.data);
        } catch (error) {
            console.log(error, "Error fetching user data");
            toast.error("Error fetching user data");
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    // Fetch orders with pagination
    const fetchOrders = async (page = 1) => {
        try {
            const response = await axiosInstance({
                url: `/payment/get-user-orders?page=${page}&limit=5`, // Adjust limit as needed
                method: "GET",
                withCredentials: true,
            });

            if (response?.data?.orders) {
                setOrders((prevOrders) => [...prevOrders, ...response.data.orders]); // Append new orders to existing ones
                setTotalPages(response.data.totalPages); // Set total pages from backend response
                setLoadingMore(false); // Stop loading more
            } else {
                console.log("No order data found");
                toast.error("No more orders to load");
                setLoadingMore(false);
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
            toast.error("Error fetching order data");
            setLoadingMore(false);
        }
    };

    // Initial load of orders
    useEffect(() => {
        fetchOrders(); // Fetch first page of orders on mount
    }, []);

    // Handle "Load More" button click
    const handleLoadMore = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1); // Increment page
            setLoadingMore(true); // Start loading more
            fetchOrders(page + 1); // Fetch the next page of orders
        }
    };

    console.log(orders);

    const [activeIndex, setActiveIndex] = useState(0)

    const sections = [
        { name: 'Orders', content: 'Content for section 1' },
        { name: 'Addresses', content: 'Content for section 3' },
        { name: 'Logout', content: 'Content for section 2' }
    ]

    // Content for each section
    const renderSectionContent = () => {
        switch (activeIndex) {
            case 0: // Orders
                return (
                    <>
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div key={index} className="flex flex-col w-[20rem] sm:w-full border-2 border-solid border-selection-tint rounded-xl p-4">
                                    <div className="flex gap-3">
                                        {/* Display the first menu item image as the restaurant image */}
                                        <img
                                            src={order.menuItems[0]?.image}  // Display the first item's image
                                            alt={order.restaurant.name}
                                            className="w-20 h-20 object-cover rounded-lg border-[.2rem] border-solid border-white shadow-md"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <b className="font-medium">{order.restaurant.name}</b>
                                            <b className="font-medium text-sm text-label-tint">{order.restaurant.location}</b>
                                        </div>
                                    </div>
                                    <p className="w-[22rem]">
                                        Delivered on{" "}
                                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            weekday: 'short',  // Mon
                                            year: 'numeric',   // 2024
                                            month: 'short',    // Jul
                                            day: 'numeric'     // 8
                                        })}, {" "}
                                        {new Date(order.createdAt).toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true       // PM
                                        })}
                                    </p>
                                    {/* Mapping only the menu items */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {order.menuItems.map((menuItem, idx) => (
                                            <div key={idx} className="flex gap-2 sm:border-r-[.2rem] border-solid border-selection-tint pr-[.5rem]">
                                                <div className="flex items-center gap-3">
                                                    <b className="font-normal text-sm">{menuItem.name}</b>
                                                </div>
                                                <div>
                                                    <b className="font-normal text-sm py-[.3rem]">x {menuItem.quantity}</b>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <b className="pt-[1rem] font-bold">Total Piad: <span className="px-[.5rem]">₹{order.grandTotal}</span></b>
                                </div>
                            ))
                        ) : (
                            <p>No recent orders</p>
                        )}

                        {page < totalPages && (
                            <button
                                className="mt-4 p-2 bg-bg-white border-[.1rem] border-solid border-tradewind text-tradewind rounded-md "
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                            >
                                {loadingMore ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </>
                );
            case 1: // Addresses
                return <p>Addresses content here...</p>;
            case 2: // Logout
                return <div onClick={handleLogout} className="border-[.2rem] border-solid border-selection-tint rounded-xl p-6"><button className="px-[1.5rem] py-[.5rem] rounded-lg border-[.2rem] border-solid border-tradewind bg-bg-white text-tradewind hover:bg-tradewind hover:text-bg-white text-xl cursor-pointer">Logout</button></div>
            default:
                return null;
        }
    };

    return (
        <div className="px-[1rem] md:px-[2rem] lg:px-[10rem] xl:px-[25rem] py-[2rem] bg-bg-white text-dark">
            <div className="">
                <div className="self-stretch flex flex-col items-start justify-start py-[0rem] pl-[0.5rem] pr-[0rem]">
                    <h1 className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem]">
                        Hi, {user ? user.name + "!" : "loading..."}
                    </h1>
                    <b className="font-normal pt-[.5rem] sm:hidden">Recent Orders</b>
                </div>
                <div>
                    <div className="flex py-[.5rem] sm:px-[1rem] md:px-[2rem] lg:px-[0rem] xl:px-[0rem] bg-bg-white text-dark">
                        {/* Left Side Menu */}
                        <div className="w-3/12 border-r border-gray-300 hidden sm:inline-block">
                            <ul className="space-y-3 p-4">
                                {sections.map((section, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer p-2 list-none rounded-md ${activeIndex === index
                                            ? "bg-tradewind text-bg-white"
                                            : "hover:border-[.1rem] hover:border-solid hover:border-tradewind hover:px-6"
                                            }`}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        {section.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6 p-4">
                            {/* Render content based on active section */}
                            {renderSectionContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfilePage.propTypes = {
    className: PropTypes.string,
};