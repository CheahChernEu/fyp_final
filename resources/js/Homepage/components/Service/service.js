import React from "react";
import Navbar from "../Navbar/navbar";
import admin from "../../../assets/administration-icon.png";
import booking from "../../../assets/food-truck-icon.png";

const service = () => {
    const imgStyle = {
        width: "16vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
    };
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
            <section className="hero-section">
                <div>
                    <h1 style={h1Style}>Our Services</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img src={admin} style={imgStyle}></img>
                            <p style={pStyle}>Administration System</p>
                        </div>
                        <div className="col">
                            <img src={booking} style={imgStyle}></img>
                            <p style={pStyle}>Food Truck Slot Reservation System</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default service;
