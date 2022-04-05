import React from "react";
import OwnerHeader from "../../components/FoodTruckOwnerHeader";

const OwnerDashboard = () => {
    const session = JSON.parse(window.localStorage.getItem("user"));

    return (
        <div>
            <OwnerHeader />
            <section className="hero-section">
                <p>Welcome Back to F_Truck</p>
                <h1>Food Truck Owner</h1>
                <h1>License Number: {session.licenseNo} </h1>
            </section>
        </div>
    );
};

export default OwnerDashboard;
