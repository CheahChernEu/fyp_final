import React from "react";
import OwnerHeader from "../../../components/FoodTruckOwnerHeader";

const Cancel = () => {
    return (
        <div>
            <OwnerHeader />
            <section className="hero-section">
                <p>Cancelled Payment </p>
                <a href="/owner">
                    <button type="button" className="btn btn-primary">
                        Back to dashboard
                    </button>
                </a>
            </section>
        </div>
    );
};

export default Cancel;
