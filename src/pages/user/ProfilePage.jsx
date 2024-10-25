import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../services/userApi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axioInstance";
import { useDispatch } from "react-redux";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loadingAddresses, setLoadingAddresses] = useState(true);
    const [addressForm, setAddressForm] = useState({ street: '', city: '', state: '', zip: '', country: '' }); // State for address form
    const [editingAddressId, setEditingAddressId] = useState(null); // ID for the address being edited
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [rating, setRating] = useState({})

    // User Logout
    const handleLogout = async () => {
        try {
            await userLogout(setUser, navigate);
            dispatch(clearUser())
            window.location.reload()
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    // Fetch User Profile
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

    const fetchAddresses = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/addresses",
                method: "GET",
                withCredentials: true,
            });
            setAddresses(response?.data || []);
            setLoadingAddresses(false);
        } catch (error) {
            console.error("Error fetching addresses:", error);
            toast.error("Error fetching addresses");
            setLoadingAddresses(false);
        }
    };

    const handleAddOrUpdateAddress = async (e) => {
        e.preventDefault();
        try {
            const url = editingAddressId ? `/user/address/${editingAddressId}` : '/user/address';
            const method = editingAddressId ? 'PUT' : 'POST';
            console.log("Address Form Payload:", addressForm);
            const response = await axiosInstance({
                url,
                method,
                data: addressForm,
                withCredentials: true,
            });
            setAddressForm({ street: '', city: '', state: '', zip: '', country: '' }); // Reset form
            setEditingAddressId(null); // Reset editing state
            fetchAddresses(); // Refresh addresses
            toast.success(editingAddressId ? 'Address updated successfully!' : 'Address added successfully!');
        } catch (error) {
            console.error("Error adding/updating address:", error);
            toast.error("Error adding/updating address");
        }
    };

    const handleEditAddress = (address) => {
        setAddressForm(address); // Set form with address to edit
        setEditingAddressId(address._id); // Set editing ID
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await axiosInstance({
                url: `/user/address/${addressId}`,
                method: 'DELETE',
                withCredentials: true,
            });
            fetchAddresses(); // Refresh addresses
            toast.success("Address deleted successfully!");
        } catch (error) {
            console.error("Error deleting address:", error);
            toast.error("Error deleting address");
        }
    };

    // Fetch Orders
    const fetchOrders = async (page = 1) => {
        try {
            const response = await axiosInstance.get(`/payment/get-user-orders?page=${page}&limit=5`, { withCredentials: true });
            const fetchedOrders = response.data.orders;

            // Create an array to hold the ratings promises
            const ratingsPromises = fetchedOrders.map(order =>
                axiosInstance.get(`/user/ratings/${order.orderId}`, { withCredentials: true })
                    .then(ratingsResponse => ({
                        orderId: order.orderId,
                        rating: ratingsResponse.data.rating || { rating: 0, count: 0 }
                    }))
                    .catch(() => ({ orderId: order.orderId, rating: { rating: 0, count: 0 } }))
            );

            // Wait for all ratings to be fetched
            const ratings = await Promise.all(ratingsPromises);
            console.log(ratings);
            

            if (fetchedOrders && fetchedOrders.length > 0) {
                setOrders((prevOrders) => [...prevOrders, ...fetchedOrders]);

                // Set initial ratings
                const initialRatings = {};
                ratings.forEach(({ orderId, rating }) => {
                    initialRatings[orderId] = rating; // Store rating for each order
                });
                setRating(prevRatings => ({ ...prevRatings, ...initialRatings }));

                setTotalPages(response.data.totalPages);
                setLoadingMore(false);
            } else {
                setLoadingMore(false);
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
            toast.error("Error fetching order data");
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
        fetchAddresses();
        fetchOrders();
    }, []);

    const handleRatingChange = async (e, orderId) => {
        const newRating = parseFloat(e.target.value);

        setRating((prev) => ({
            ...prev,
            [orderId]: {
                ...prev[orderId],
                rating: newRating,
                count: prev[orderId].count + (newRating < 4 ? 1 : 0),
            },
        }));

        // Check if orderId is defined and not null
        if (!orderId) {
            console.error('Order ID is missing. Cannot submit rating.');
            return; // Exit the function if orderId is not available
        }

        try {
            // Send the rating to the backend
            const response = await axiosInstance.post('/user/submit-rating', {
                orderId,
                rating: newRating,
            });
            console.log('Rating submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    useEffect(() => {
        console.log("Rating state after render:", rating);
    }, [rating]);

    // Handle "Load More"
    const handleLoadMore = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
            setLoadingMore(true);
            fetchOrders(page + 1);
        }
    };

    const [activeIndex, setActiveIndex] = useState(0);

    const sections = [
        { name: 'Orders' },
        { name: 'Addresses' },
        { name: 'Update Profile' },
        { name: 'Logout' }
    ];


    // Render section content
    const renderSectionContent = () => {
        switch (activeIndex) {
            case 0: // Orders
                return (
                    <div className="bg-bg-white p-4 rounded-lg">
                        {Array.isArray(orders) && orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div key={index} className="flex flex-col w-[20rem] sm:w-full border-2 border-solid border-selection-tint rounded-xl p-4 mb-4">
                                    <div className="flex gap-3">
                                        <img
                                            src={order.menuItems[0]?.image}
                                            alt={order.restaurant.name}
                                            className="w-20 h-20 object-cover rounded-lg border-[.2rem] border-solid border-white shadow-md"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <b className="font-medium">{order.restaurant.name}</b>
                                            <b className="font-medium text-sm text-label-tint">{order.restaurant.location}</b>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p>Order# {order.orderId}</p>
                                        <p>
                                            Delivered on{" "}
                                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}, {" "}
                                            {new Date(order.createdAt).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center pb-[2rem] h-0 gap-3">
                                        <div className="rating rating-sm">
                                            <input type="radio" name={`rating-${order.orderId}`} className="hidden" />
                                            {/* Add a hidden radio input to represent the "no selection" or 0 rating */}
                                            <input
                                                type="radio"
                                                name={`rating-${order.orderId}`}
                                                value={0}
                                                className="hidden"
                                                onChange={(e) => handleRatingChange(e, order.orderId)}
                                                checked={rating[order.orderId]?.rating === 0} // Checked if rating is 0
                                            />
                                            {[...Array(5)].map((_, idx) => {
                                                const starValue = idx + 1; // Star values from 1 to 5
                                                return (
                                                    <React.Fragment key={idx}>
                                                        <input
                                                            type="radio"
                                                            name={`rating-${order.orderId}`}
                                                            value={starValue}
                                                            checked={rating[order.orderId]?.rating === starValue} // Check the current rating value
                                                            onChange={(e) => handleRatingChange(e, order.orderId)}
                                                            className="mask mask-star-2 bg-tradewind"
                                                        />
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                        <div>
                                            <p className="">({rating[order.orderId]?.rating})</p>
                                            {/* <p>Number of Ratings Below 4: {rating[order.orderId]?.count}</p> */}
                                        </div>
                                    </div>
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
                                    <b className="pt-[1rem] font-bold">Total Paid: <span className="px-[.5rem]">₹{order.grandTotal}</span></b>
                                </div>
                            ))
                        ) : (
                            <p>No recent orders</p>
                        )}
                        {console.log("Current Page:", page)}
                        {console.log("Total Pages:", totalPages)}
                        {page < totalPages && (
                            <button
                                className="mt-4 p-2 w-full bg-bg-white border-[.1rem] border-solid border-tradewind text-tradewind rounded-md cursor-pointer"
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                            >
                                {loadingMore ? "Loading..." : "Load More"}
                            </button>
                        )}

                    </div>

                );

            case 1: // Addresses
                return (
                    <div className="bg-bg-white p-4 rounded-lg shadow-lg border border-solid border-selection-tint w-1/2">
                        <h2 className="text-lg font-semibold mb-2">Manage Addresses</h2>
                        <form onSubmit={handleAddOrUpdateAddress} className="mb-4">
                            <input
                                type="text"
                                placeholder="Street"
                                value={addressForm.street}
                                onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                required
                                className="border border-solid border-selection-tint p-2 mb-2 w-full bg-bg-white text-dark rounded"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={addressForm.city}
                                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                required
                                className="border border-solid border-selection-tint p-2 mb-2 w-full bg-bg-white text-dark rounded"
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={addressForm.state}
                                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                required
                                className="border border-solid border-selection-tint p-2 mb-2 w-full bg-bg-white text-dark rounded"
                            />
                            <input
                                type="text"
                                placeholder="ZIP"
                                value={addressForm.zip}
                                onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                                required
                                className="border border-solid border-selection-tint p-2 mb-2 w-full bg-bg-white text-dark rounded"
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={addressForm.country}
                                onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                                required
                                className="border border-solid border-selection-tint p-2 mb-2 w-full bg-bg-white text-dark rounded"
                            />
                            <button type="submit" className="bg-tradewind text-white p-2 rounded cursor-pointer">
                                {editingAddressId ? "Update Address" : "Add Address"}
                            </button>
                        </form>

                        {loadingAddresses ? (
                            <p>Loading addresses...</p>
                        ) : addresses.length > 0 ? (
                            addresses.map((address) => (
                                <div key={address._id} className="mb-2 p-2 border border-gray-300 rounded-md">
                                    <p>{address.street}, {address.city}, {address.state}, {address.zip}</p>
                                    <p>{address.country}</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleEditAddress(address)} className="w-[4rem] h-[1.5rem] bg-bg-white border-[.1rem] border-solid border-tradewind text-tradewind rounded hover:bg-tradewind hover:text-bg-white hover:border-0 cursor-pointer">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteAddress(address._id)} className="w-[4rem] h-[1.5rem] bg-bg-white border-[.1rem] border-solid border-jaffa text-jaffa rounded hover:bg-jaffa hover:text-bg-white hover:border-0 cursor-pointer">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No addresses found</p>
                        )}
                    </div>
                );
            case 2: // Update Profile
                return (
                    <div className="bg-bg-white p-4 rounded-lg w-1/2">
                        <h2 className="text-lg font-bold mb-4">Update Profile</h2>
                        {/* Update Profile Form */}
                        <form>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="p-2 border border-solid border-selection-tint rounded bg-bg-white text-dark"
                                    defaultValue={user?.name}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="p-2 border border-solid border-selection-tint rounded bg-bg-white text-dark"
                                    defaultValue={user?.email}
                                />
                                <button type="submit" className="bg-tradewind text-white p-2 rounded cursor-pointer">Update</button>
                            </div>
                        </form>
                    </div>
                );
            case 3: // Logout
                return (
                    <div onClick={handleLogout} className="bg-bg-white p-4 rounded-lg border-[.2rem] border-solid border-selection-tint">
                        <button className="px-[1.5rem] py-[.5rem] rounded-lg border-[.2rem] border-solid border-tradewind bg-bg-white text-tradewind hover:bg-jaffa hover:text-bg-white hover:border-0 text-xl cursor-pointer">
                            Logout
                        </button>
                    </div>
                );
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
                            <ul className="space-y-4 p-4">
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
                        {/* Right Side Content */}
                        <div className="w-9/12 flex flex-col pl-4">
                            {renderSectionContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfilePage.propTypes = {
    user: PropTypes.object,
    orders: PropTypes.array,
};

export default ProfilePage;

