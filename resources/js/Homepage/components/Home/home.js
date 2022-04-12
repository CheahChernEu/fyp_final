import React from "react";
import Navbar from "../Navbar/navbar";
import logo from "../../../assets/logo.png";
const home = () => {
    return (
        <>
            <Navbar />
            <section className="hero-section">
                <p>Welcome To</p>
                <img src={logo}></img>
                <p>Where happiness belongs</p>
            </section>
        </>
    );
};

export default home;
