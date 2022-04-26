import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const HomeHeader = (props) => {
    return (
        <header
            className="d-flex align-items-center justify-content-between"
            style={{ background: "#35353f", height: "64px" }}
        >
            <h1 className="logo my-0 font-weight-normal h3">
                <Link
                    to="/"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        display: "inline",
                        fontWeight: "normal"
                    }}
                >
                    F_Truck
                </Link>
            </h1>
        </header>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(HomeHeader);
