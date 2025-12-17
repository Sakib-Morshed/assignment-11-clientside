import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";

import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";

import MainLayout from "../layouts/MainLayout";

import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import Meals from "../pages/Meals/Meals";
import Login from "../pages/Login/Login";
import AddMeal from "../pages/Dashboard/Seller/AddMeal";
import MealDetails from "../pages/MealDetails/MealDetails";
import MyReviews from "../pages/Dashboard/Customer/MyReviews";
import Favorites from "../pages/Dashboard/Customer/Favorites";
import Order from "../pages/Order/Order";

import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ManageRequests from "../pages/Dashboard/Admin/ManageRequests";
import axios from "axios";
import PaymentSuccess from "../pages/PaymentPage/PaymentSuccess";
import MyMeals from "../pages/Dashboard/Seller/MyMeals";
import UpdateMeal from "../pages/Dashboard/Seller/UpdateMeal";
import Statistics from "../pages/Dashboard/Admin/Statistics";
import Welcome from "../pages/Dashboard/Common/Welcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meal/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/meals",
        Component: Meals,
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/order/${params.id}`
          );
          return res.data;
        },
      },
      {
        path: "/paymentSuccess/:id",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login></Login> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        ),
      },
      {
        path: "adminStats",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <PrivateRoute>
            <AddMeal />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <ManageRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },

      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <ManageOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "myMeals",
        element: (
          <PrivateRoute>
            <MyMeals />
          </PrivateRoute>
        ),
      },
      {
        path: "updateMeal/:id",
        element: (
          <PrivateRoute>
            <UpdateMeal />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const axiosPublic = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
          });
          const res = await axiosPublic.get(`/meals/${params.id}`);
          return res.data;
        },
      },
    ],
  },
]);
