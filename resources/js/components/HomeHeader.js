import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const HomeHeader = (props) => {

    return (
        <header className="d-flex align-items-center justify-content-between">
            <h1 className="logo my-0 font-weight-normal h4">
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
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
