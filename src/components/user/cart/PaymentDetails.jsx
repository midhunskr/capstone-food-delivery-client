// import PropTypes from "prop-types"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { clearCart, decrement, increment } from "../../../redux/features/cartSlice"
// import { axiosInstance } from "../../../config/axioInstance"
// import { useNavigate, useParams } from "react-router-dom"


// export const PaymentDetails = () => {


//     const { id } = useParams()
//     const [restaurant, setRestaurant] = useState({})
//     const cartItems = useSelector((state) => state.cart.cartItems)
//     // const [orderData, setOrderData] = useState(null)
//     const [isCartEmpty, setIsCartEmpty] = useState(false);
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     //Fetch backend data
//     const fetchRestaurant = async () => {
//         try {
//             const response = await axiosInstance({
//                 url: `/restaurant/${id}`,  // Ensure this URL is correct
//                 method: 'GET',
//                 withCredentials: true
//             });
//             // Check if the response contains the expected data
//             if (response?.data?.restaurant) {
//                 setRestaurant(response.data.restaurant);
//             } else {
//                 console.log("No restaurant data found"); // Log if restaurant data is missing
//                 setRestaurant(null); // Fallback if restaurant not found
//             }
//         } catch (error) {
//             console.error("Error fetching restaurant data:", error); // Log any errors
//             toast.error('Error fetching restaurant data');
//         }
//     };

//     useEffect(() => {
//         if (id) {
//             fetchRestaurant(); // Fetch restaurant when component mounts
//         }
//     }, [id]);

//     console.log(cartItems);

//     //Price calculation
//     const totalPrice = cartItems.reduce((total, item) => {
//         const itemTotalPrice = item.price * item.quantity
//         return total + itemTotalPrice;
//     }, 0)

//     const deliveryFee = 35
//     const taxRate = (totalPrice * 18) / 100
//     const grandTotal = (totalPrice + deliveryFee + taxRate).toFixed(2)

//     //razorpay
//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.onload = () => {
//                 resolve(true);
//             };
//             script.onerror = () => {
//                 resolve(false);
//             };
//             document.body.appendChild(script);
//         });
//     };

//     console.log(restaurant);


//     const handlePayment = async () => {
//         const res = await loadRazorpayScript();
//         if (!res) {
//             alert('Razorpay SDK failed to load. Are you online?');
//             return;
//         }
//         try {
//             const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

//             // Prepare the order data to send to the backend
//             const orderData = {
//                 menuItems: cartItems.map(item => ({
//                     ...item,
//                     images: [item.image],
//                     price: Number(item.price)
//                 })),
//                 restaurant: id,
//                 totalPrice,
//                 deliveryFee,
//                 taxRate,
//                 grandTotal,
//                 customerName: 'John Doe',
//                 customerAddress: {
//                     line1: '123 Main St',
//                     city: 'New York',
//                     state: 'KL',
//                     country: 'IN',
//                     postal_code: '10001'
//                 }
//             };

//             // Send the order data to the backend to create a Razorpay order
//             const response = await axiosInstance({
//                 url: "/payment/create-razorpay-order",
//                 method: "POST",
//                 data: orderData,
//                 withCredentials: true
//             });

//             const { orderId } = response.data;

//             const options = {
//                 key: razorpayKeyId, // Razorpay key from environment variables
//                 amount: grandTotal * 100, // Amount in paise (multiply by 100)
//                 currency: 'INR',
//                 name: 'Chewes Food Delivery',
//                 description: 'Order Payment',
//                 order_id: orderId, // The order ID from the response
//                 handler: function (response) {
//                     alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//                     dispatch(clearCart())
//                     // Handle post-payment tasks, like updating the database
//                     navigate('/user/profile'); // Redirect to orders page
//                 },
//                 prefill: {
//                     name: 'John Doe',
//                     email: 'john.doe@example.com',
//                     contact: '9999999999',
//                 },
//                 theme: {
//                     color: '#3399cc',
//                 },
//             };

//             const paymentObject = new window.Razorpay(options);
//             paymentObject.open();

//         } catch (error) {
//             console.log("Error creating Razorpay order:", error);
//         }
//     };

//     return (
//         <div className="w-[18rem] sm:w-full">
//             <div className="px-[1rem] py-[1rem] sm:py-[2rem] sm:px-[4rem] h-auto flex flex-col gap-[2rem] border-2 border-solid border-selection-tint rounded-2xl">
//                 <div className="flex gap-3">
//                     <div className="w-[6rem] h-[6rem] border-4 border-solid border-white rounded-xl shadow-md" style={{
//                         backgroundImage: `url(${cartItems[0]?.image})`, backgroundSize: 'cover',
//                         backgroundPosition: 'left center',
//                     }} />
//                     <div className="flex flex-col gap-3">
//                         <b className="restaurantName text-xl text-dark">{restaurant.name}</b>
//                         <b className="restaurantName text-mid text-label-tint font-normal">{restaurant.location}</b>
//                     </div>
//                 </div>
//                 <div>
//                     {/* <div className="pb-[1rem]">
//                         <div className="w-full border-[.08rem] border-solid border-selection-tint" />
//                     </div> */}
//                     <div className="itemScroll overflow-y-auto h-[10rem]">
//                         {cartItems.map(item => (
//                             <div key={item._id} className="itemImageSection flex flex-col gap-3 sm:flex sm:flex-row sm:justify-between sm:items-center py-[1rem] ">
//                                 <div className="flex gap-3 sm:w-[8.7rem]">
//                                     {item.veg ? (
//                                         <img
//                                             src="/veg.svg"
//                                             alt="veg"
//                                             className="w-[1rem] h-auto"
//                                         />
//                                     ) : (
//                                         <img
//                                             src="/non-veg.svg"
//                                             alt="non-veg"
//                                             className="w-[1rem] h-auto"
//                                         />
//                                     )}
//                                     <b className="text-mid text-dark font-normal">{item.name}</b>
//                                 </div>
//                                 <div className="flex justify-between gap-3 items-center">
//                                     <div className="w-[7rem] h-[2rem] flex items-center justify-between px-[1rem] text-tradewind text-mid font-bold gap-3 bg-bg-white border-[.3rem] border-solid border-white rounded-lg shadow-lmd">
//                                         <button
//                                             onClick={() => {
//                                                 dispatch(decrement(item._id));

//                                                 // Check if the item's quantity is now 0
//                                                 const updatedItem = cartItems.find(cartItem => cartItem._id === item._id || cartItem.menuItem === item._id);
//                                                 if (updatedItem && updatedItem.quantity === 0) {
//                                                     setIsCartEmpty(true);
//                                                 }
//                                             }}
//                                             className="bg-transparent text-xl font-bold flex justify-center rounded-md text-tradewind cursor-pointer">
//                                             -
//                                         </button>

//                                         <span className="font-bold">
//                                             {cartItems.find(cartItem => cartItem.menuItem === item._id || cartItem._id === item._id)?.quantity || 0}
//                                         </span>

//                                         <button
//                                             onClick={() => {
//                                                 dispatch(increment(item._id));
//                                             }}
//                                             className="bg-transparent text-xl font-bold flex justify-center rounded-md text-tradewind cursor-pointer">
//                                             +
//                                         </button>
//                                     </div>
//                                     <b className="font-normal text-mid">₹{item.price}</b>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="pt-[2rem]">
//                         <b>Bill details</b>
//                         <div className="flex justify-between pt-5">
//                             <b className="text-label-tint font-normal text-mid">Item Total</b>
//                             <b className="text-label-tint font-normal text-mid">₹{totalPrice}</b>
//                         </div>
//                         <div className="flex justify-between py-5">
//                             <b className="text-label-tint font-normal text-mid">Delivery Fee</b>
//                             <b className="text-label-tint font-normal text-mid">₹{deliveryFee}</b>
//                         </div>
//                         <div className="py-[.5rem]">
//                             <div className="w-full border-[.08rem] border-solid border-selection-tint" />
//                         </div>
//                         <div className="flex justify-between py-[1rem]">
//                             <b className="text-label-tint font-normal text-mid">GST & Restaurant Charges</b>
//                             <b className="text-label-tint font-normal text-mid">₹{taxRate}</b>
//                         </div>
//                         <div className="pb-[2rem] pt-[1rem]">
//                             <div className="w-full border-[.1rem] border-solid border-tradewind" />
//                         </div>
//                         <div onClick={handlePayment} className="flex justify-between py-[1rem] bg-tradewind items-center w-full h-[3rem] px-[1rem] text-bg-white text-xl rounded-[.5rem] cursor-pointer shadow-lg">
//                             <b>TO PAY</b>
//                             <b>₹{grandTotal}</b>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// PaymentDetails.propTypes = {
//     className: PropTypes.string
// }

import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, decrement, increment } from "../../../redux/features/cartSlice"
import { axiosInstance } from "../../../config/axioInstance"
import { useNavigate, useParams } from "react-router-dom"

export const PaymentDetails = () => {

    const { id } = useParams()
    const [restaurant, setRestaurant] = useState({})
    const cartItems = useSelector((state) => state.cart.cartItems)
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity
    const [isCartEmpty, setIsCartEmpty] = useState(totalQuantity === 0); // Track if cart is empty
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');
    const totalAmount = useSelector((state) => state.cart.cartTotalAmount);

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

    //decrement logic
    const handleDecrement = (item) => {
        dispatch(decrement(item._id || item.menuItem)); // Dispatch decrement action
        const totalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        if (totalQuantity <= 1) {
            clearCartOnServer(); // Call function to clear the cart on server
            setIsCartEmpty(true); // Show 'Your cart is empty' message
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

    console.log(restaurant);


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

    return (
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
                    <div className="itemScroll overflow-y-auto h-[10rem]">
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
                                            onClick={() => {
                                                dispatch(increment(item._id));
                                            }}
                                            className="bg-transparent text-xl font-bold flex justify-center rounded-md text-tradewind cursor-pointer">
                                            +
                                        </button>
                                    </div>
                                    <b className="font-normal text-mid">₹{item.price}</b>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-[2rem]">
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
                                className="border-[.2rem] border-solid border-selection-tint bg-bg-white text-label-tint rounded-md h-10 w-full placeholder:text-selection-tint placeholder:pl-3"
                                type="text"
                                id="coupon"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Enter coupon code"
                            />
                            <button className="bg-tradewind text-bg-white w-[6rem] rounded-md" onClick={handleApplyCoupon}>Apply</button>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        {discount > 0 && <p>You saved {discount}%!</p>}
                        <div className="pb-[1rem]">
                            <div className="w-full border-[.1rem] border-solid border-tradewind" />
                        </div>
                        <div onClick={handlePayment} className="flex justify-between py-[1rem] bg-tradewind items-center w-full h-[3rem] px-[1rem] text-bg-white text-xl rounded-[.5rem] cursor-pointer shadow-lg">
                            <b>TO PAY</b>
                            <b>₹{discount > 0 ? discountedAmount.toFixed(2) : grandTotal}</b>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

PaymentDetails.propTypes = {
    className: PropTypes.string
};
