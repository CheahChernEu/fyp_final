import React from "react";
import Navbar from "../Navbar/navbar";
import phone from "../../../assets/phone-icon.png";
import mail from "../../../assets/mail-icon.png";

const contact = () => {
    const pStyle = {
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
    };
    const pStyle2 = {
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        textTransform: "lowercase"
    };
    const h1Style = {
        fontSize: "40px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 0 0 0",
    };
    const imgStyle = {
        width: "12vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
    };
    return (
        <>
            <Navbar />
            <section className="hero-section">
            <div>
                <h1 style={h1Style}>Contact Us</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={phone} style={imgStyle}></img>
                        <p style={pStyle}>+6017-5817812 (Eric)</p>
                        <p style={pStyle}>+6018-9456286 (Chern Eu)</p>
                    </div>
                    <div className="col">
                        <img src={mail} style={imgStyle}></img>
                        <p style={pStyle2}>waihoe1109@gmail.com</p>
                        <p style={pStyle2}>cherneu@gmail.com</p>
                    </div>
                </div>
            </div>
            </section>
        </>
    );
};

export default contact;
