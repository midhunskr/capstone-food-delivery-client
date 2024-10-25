import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createRestaurant, deleteRestaurant } from "../../services/restaurantApi";
import { adminLogout } from "../../services/userApi";
import { getAllRestaurants } from "../../services/restaurantApi";
import { clearAdmin } from "../../redux/features/adminSlice";
import { useDispatch } from "react-redux";

export const AdminProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [restaurants, setRestaurants] = useState([])
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown
  const [selected, setSelected] = useState(null); // State to store selected item
  const [menuItems, setMenuItems] = useState([{ name: '', price: '', category: '', image1: null, image2: null }]);

  const sections = [
    { name: 'Manage Restaurants', content: 'Content for managing restaurants' },
    { name: 'List all restaurants', content: restaurants },
    { name: 'Logout', content: 'Content for logging out' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();

  // Handle restaurant form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);

    menuItems.forEach((item, index) => {
      formData.append(`menuItems[${index}].name`, item.name);
      formData.append(`menuItems[${index}].price`, item.price);
      formData.append(`menuItems[${index}].category`, item.category);
      formData.append(`menuItems[${index}].image1`, item.image1);
      formData.append(`menuItems[${index}].image2`, item.image2);
    });

    try {
      const response = await createRestaurant(formData);
      if (response.success) {
        toast.success('Restaurant created successfully');
        navigate('/admin/profile');
      } else {
        toast.error('Failed to create restaurant');
      }
    } catch (error) {
      toast.error('Error: Could not create restaurant');
      console.error(error);
    }
  };

  //Fetch all restaurants
  useEffect(() => {
    if (activeIndex === 1) {
      const fetchRestaurants = async () => {
        try {
          const data = await getAllRestaurants();
          if (data && data.success) {
            const sortedRestaurants = (data.restaurants || []).sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt); // Assuming 'createdAt' is the date field
            });
            setRestaurants(sortedRestaurants);
          }
        } catch (error) {
          console.error("Error fetching restaurants:", error);
        }
      };

      fetchRestaurants();
    }
  }, [activeIndex]);

  // Handle adding new menu item
  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', price: '', category: '', image1: null, image2: null }]);
  };

  // Handle menu item field changes
  const handleMenuItemChange = (index, field, value) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index][field] = value;
    setMenuItems(updatedMenuItems);
  };

  // Handle file input change for menu item image
  const handleFileChange = (index, file) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index].image1 = file;
    updatedMenuItems[index].image2 = file;
    setMenuItems(updatedMenuItems);
  };

  const handleLogout = async () => {
    const response = await adminLogout();
    if (response?.success) {
      toast.success('Logged out successfully!')
      dispatch(clearAdmin())
      navigate('/admin/login');
    }
  };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleEdit = (id) => {
    // Logic to navigate to an edit form or show a modal with form fields populated with restaurant data
    console.log("Edit restaurant with id:", id);
    // Example: navigate(`/admin/edit-restaurant/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this restaurant?");
    if (confirmed) {
      try {
        // Call your delete restaurant API here
        const response = await deleteRestaurant(id); // Replace with actual delete function
        if (response.success) {
          toast.success("Restaurant deleted successfully");
          setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id)); // Update local state
        } else {
          toast.error("Failed to delete restaurant");
        }
      } catch (error) {
        console.error("Error deleting restaurant:", error);
        toast.error("Error deleting restaurant");
      }
    }
  };

  return (
    <div className="self-stretch flex flex-col bg-bg-white items-center justify-center py-[0rem] px-[1.25rem] pb-[2rem] box-border max-w-full text-left text-[1.5rem] text-dark">
      <div className="h-full w-[70.5rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0rem] box-border gap-[2.012rem] max-w-full">
        <div className="flex flex-col py-[2rem] pl-[0.5rem] pr-[0rem] box-border shrink-0 max-w-full gap-[1.25rem]">
          <b>Hi there!</b>
        </div>
        <div className="flex items-start justify-center gap-[6rem]">
          <div className="flex gap-[4rem] items-center">
            {/* Left Side Menu */}
            <div className="w-[22rem] border-r border-gray-300">
              <ul className="space-y-8 list-none">
                {sections.map((section, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 rounded-md ${activeIndex === index ? 'bg-tradewind text-bg-white' : 'hover:bg-gray-300'}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {section.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Right Side Content */}
          <div className="w-7/12 border-[.1rem] border-solid border-selection-tint px-[2rem] py-[2rem] rounded-xl">
            {activeIndex === 0 ? (
              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="input-box flex flex-col">
                  <label htmlFor="#">Name</label>
                  <input type="text" {...register("name")} placeholder="Enter restaurant name*" required />
                </div>
                <div className="input-box flex flex-col">
                  <label htmlFor="#">Description</label>
                  <input type="text" {...register("description")} placeholder="Enter description*" required />
                </div>
                <div className="input-box flex flex-col">
                  <label htmlFor="#">Location</label>
                  <input type="text" {...register("location")} placeholder="Enter location*" required />
                </div>

                <div className="text-[1rem] flex flex-col">
                  <label className="font-bold" htmlFor="#">Food Items</label>
                </div>

                {menuItems.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="input-box flex flex-col">
                      <label htmlFor={`menuItems[${index}].name`}>Item Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
                        placeholder="Enter food item name*"
                        required
                      />
                    </div>
                    <div className="input-box flex flex-col">
                      <label htmlFor={`menuItems[${index}].price`}>Price</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
                        placeholder="Enter price*"
                        required
                      />
                    </div>
                    <div className="input-box flex flex-col">
                      <label htmlFor={`menuItems[${index}].veg`}>Veg or Non-veg</label>
                      <input
                        type="text"
                        value={item.veg}
                        onChange={(e) => handleMenuItemChange(index, 'veg', e.target.value)}
                        placeholder="Enter Veg or non-veg*"
                        required
                      />
                    </div>
                    <div className="input-box flex flex-col">
                      <label htmlFor={`menuItems[${index}].category`}>Category</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => handleMenuItemChange(index, 'category', e.target.value)}
                        placeholder="Enter category*"
                        required
                      />
                    </div>
                    <div className="input-box flex flex-col">
                      <label htmlFor={`menuItems[${index}].recommended`}>Featured or Non-featured</label>
                      <input
                        type="text"
                        value={item.recommended}
                        onChange={(e) => handleMenuItemChange(index, 'recommended', e.target.value)}
                        placeholder="Enter featured or Non-featured*"
                        required
                      />
                    </div>
                    <div className="input-box flex flex-col">
                      <label htmlFor={`menuItems[${index}].image1`}>Image 1</label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        required
                      />
                    </div>
                    <div className="input-box flex flex-col">
                      <label htmlFor={`menuItems[${index}].image2`}>Image 2</label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                        required
                      />
                    </div>
                  </div>
                ))}
                <div className="flex flex-col gap-4 ">
                  <button type="button" onClick={addMenuItem} className="bg-bg-white text-tradewind py-[.5rem] rounded-md text-lg border-[.14rem] border-solid border-tradewind">
                    Add More Items
                  </button>

                  <button type="submit" className="bg-tradewind py-[.5rem] rounded-md text-lg">
                    Add Restaurant
                  </button>
                </div>
              </form>
            ) : activeIndex === 1 ? (
              <div>
                {/* Display all restaurants */}
                {restaurants.length > 0 ? (
                  restaurants.map((restaurant) => (
                    <div key={restaurant._id} className="mb-4 p-4 border rounded shadow">
                      <h3 className="text-lg font-bold">{restaurant.name}</h3>
                      <p>{restaurant.location}</p>
                      <p>{restaurant.description}</p>
                      <div className="flex gap-4 mt-2">
                        {/* <button
                          onClick={() => handleEdit(restaurant._id)} // Replace with your edit logic
                          className="bg-blue-500 text-white py-1 px-3 rounded"
                        >
                          Edit
                        </button> */}
                        <button
                          onClick={() => handleDelete(restaurant._id)} // Replace with your delete logic
                          className="bg-red-500 text-white py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No restaurants available</p>
                )}
              </div>
            ) : (
              <div className="">
                <button className="bg-bg-white text-tradewind py-[.5rem] rounded-md text-lg border-[.14rem] border-solid border-tradewind px-[1rem] hover:bg-tradewind hover:text-bg-white hover:cursor-pointer" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AdminProfile.propTypes = {
  className: PropTypes.string,
};

// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { createRestaurant, getAllRestaurants, updateRestaurant, deleteRestaurant } from "../../services/restaurantApi"; // Ensure these functions exist
// import { adminLogout } from "../../services/userApi";
// import { clearAdmin } from "../../redux/features/adminSlice";
// import { useDispatch } from "react-redux";

// export const AdminProfile = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [restaurants, setRestaurants] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [menuItems, setMenuItems] = useState([{ name: '', price: '', category: '', image1: null, image2: null }]);
//   const [editingRestaurant, setEditingRestaurant] = useState(null);
//   const [updatedFields, setUpdatedFields] = useState({}); // Track updated fields

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm();

//   useEffect(() => {
//     if (activeIndex === 1) {
//       const fetchRestaurants = async () => {
//         try {
//           const data = await getAllRestaurants();
//           if (data && data.success) {
//             const sortedRestaurants = (data.restaurants || []).sort((a, b) => {
//               return new Date(b.createdAt) - new Date(a.createdAt);
//             });
//             setRestaurants(sortedRestaurants);
//           }
//         } catch (error) {
//           console.error("Error fetching restaurants:", error);
//         }
//       };
//       fetchRestaurants();
//     }
//   }, [activeIndex]);

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("location", data.location);

//     menuItems.forEach((item, index) => {
//       formData.append(`menuItems[${index}].name`, item.name);
//       formData.append(`menuItems[${index}].price`, item.price);
//       formData.append(`menuItems[${index}].category`, item.category);
//       formData.append(`menuItems[${index}].image1`, item.image1);
//       formData.append(`menuItems[${index}].image2`, item.image2);
//     });

//     try {
//       const response = await createRestaurant(formData);
//       if (response.success) {
//         toast.success('Restaurant created successfully');
//         navigate('/admin/profile');
//       } else {
//         toast.error('Failed to create restaurant');
//       }
//     } catch (error) {
//       toast.error('Error: Could not create restaurant');
//       console.error(error);
//     }
//   };

//   const onEditSubmit = async () => {
//     if (editingRestaurant) {
//       const formData = new FormData();
//       for (const key in updatedFields) {
//         formData.append(key, updatedFields[key]);
//       }
//       menuItems.forEach((item, index) => {
//         formData.append(`menuItems[${index}].name`, item.name);
//         formData.append(`menuItems[${index}].price`, item.price);
//         formData.append(`menuItems[${index}].category`, item.category);
//         formData.append(`menuItems[${index}].image1`, item.image1);
//         formData.append(`menuItems[${index}].image2`, item.image2);
//       });

//       try {
//         const response = await updateRestaurant(editingRestaurant._id, formData);
//         if (response.success) {
//           toast.success('Restaurant updated successfully');
//           setEditingRestaurant(null);
//           reset();
//           setUpdatedFields({});
//           setMenuItems([{ name: '', price: '', category: '', image1: null, image2: null }]);
//           navigate('/admin/profile');
//         } else {
//           toast.error('Failed to update restaurant');
//         }
//       } catch (error) {
//         toast.error('Error: Could not update restaurant');
//         console.error(error);
//       }
//     }
//   };

//   const addMenuItem = () => {
//     setMenuItems([...menuItems, { name: '', price: '', category: '', image1: null, image2: null }]);
//   };

//   const handleMenuItemChange = (index, field, value) => {
//     const updatedMenuItems = [...menuItems];
//     updatedMenuItems[index][field] = value;
//     setMenuItems(updatedMenuItems);
//   };

//   const handleFileChange = (index, file) => {
//     const updatedMenuItems = [...menuItems];
//     updatedMenuItems[index].image1 = file;
//     updatedMenuItems[index].image2 = file;
//     setMenuItems(updatedMenuItems);
//   };

//   const handleLogout = async () => {
//     const response = await adminLogout();
//     if (response?.success) {
//       toast.success('Logged out successfully!');
//       dispatch(clearAdmin());
//       navigate('/admin/login');
//     }
//   };

//   const handleEdit = (restaurant) => {
//     setEditingRestaurant(restaurant);
//     reset(restaurant);
//     setMenuItems(restaurant.menuItems || []);
//     setActiveIndex(0);
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this restaurant?");
//     if (confirmed) {
//       try {
//         const response = await deleteRestaurant(id);
//         if (response.success) {
//           toast.success("Restaurant deleted successfully");
//           setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
//         } else {
//           toast.error("Failed to delete restaurant");
//         }
//       } catch (error) {
//         console.error("Error deleting restaurant:", error);
//         toast.error("Error deleting restaurant");
//       }
//     }
//   };

//   const handleFieldChange = (field, value) => {
//     setValue(field, value);
//     setUpdatedFields((prevFields) => ({
//       ...prevFields,
//       [field]: value,
//     }));
//   };

//   return (
//     <div className="self-stretch flex flex-col bg-bg-white items-center justify-center py-0 px-5 pb-8 max-w-full text-left text-1.5rem text-dark">
//       <div className="h-full w-[70.5rem] flex flex-col items-start justify-start pt-0 px-0 pb-0 gap-8 max-w-full">
//         <div className="flex flex-col py-8 pl-2 pr-0 box-border shrink-0 max-w-full gap-5">
//           <b>Hi there!</b>
//         </div>
//         <div className="flex items-start justify-center gap-24">
//           <div className="flex gap-16 items-center">
//             <div className="w-88 border-r border-gray-300">
//               <ul className="space-y-8 list-none">
//                 {['Manage Restaurants', 'List all restaurants', 'Logout'].map((section, index) => (
//                   <li
//                     key={index}
//                     className={`cursor-pointer p-2 rounded-md ${activeIndex === index ? 'bg-tradewind text-bg-white' : 'hover:bg-gray-300'}`}
//                     onClick={() => setActiveIndex(index)}
//                   >
//                     {section}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="w-7/12 border border-selection-tint px-8 py-8 rounded-xl">
//             {activeIndex === 0 ? (
//               <form onSubmit={handleSubmit(editingRestaurant ? onEditSubmit : onSubmit)} encType="multipart/form-data">
//                 <div className="input-box flex flex-col">
//                   <label htmlFor="#">Name</label>
//                   <input
//                     type="text"
//                     value={editingRestaurant ? updatedFields.name || editingRestaurant.name : ''}
//                     onChange={(e) => handleFieldChange("name", e.target.value)}
//                     placeholder="Enter restaurant name*"
//                   />
//                 </div>
//                 <div className="input-box flex flex-col">
//                   <label htmlFor="#">Description</label>
//                   <input
//                     type="text"
//                     value={editingRestaurant ? updatedFields.description || editingRestaurant.description : ''}
//                     onChange={(e) => handleFieldChange("description", e.target.value)}
//                     placeholder="Enter description*"
//                   />
//                 </div>
//                 <div className="input-box flex flex-col">
//                   <label htmlFor="#">Location</label>
//                   <input
//                     type="text"
//                     value={editingRestaurant ? updatedFields.location || editingRestaurant.location : ''}
//                     onChange={(e) => handleFieldChange("location", e.target.value)}
//                     placeholder="Enter location*"
//                   />
//                 </div>

//                 <div className="text-1rem flex flex-col">
//                   <label className="font-bold" htmlFor="#">Food Items</label>
//                 </div>

//                 {menuItems.map((item, index) => (
//                   <div key={index} className="mb-4">
//                     <div className="input-box flex flex-col">
//                       <label htmlFor={`menuItems[${index}].name`}>Item Name</label>
//                       <input
//                         type="text"
//                         value={item.name}
//                         onChange={(e) => handleMenuItemChange(index, 'name', e.target.value)}
//                         placeholder="Enter item name"
//                       />
//                     </div>
//                     <div className="input-box flex flex-col">
//                       <label htmlFor={`menuItems[${index}].price`}>Price</label>
//                       <input
//                         type="text"
//                         value={item.price}
//                         onChange={(e) => handleMenuItemChange(index, 'price', e.target.value)}
//                         placeholder="Enter item price"
//                       />
//                     </div>
//                     <div className="input-box flex flex-col">
//                       <label htmlFor={`menuItems[${index}].category`}>Category</label>
//                       <input
//                         type="text"
//                         value={item.category}
//                         onChange={(e) => handleMenuItemChange(index, 'category', e.target.value)}
//                         placeholder="Enter item category"
//                       />
//                     </div>
//                     <div className="input-box flex flex-col">
//                       <label htmlFor={`menuItems[${index}].image1`}>Image 1</label>
//                       <input type="file" onChange={(e) => handleFileChange(index, e.target.files[0])} />
//                     </div>
//                     <div className="input-box flex flex-col">
//                       <label htmlFor={`menuItems[${index}].image2`}>Image 2</label>
//                       <input type="file" onChange={(e) => handleFileChange(index, e.target.files[0])} />
//                     </div>
//                   </div>
//                 ))}

//                 <button type="button" onClick={addMenuItem}>Add Menu Item</button>
//                 <button type="submit" className="bg-primary text-white py-2 px-4 rounded">{editingRestaurant ? 'Update Restaurant' : 'Create Restaurant'}</button>
//               </form>
//             ) : activeIndex === 1 ? (
//               <div>
//                 {restaurants.map((restaurant) => (
//                   <div key={restaurant._id} className="bg-bg-white p-4 rounded-md border">
//                     <p><strong>{restaurant.name}</strong></p>
//                     <p>{restaurant.description}</p>
//                     <p>{restaurant.location}</p>
//                     <button onClick={() => handleEdit(restaurant)} className="text-green-500">Edit</button>
//                     <button onClick={() => handleDelete(restaurant._id)} className="text-red-500 ml-4">Delete</button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>
//                 <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// AdminProfile.propTypes = {
//   editingRestaurant: PropTypes.object,
//   restaurants: PropTypes.array,
//   dispatch: PropTypes.func,
//   navigate: PropTypes.func,
//   handleSubmit: PropTypes.func,
// };

