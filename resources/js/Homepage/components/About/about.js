import React from "react";
import Navbar from "../Navbar/navbar";

const about = () => {
    const pStyle = {
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
    };

    const h1Style = {
        fontSize: "40px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 0 0 0",
    };

    return (
        <>
            <Navbar />
            <section className="container hero-section">
                <div>
                    <h1 style={h1Style}>About Us</h1>
                    <p
                    style={pStyle}>
                        F_Truck is a food truck slot rental provider as it enables valid food truck owners to book their food truck slots easily
                    </p>
                </div>
                <div>
                    <h1 style={h1Style}>Vision</h1>
                    <p
                    style={pStyle}>
                        To be one of the leading food truck slot renting service platform in the Malaysia's food truck industry.
                    </p>
                </div>
                <div>
                    <h1 style={h1Style}>Mission</h1>
                    <p
                    style={pStyle}>
                        To fully satisfy the food truck owners' need to ensure much easier and convenient way to rent a food truck venue slots instead of constantly walk-in to DBKL for the application of venue slots permits.
                    </p>
                </div>
            </section>
        </>
    );
};

export default about;
