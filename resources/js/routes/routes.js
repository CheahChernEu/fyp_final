import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import NoMatch from "../pages/NoMatch";
import AdminDashboard from "../pages/AdminDashboard";
import AddSlot from "../pages/AddSlot";
import ViewReservation from "../pages/ViewReservation";
import Homepage from "../Homepage/Homepage";
import Add_Staff from "../pages/AddStaff";
//Owner
import OwnerDashboard from "../FTruckOwner/components/OwnerDashboard";
import ReservationStatus from "../FTruckOwner/components/Reservation";
import ViewFoodTruckSlot from "../FTruckOwner/components/ViewFoodTruckSlot";
import Checkout from "../FTruckOwner/components/Checkout/Checkout";
import Success from "../FTruckOwner/components/Checkout/Success";
import Cancel from "../FTruckOwner/components/Checkout/Cancel";

const routes = [
    {
        path: "/",
        exact: true,
        auth: false,
        component: Homepage,
    },
    {
        path: "/about",
        exact: true,
        auth: false,
        component: Homepage,
    },
    {
        path: "/service",
        exact: true,
        auth: false,
        component: Homepage,
    },
    {
        path: "/contact",
        exact: true,
        auth: false,
        component: Homepage,
    },
    {
        path: "/home",
        exact: true,
        auth: false,
        component: Home,
    },
    {
        path: "/owner",
        exact: true,
        auth: true,
        component: OwnerDashboard,
    },
    {
        path: "/admin",
        exact: true,
        auth: true,
        component: AdminDashboard,
    },
    {
        path: "/viewFoodTruckSlot",
        exact: true,
        auth: true,
        component: ViewFoodTruckSlot,
    },
    {
        path: "/reservationStatus",
        exact: true,
        auth: true,
        component: ReservationStatus,
    },
    {
        path: "/addStaff",
        exact: true,
        auth: true,
        component: Add_Staff,
    },
    {
        path: "/add-slot",
        exact: true,
        auth: true,
        component: AddSlot,
    },
    {
        path: "/reservationDetails",
        exact: true,
        auth: true,
        component: Checkout,
    },

    {
        path: "/view-reservation",
        exact: true,
        auth: true,
        component: ViewReservation,
    },
    {
        path: "/success",
        exact: true,
        auth: true,
        component: Success,
    },
    {
        path: "/cancel",
        exact: true,
        auth: true,
        component: Cancel,
    },

    {
        path: "/login",
        exact: true,
        auth: false,
        component: Login,
    },
    {
        path: "/register",
        exact: true,
        auth: false,
        component: Register,
    },
    {
        path: "/forgot-password",
        exact: true,
        auth: false,
        component: ForgotPassword,
    },
    {
        path: "/reset-password",
        exact: true,
        auth: false,
        component: ResetPassword,
    },
    {
        path: "",
        exact: false,
        auth: false,
        component: NoMatch,
    },
];

export default routes;
