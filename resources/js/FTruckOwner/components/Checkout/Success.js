import React from "react";
import OwnerHeader from "../../../components/FoodTruckOwnerHeader";

const Success = () => {
    return (
        <div>
            <OwnerHeader />
            <section className="hero-section">
                <p>Successful Payment </p>
                <a href="/owner">
                    <button type="button" className="btn btn-primary">
                        Back to dashboard
                    </button>
                </a>
            </section>
        </div>
    );
};

export default Success;
