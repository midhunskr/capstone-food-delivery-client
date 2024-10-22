import PropTypes from "prop-types"
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axioInstance";
import { useDispatch, useSelector } from "react-redux"
import { clearCart, decrement, increment, setCartItems } from "../../redux/features/cartSlice"
import { useNavigate, useParams } from "react-router-dom"
import debounce from 'lodash.debounce'

export const CheckoutPage = () => {

    const { id } = useParams()
    const [restaurant, setRestaurant] = useState({})
    const cartItems = useSelector((state) => state.cart.cartItems)
    
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    const [isCartEmpty, setIsCartEmpty] = useState(totalQuantity === 0); // Track if cart is empty
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');
    // const totalAmount = useSelector((state) => state.cart.cartTotalAmount);
    const [isAddressSelected, setIsAddressSelected] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });
    const [savedAddress, setSavedAddress] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const couponDiscounts = {
        FLAT10: 10,
        FLAT15: 15,
        FLAT20: 20,
        FLAT25: 25,
        FLAT30: 30,
    }

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []); // Empty dependency array ensures this runs only on mount

    // Fetch cart on component mount
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const restaurantId = `${id}`;
                const response = await axiosInstance({
                    url: `/cart?restaurantId=${restaurantId}`,
                    method: 'GET',
                    withCredentials: true,
                });

                const fetchedCartItems = response.data.cart.cartItems;
                

                // Ensure that either _id or menuItem exists and quantity is > 0
                const validCartItems = fetchedCartItems.filter(item => (item._id || item.menuItem) && item.quantity > 0);
                console.log("Valid cart items:", validCartItems);

                // Dispatch valid cart items to Redux in one go
                dispatch(setCartItems(validCartItems)); // Set all items at once
            } catch (error) {
                console.error("Failed to fetch cart items:", error.response ? error.response.data : error.message);
            }
        };

        fetchCart(); // Fetch the cart when the component mounts
    }, [dispatch]);

    // Handle increment action
    const handleIncrement = async (item) => {
        console.log('Increment clicked for:', item._id || item.menuItem);
        dispatch(increment(item._id || item.menuItem)); // Increment Redux state
        // await updateCart(); // Optionally update the cart immediately after increment
    };

    // Handle decrement action
    const handleDecrement = async (item) => {
        console.log('Decrement clicked for:', item._id || item.menuItem);
        dispatch(decrement(item._id || item.menuItem)); // Decrement Redux state
        // await updateCart(); // Optionally update the cart immediately after decrement
    };

    // Update cart in backend (debounced)
    const updateCart = debounce(async () => {
        try {
            // Map cart items for backend format
            const menuItems = cartItems.map(item => ({
                menuItemId: item.menuItem ? item.menuItem : item._id,
                quantity: item.quantity,
            }));
            const restaurantId = `${id}`;

            // Send update request to backend
            const response = await axiosInstance({
                url: '/cart/update',
                method: 'POST',
                withCredentials: true,
                data: { menuItems, restaurantId },
            });

            console.log("Cart updated:", response.data);

            // If cart is cleared, update Redux state and UI
            if (response.data.cart.cartItems.length === 0) {
                dispatch(clearCart()); // Clear the cart in Redux
            }
        } catch (error) {
            console.error("Failed to update cart:", error);
        }
    }, 500); // 500ms debounce time

    // Effect to update the cart in the backend when Redux cartItems change
    useEffect(() => {
        if (cartItems.length > 0) {
            updateCart(); // Update backend cart when cartItems change
        }
    }, [cartItems]); // Only run this effect when cartItems change


    //decrement logic
    // const handleDecrement = (item) => {
    //     dispatch(decrement(item._id || item.menuItem)); // Dispatch decrement action
    //     const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    //     if (totalQuantity <= 1) {
    //         clearCartOnServer(); // Call function to clear the cart on server
    //         setIsCartEmpty(true); // Show 'Your cart is empty' message
    //     }
    // };

    const handleOpenForm = () => {
        setIsFormOpen(true);
        setTimeout(() => setIsVisible(true), 10); // Small delay to trigger the fade-in transition
    };

    const handleCloseForm = () => {
        setIsVisible(false);
        setTimeout(() => setIsFormOpen(false), 300); // Delay closing until fade-out is complete
    };

    const handleDeliverButtonClick = () => {
        setIsAddressSelected(true);  // When user clicks 'Deliver Here' button
    };

    const fadeStyles = {
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)'
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Save address to the backend (simulating with a timeout for now)
    const handleSaveAddress = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to save the address
            const response = await axiosInstance.post('/user/address', newAddress);
            console.log(response.data.addresses);

            const addresses = response.data.addresses;
            // Set the saved address in state
            setSavedAddress(addresses[addresses.length - 1]);

            // Close form and mark address as selected
            // setIsFormOpen(false);
            // setIsAddressSelected(true);

            // Close the form
            handleCloseForm();
            console.log("Address saved successfully!");

        } catch (error) {
            console.error("Error saving address:", error);
        }
    };

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []); // Empty dependency array ensures this runs only on mount

    // Fetch restaurant data
    const fetchRestaurant = async () => {
        try {
            const response = await axiosInstance({
                url: `/restaurant/${id}`,
                method: 'GET',
                withCredentials: true
            });
            if (response?.data?.restaurant) {
                setRestaurant(response.data.restaurant);
            } else {
                setRestaurant(null);
            }
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchRestaurant();
        }
    }, [id]);

    useEffect(() => {
        // Update the cart empty state whenever cartItems changes
        setIsCartEmpty(totalQuantity === 0);
    }, [totalQuantity]);

    // Function to clear the cart on the server
    const clearCartOnServer = async () => {
        try {
            const response = await axiosInstance({
                url: '/cart/clear', // Assuming you have this route on your server
                method: 'POST',
                withCredentials: true,
            });
            console.log("Cart cleared on server:", response.data);
            dispatch(clearCart()); // Clear the cart in Redux after server clears it
        } catch (error) {
            console.error("Failed to clear cart on server:", error.response ? error.response.data : error.message);
        }
    };

    // Price calculation
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = 35;
    const taxRate = (totalPrice * 18) / 100;
    const grandTotal = (totalPrice + deliveryFee + taxRate).toFixed(2);

    const handleApplyCoupon = () => {
        if (couponDiscounts[couponCode]) {
            const discountPercentage = couponDiscounts[couponCode];
            setDiscount(discountPercentage);
            setError(''); // Clear any error message
        } else {
            setError('Invalid coupon code');
            setDiscount(0);
        }
    };

    const discountedAmount = grandTotal - (grandTotal * discount) / 100;

    //razorpay
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }
        try {
            const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

            // Prepare the order data to send to the backend
            const orderData = {
                menuItems: cartItems.map(item => ({
                    ...item,
                    images: [item.image],
                    price: Number(item.price)
                })),
                restaurant: id,
                totalPrice,
                deliveryFee,
                taxRate,
                grandTotal,
                customerName: 'John Doe',
                customerAddress: {
                    line1: '123 Main St',
                    city: 'New York',
                    state: 'KL',
                    country: 'IN',
                    postal_code: '10001'
                }
            };

            // Send the order data to the backend to create a Razorpay order
            const response = await axiosInstance({
                url: "/payment/create-razorpay-order",
                method: "POST",
                data: orderData,
                withCredentials: true
            });

            const { orderId } = response.data;

            const options = {
                key: razorpayKeyId, // Razorpay key from environment variables
                amount: grandTotal * 100, // Amount in paise (multiply by 100)
                currency: 'INR',
                name: 'Chewes Food Delivery',
                description: 'Order Payment',
                order_id: orderId, // The order ID from the response
                handler: function (response) {
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    dispatch(clearCart())
                    // Handle post-payment tasks, like updating the database
                    navigate('/user/profile'); // Redirect to orders page
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.log("Error creating Razorpay order:", error);
        }
    };

    const [defaultAddress, setDefaultAddress] = useState(null);
    const fetchAddresses = async () => {
        try {
            const response = await axiosInstance({
                url: "/user/addresses",
                method: "GET",
                withCredentials: true,
            });
            console.log(response);

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
            <div className="px-[1rem]  md:px-[2rem] lg:px-[10rem] xl:px-[25rem]  bg-bg-white text-dark">
                <div className="pt-[1rem]">
                    <div className="h-full w-[70.5rem] flex flex-col items-start justify-start box-border gap-[2.012rem] max-w-full">
                        <div className="self-stretch flex flex-col items-start justify-start pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full">
                            <b className="text-dark font-bold text-[1.2rem] sm:text-[1.4rem] lg:py-[1rem]">Select delivery address</b>
                            <b className="text-sm lg:text-mid font-normal text-label-tint pt-[1rem] lg:py-[.5rem]">Select your address or add a new one</b>
                        </div>
                    </div>
                </div>
                <div className=" bg-bg-white text-dark  pt-[2rem] box-border text-left text-[1.5rem] font-montserrat">
                    <div className="h-full w-[70.5rem] flex flex-col box-border gap-[2.012rem] max-w-full">
                        <div className="self-stretch flex flex-col pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full">
                            <div className="flex flex-col gap-[2rem] sm:flex sm:flex-row w-12/12 justify-between pb-[4rem]">
                                <div className="addressSection flex w-6/12 flex-col bg-bg-white text-dark gap-[3rem]">
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

                                                        <div className="bg-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md hover:shadow-lg hover:outline hover:outline-[.3rem] hover:outline-white transition duration-300">
                                                            <b onClick={handleDeliverButtonClick} className="deliverButton text-mid text-bg-white">DELIVER HERE</b>
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
                                                            {savedAddress && (
                                                                <b className="newSavedAddress text-sm font-normal text-label-tint py-1">{savedAddress.street}, {savedAddress.city}, {savedAddress.state}, {savedAddress.zip}</b>
                                                            )}
                                                        </div>
                                                        <div className="border-solid border-[.2rem] border-tradewind w-[12rem] h-[1rem] flex items-center justify-center py-[1rem] cursor-pointer rounded-md hover:shadow-lg hover:border-[.2rem] hover:border-solid hover:border-tradewind hover:py-[1rem] transition duration-300">
                                                            <b onClick={handleOpenForm} className="addButton text-mid text-tradewind">ADD NEW</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`paymentSection bg-bg-white text-dark ${!isAddressSelected ? 'disabled' : ''}`}
                                    style={{ pointerEvents: !isAddressSelected ? 'none' : 'auto', opacity: !isAddressSelected ? 0.5 : 1 }}
                                >
                                    <div className="w-[18rem] sm:w-full">
                                        {isCartEmpty ? (
                                            <div className="flex justify-center items-center h-full">
                                                <b>Your cart is empty</b>
                                            </div>
                                        ) : (
                                            <div className="px-[1rem] py-[1rem] sm:py-[2rem] sm:px-[4rem] h-auto flex flex-col gap-[2rem] border-2 border-solid border-selection-tint rounded-2xl">
                                                <div className="flex gap-3">
                                                    <div className="w-[6rem] h-[6rem] border-4 border-solid border-white rounded-xl shadow-md" style={{
                                                        backgroundImage: `url(${cartItems[0]?.image})`, backgroundSize: 'cover',
                                                        backgroundPosition: 'left center',
                                                    }} />
                                                    <div className="flex flex-col gap-3">
                                                        <b className="restaurantName text-xl text-dark">{restaurant.name}</b>
                                                        <b className="restaurantName text-mid text-label-tint font-normal">{restaurant.location}</b>
                                                    </div>
                                                </div>
                                                <div className="itemScroll overflow-y-auto  flex flex-col justify-center">
                                                    {cartItems.map(item => (
                                                        <div key={item._id} className="itemImageSection flex flex-col gap-3 sm:flex sm:flex-row sm:justify-between sm:items-center py-[1rem] ">
                                                            <div className="flex gap-3 sm:w-[8.7rem]">
                                                                {item.veg ? (
                                                                    <img src="/veg.svg" alt="veg" className="w-[1rem] h-auto" />
                                                                ) : (
                                                                    <img src="/non-veg.svg" alt="non-veg" className="w-[1rem] h-auto" />
                                                                )}
                                                                <b className="text-mid text-dark font-normal">{item.name}</b>
                                                            </div>
                                                            <div className="flex justify-between gap-3 items-center">
                                                                <div className="w-[7rem] h-[2rem] flex items-center justify-between px-[1rem] text-tradewind text-mid font-bold gap-3 bg-bg-white border-[.3rem] border-solid border-white rounded-lg shadow-lmd">
                                                                    <button
                                                                        onClick={() => handleDecrement(item)}
                                                                        className="bg-transparent text-xl font-bold flex justify-center rounded-md text-tradewind cursor-pointer">
                                                                        -
                                                                    </button>

                                                                    <span className="font-bold">
                                                                        {item.quantity}
                                                                    </span>

                                                                    <button
                                                                        onClick={() => handleIncrement(item)}
                                                                        className="bg-transparent text-xl font-bold flex justify-center rounded-md text-tradewind cursor-pointer">
                                                                        +
                                                                    </button>
                                                                </div>
                                                                <b className="font-normal text-mid">₹{item.price}</b>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="">
                                                    <b>Bill details</b>
                                                    <div className="flex justify-between pt-5">
                                                        <b className="text-label-tint font-normal text-mid">Item Total</b>
                                                        <b className="text-label-tint font-normal text-mid">₹{totalPrice}</b>
                                                    </div>
                                                    <div className="flex justify-between py-5">
                                                        <b className="text-label-tint font-normal text-mid">Delivery Fee</b>
                                                        <b className="text-label-tint font-normal text-mid">₹{deliveryFee}</b>
                                                    </div>
                                                    <div className="py-[.5rem]">
                                                        <div className="w-full border-[.08rem] border-solid border-selection-tint" />
                                                    </div>
                                                    <div className="flex justify-between py-[1rem]">
                                                        <b className="text-label-tint font-normal text-mid">GST & Restaurant Charges</b>
                                                        <b className="text-label-tint font-normal text-mid">₹{taxRate}</b>
                                                    </div>
                                                    <div className="flex justify-between gap-4 pb-[2rem]">

                                                        <input
                                                            className="border-2 border-solid border-selection-tint bg-bg-white text-label-tint rounded-md h-10 w-full placeholder:text-selection-tint placeholder:pl-3"
                                                            type="text"
                                                            id="coupon"
                                                            value={couponCode}
                                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                            placeholder="Enter coupon code"
                                                        />
                                                        <button className="bg-tradewind text-bg-white w-[6rem] rounded-md cursor-pointer hover:shadow-lg hover:outline hover:outline-[.2rem] hover:outline-white transition duration-300" onClick={handleApplyCoupon}>Apply</button>
                                                    </div>

                                                    {error && <p style={{ color: 'red' }}>{error}</p>}

                                                    {discount > 0 && <p>You saved {discount}%!</p>}
                                                    <div className="pb-[1rem]">
                                                        <div className="w-full border-[.1rem] border-solid border-tradewind" />
                                                    </div>
                                                    <div disabled={!isAddressSelected} onClick={handlePayment} className="flex justify-between py-[1rem] bg-tradewind items-center w-full h-[3rem] px-[1rem] text-bg-white text-xl rounded-[.5rem] cursor-pointer hover:shadow-xl hover:outline hover:outline-[.3rem] hover:outline-white transition duration-300">
                                                        <b>TO PAY</b>
                                                        <b>₹{discount > 0 ? discountedAmount.toFixed(2) : grandTotal}</b>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Popup Form for Adding Address */}
                                {isFormOpen && (
                                    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ${isFormOpen ? 'opacity-100' : 'opacity-0'}`}>
                                        <div style={fadeStyles} className={`bg-bg-white p-6 rounded-2xl w-full max-w-md transform transition-transform duration-300 ease-in-out ${isFormOpen ? 'scale-100' : 'scale-0'}`}>
                                            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
                                            <form className="space-y-4">
                                                <div>
                                                    <label className="block mb-1 text-lg text-label-tint">
                                                        Street:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="street"
                                                        value={newAddress.street}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-3 py-2 bg-bg-white text-dark border-[.1rem] border-solid border-selection-tint rounded-md focus:outline-none focus:border-tradewind"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-lg text-label-tint">
                                                        City:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={newAddress.city}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-3 py-2 bg-bg-white text-dark border-[.1rem] border-solid border-selection-tint rounded-md focus:outline-none focus:border-tradewind"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-lg text-label-tint">
                                                        Zip Code:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="zipCode"
                                                        value={newAddress.zipCode}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-3 py-2 bg-bg-white text-dark border-[.1rem] border-solid border-selection-tint rounded-md focus:outline-none focus:border-tradewind"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block mb-1 text-lg text-label-tint">
                                                        Country:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        value={newAddress.country}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-3 py-2 bg-bg-white text-dark border-[.1rem] border-solid border-selection-tint rounded-md focus:outline-none focus:border-tradewind"
                                                    />
                                                </div>
                                                <div className="flex justify-between">
                                                    <button
                                                        onClick={handleSaveAddress}
                                                        type="submit"
                                                        className="bg-bg-white border-[.15rem] border-solid border-tradewind text-tradewind w-[12rem] font-bold text-lg flex items-center justify-center py-2 cursor-pointer rounded-lg hover:shadow-xl hover:py-[.7rem] hover:border-0 hover:bg-tradewind hover:text-bg-white transition duration-150"
                                                    >
                                                        Save Address
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleCloseForm}
                                                        className="bg-bg-white border-[.15rem] border-solid border-tradewind text-tradewind w-[12rem] font-bold text-lg flex items-center justify-center py-2 cursor-pointer rounded-lg hover:shadow-xl hover:py-[.7rem] hover:border-0 hover:bg-tradewind hover:text-bg-white transition duration-150"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
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
}
