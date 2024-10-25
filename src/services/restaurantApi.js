import { axiosInstance } from "../config/axioInstance";


export const createRestaurant = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/restaurant/create", // Use the relative path, since the base URL is likely defined in the axiosInstance
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      }
      
    );
    return response.data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return { success: false, error };
  }
};

export const getAllRestaurants = async () => {
    try {
      const response = await axiosInstance.get(
        "/restaurant/all-restaurants",
        {
            withCredentials: true
        }       
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return { success: false, message: "Failed to fetch restaurants" };
    }
};

export const updateRestaurant = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/restaurant/${id}`, data);

    return { success: true, ...response.data };
  } catch (error) {
    console.error('Error updating restaurant:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to update restaurant' };
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const response = await axiosInstance.delete(`/restaurant/${id}`);

    return { success: true, ...response.data };
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    return { success: false, message: error.response?.data?.message || 'Failed to delete restaurant' };
  }
};
