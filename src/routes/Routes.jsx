import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/user/HomePage";
import { CheckoutPage } from "../pages/user/CheckoutPage";
import { UserLayout } from "../layouts/userLayout";
import { PublicLandingPage } from "../pages/publicUsers/PublicLandingPage";
import { AllRestaurants } from "../pages/user/restaurants/AllRestaurants";
import { RestaurantPage } from "../pages/user/restaurants/RestaurantPage";
import { UserAuth } from "./protectedRoutes/UserAuth";
import { HelpPage } from "../pages/publicUsers/HelpPage";
import { ProfilePage } from "../pages/user/ProfilePage";
import { ReduxTest } from "../components/user/restaurant/restaurantMain/reduxTest";
import { AdminProfile } from "../pages/admin/AdminProfile";
import { ManageRestaurant } from "../pages/admin/ManageRestaurant";
import { AdminPreLoginLayout } from "../layouts/AdminPreLoginLayout";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminPostLoginLayout } from "../layouts/AdminPostLoginLayout";
import { AdminAuth } from "./protectedRoutes/AdminAuth";

export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    children: [
      {
        path: '/',
        element: <PublicLandingPage />
      },
      {
        path: 'help',
        element: <HelpPage />
      },
      {
        path: "user",
        element: <UserAuth/>,
        children: [
          {
            path: "",
            element: <HomePage />
          },
          {
            path: "restaurants",
            element: <AllRestaurants />
          },
          {
            path: 'restaurant/:id',
            element: <RestaurantPage />
          },
          {
            path: "profile",
            element: <ProfilePage />
          },
          {
            path: "restaurant/:id/checkout",
            element: <CheckoutPage />
          },
          {
            path: "checkout/success",
            element: <h1>Payment Success</h1>
          },
          {
            path: "checkout/cancel",
            element: <h1>Payment Cancelled</h1>
          },
          {
            path: "test",
            element: <ReduxTest />
          },
        ],
      },
    ],
  },

  {
    path: "admin",
    element: (
      <AdminPostLoginLayout />
    ),
    children: [
      {
        path: "login",
        element: <AdminLoginPage />
      },
      {
        path: "",
        element: <AdminAuth/>,
        children: [
          {
            path: "profile",
            element: <AdminProfile />
          },
          {
            path: "restaurants",
            element: <AllRestaurants />
          },
          {
            path: 'restaurant/:id',
            element: <RestaurantPage />
          },
          {
            path: "profile",
            element: <AdminProfile />
          },
          {
            path: "create-restaurant",
            element: <ManageRestaurant />
          }
        ]
      }
    ]
  },
  // {
  //   path: "admin",
  //   element: <AdminPostLoginLayout />,
  //   children: [
      
  //   ]
  // }
])