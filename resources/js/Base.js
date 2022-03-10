import React from "react";
import { connect } from "react-redux";
// import AdminHeader from "./components/AdminHeader";
import SuperAdminHeader from "./components/SuperAdminHeader";

const Base = ({ children }) => (
    <div>
        {/* <AdminHeader /> */}
        <main>{children}</main> :
    </div>
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Base);
