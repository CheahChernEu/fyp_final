import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import OwnerHeader from "../../components/FoodTruckOwnerHeader";

const OwnerDashboard = () => {
    const session = JSON.parse(window.localStorage.getItem("user"));

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
        },

        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <OwnerHeader />
            <CssBaseline />
            <main className={classes.content}>
                <section className="hero-section">
                    <p>Welcome Back to F_Truck</p>
                    <h1>Food Truck Owner</h1>
                    <h1>License Number: {session.licenseNo} </h1>
                </section>
            </main>
        </div>
    );
};

export default OwnerDashboard;
