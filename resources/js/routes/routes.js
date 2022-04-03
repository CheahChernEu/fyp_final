import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Archive from "../pages/Archive";
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
import paymentPage from "../FTruckOwner/components/PaymentPage/PaymentPage";
const routes = [
    {
        path: "/",
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
        path: "/payment",
        exact: true,
        auth: true,
        component: paymentPage,
    },

    {
        path: "/view-reservation",
        exact: true,
        auth: true,
        component: ViewReservation,
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
        path: "/archive",
        exact: true,
        auth: true,
        component: Archive,
    },
    {
        path: "",
        exact: false,
        auth: false,
        component: NoMatch,
    },
];

export default routes;
