// import React, { useState, useEffect } from "react";
// import styles from "./checkout.module.css";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";
// import DatePicker from "react-multi-date-picker";
// import StripeCheckout from "react-stripe-checkout";
// import Http from "../../../Http";
// import { useHistory } from "react-router-dom";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import Moment from "moment";
// import { setDate } from "date-fns";
// import { SettingsSystemDaydreamTwoTone } from "@material-ui/icons";

// const Checkout = ({ places, index }) => {
//     const [open, setOpen] = React.useState(false);
//     const theme = useTheme();
//     const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
//     const [slotObj, setSlotObj] = React.useState({});
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const session = JSON.parse(window.localStorage.getItem("user"));
//     const api = "/api/v1/checkout";
//     const slotApi = "/api/v1/slot";

//     let history = useHistory();
//     var startdate;
//     var enddate;

//     const handleClickOpen = (index, places) => {
//         setOpen(true);

//         setSlotObj(places[index]);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const difference_In_Days = (startDate, endDate) => {
//         if (endDate >= startDate) {
//             const diffInMs = Math.abs(startDate - endDate);
//             const days = Math.round(diffInMs / (1000 * 60 * 60 * 24));
//             startdate = startDate;
//             enddate = endDate;
//             return days;
//         } else {
//             return 0;
//         }
//     };

//     const total_rents = (price, days) => {
//         const totalCost = price * days;
//         return totalCost;
//     };

//     const onToken = (token) => {
//         var StartDate =
//             startdate.day +
//             "-" +
//             startdate.months[startdate.monthIndex].number +
//             "-" +
//             startdate.year;

//         var EndDate =
//             enddate.day +
//             "-" +
//             enddate.months[enddate.monthIndex].number +
//             "-" +
//             enddate.year;

//         console.log("End Date");
//         const checkout = {
//             user_id: session.id,
//             price: slotObj.price,
//             slotID: slotObj.slotID,
//             address: slotObj.address,
//             reservationStatus: "Pending",
//             paymentStatus: "Successful",
//             paymentMethod: token.type,
//             startDate: StartDate,
//             endDate: EndDate,
//         };

//         const slot = {
//             slotStatus: "Booked",
//         };
//         if (!isNaN(token.created)) {
//             Http.post(api, checkout)
//                 .then(({ data }) => {
//                     console.log(data);
//                     Http.patch(`${slotApi}/${data.checkoutObj.slotID}`, slot)
//                         .then((response) => {
//                             console.log(response);
//                             history.push("/success");
//                         })
//                         .catch(() => {
//                             console.log("failed to update");
//                         });
//                 })
//                 .catch(() => {
//                     console.log("failed to save data into database");
//                     history.push("/cancel");
//                 });
//         }
//     };
//     return (
//         <div>
//             <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => handleClickOpen(index, places)}
//                 disabled={
//                     places[index].slotStatus === "Available" ? false : true
//                 }
//             >
//                 Slot Reservation Here!
//             </Button>

//             <Dialog
//                 fullScreen={fullScreen}
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="responsive-dialog-title"
//             >
//                 <DialogTitle id="responsive-dialog-title">
//                     <h3 className={styles.h3}>
//                         {"Reserve slot for slot ID: "} {slotObj.slotID}
//                     </h3>
//                 </DialogTitle>

//                 <DialogContent>
//                     <DialogContentText>
//                         <section className={styles.section}>
//                             <div className={styles.product}>
//                                 <img
//                                     className={styles.img}
//                                     src={slotObj.slotImage}
//                                     alt="The cover of Stubborn Attachments"
//                                 />

//                                 <div className={styles.description}>
//                                     <h3 className={styles.h3}>
//                                         Please select the duration for the slot
//                                         rental below:
//                                     </h3>

//                                     <h3 className={styles.h3}>
//                                         Start Date:{" "}
//                                         <DatePicker
//                                             placeholderText="Select Start Date"
//                                             startDate={startDate}
//                                             onChange={setStartDate}
//                                             format={"DD / MM / YYYY"}
//                                             minDate={new Date()}
//                                         />
//                                     </h3>

//                                     <h3 className={styles.h3}>
//                                         End Date:{" "}
//                                         <DatePicker
//                                             placeholderText="Select End Date"
//                                             endDate={endDate}
//                                             onChange={setEndDate}
//                                             minDate={startDate}
//                                             format={"DD / MM / YYYY"}
//                                         />
//                                     </h3>

//                                     <h3 className={styles.h3}>
//                                         {"Price: "}
//                                         {slotObj.price} {" per day"}
//                                     </h3>
//                                     <h3 className={styles.h3}>
//                                         {"Address: "}
//                                         {slotObj.address}
//                                     </h3>
//                                     <h3 className={styles.h3}>
//                                         {"Status: "} {slotObj.slotStatus}
//                                     </h3>
//                                     <h3 className={styles.h3}>
//                                         {"Days: "}{" "}
//                                         {difference_In_Days(startDate, endDate)}
//                                     </h3>
//                                     <h3 className={styles.h3}>
//                                         {"Total Rents: RM "}{" "}
//                                         {total_rents(
//                                             slotObj.price,
//                                             difference_In_Days(
//                                                 startDate,
//                                                 endDate
//                                             )
//                                         )}
//                                     </h3>
//                                 </div>
//                             </div>
//                         </section>
//                     </DialogContentText>
//                 </DialogContent>

//                 <DialogActions>
//                     {total_rents(
//                         slotObj.price,
//                         difference_In_Days(startDate, endDate)
//                     ) *
//                         100 >
//                         0 && (
//                         <StripeCheckout
//                             token={onToken}
//                             stripeKey="pk_test_51KjCibLroMhKOKfoup1NmOhShBZdK3rPR3cVU2AwjAjmoogcqN0MAvXfhUk4gJJy4vjz8iEN4F331tCI8v1DeMQA00t418FV4i"
//                             name={"F_Truck Officials Sdn Bhd"}
//                             currency="MYR"
//                             amount={
//                                 total_rents(
//                                     slotObj.price,
//                                     difference_In_Days(startDate, endDate)
//                                 ) * 100
//                             }
//                             label={
//                                 "Checkout RM " +
//                                 total_rents(
//                                     slotObj.price,
//                                     difference_In_Days(startDate, endDate)
//                                 )
//                             }
//                         />
//                     )}

//                     <Button
//                         className={styles.button}
//                         onClick={handleClose}
//                         variant="contained"
//                         color="primary"
//                         autoFocus
//                     >
//                         cancel
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </div>
//     );
// };

// const stripePromise = loadStripe(
//     "pk_test_51KjCibLroMhKOKfoup1NmOhShBZdK3rPR3cVU2AwjAjmoogcqN0MAvXfhUk4gJJy4vjz8iEN4F331tCI8v1DeMQA00t418FV4i"
// );

// const Index = ({ places, index }) => {
//     return (
//         <Elements stripe={stripePromise}>
//             <Checkout places={places} index={index} />
//         </Elements>
//     );
// };

// export default Index;

import React, { useState, useEffect } from "react";
import styles from "./checkout.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DatePicker from "react-multi-date-picker";
import StripeCheckout from "react-stripe-checkout";
import Http from "../../../Http";
import { useHistory } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        margin: "auto",
        maxWidth: 1050,
    },
    image: {
        width: 500,
        height: 400,
    },
    img: {
        margin: "auto",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
}));

const Checkout = ({ places, index }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
    const [slotObj, setSlotObj] = React.useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const session = JSON.parse(window.localStorage.getItem("user"));
    const api = "/api/v1/checkout";
    const slotApi = "/api/v1/slot";

    let history = useHistory();
    var startdate;
    var enddate;

    const handleClickOpen = (index, places) => {
        setOpen(true);

        setSlotObj(places[index]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const difference_In_Days = (startDate, endDate) => {
        if (endDate >= startDate) {
            const diffInMs = Math.abs(startDate - endDate);
            const days = Math.round(diffInMs / (1000 * 60 * 60 * 24));
            startdate = startDate;
            enddate = endDate;
            return days;
        } else {
            return 0;
        }
    };

    const total_rents = (price, days) => {
        const totalCost = price * days;
        return totalCost;
    };

    const onToken = (token) => {
        var StartDate =
            startdate.day +
            "-" +
            startdate.months[startdate.monthIndex].number +
            "-" +
            startdate.year;

        var EndDate =
            enddate.day +
            "-" +
            enddate.months[enddate.monthIndex].number +
            "-" +
            enddate.year;

        const checkout = {
            user_id: session.id,
            price: slotObj.price,
            slotID: slotObj.slotID,
            address: slotObj.address,
            reservationStatus: "Pending",
            paymentStatus: "Successful",
            paymentMethod: token.type,
            startDate: StartDate,
            endDate: EndDate,
        };

        const slot = {
            slotStatus: "Booked",
        };
        if (!isNaN(token.created)) {
            Http.post(api, checkout)
                .then(({ data }) => {
                    console.log(data);
                    Http.patch(`${slotApi}/${data.checkoutObj.slotID}`, slot)
                        .then((response) => {
                            console.log(response);
                            history.push("/success");
                        })
                        .catch(() => {
                            console.log("failed to update");
                        });
                })
                .catch(() => {
                    console.log("failed to save data into database");
                    history.push("/cancel");
                });
        }
    };

    const classes = useStyles();
    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => handleClickOpen(index, places)}
                disabled={
                    places[index].slotStatus === "Available" ? false : true
                }
            >
                Slot Reservation Here!
            </Button>

            <div className={classes.root}>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        <Typography gutterBottom variant="h4">
                            Reserve Food Truck Slot for Slot ID:{" "}
                            {slotObj.slotID}
                        </Typography>
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img
                                                className={classes.img}
                                                alt="Food Truck Slot Image"
                                                src={slotObj.slotImage}
                                            />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid
                                            item
                                            direction="column"
                                            spacing={7}
                                        >
                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="overline"
                                                    style={{
                                                        textDecoration:
                                                            "underline",
                                                        fontWeight: "bolder",
                                                        fontSize: "18px",
                                                    }}
                                                >
                                                    Please pick the slot rental
                                                    duration:
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                xs
                                                container
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Grid item xs>
                                                    <Typography
                                                        gutterBottom
                                                        variant="overline"
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        Start Date:
                                                    </Typography>
                                                    <DatePicker
                                                        placeholderText="Select Start Date"
                                                        startDate={startDate}
                                                        onChange={setStartDate}
                                                        format={
                                                            "DD / MM / YYYY"
                                                        }
                                                        minDate={new Date()}
                                                    />
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography
                                                        gutterBottom
                                                        variant="overline"
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                                        End Date:
                                                    </Typography>
                                                    <DatePicker
                                                        placeholderText="Select End Date"
                                                        endDate={endDate}
                                                        onChange={setEndDate}
                                                        minDate={startDate}
                                                        format={
                                                            "DD / MM / YYYY"
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="overline"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Address: {slotObj.address}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="overline"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Status: {slotObj.slotStatus}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="overline"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Price: {slotObj.price} per
                                                    day
                                                </Typography>
                                            </Grid>

                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="overline"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Days:{" "}
                                                    {difference_In_Days(
                                                        startDate,
                                                        endDate
                                                    )}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs>
                                                <Typography
                                                    gutterBottom
                                                    variant="overline"
                                                    style={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    Total Amount of Rental:{" "}
                                                    {total_rents(
                                                        slotObj.price,
                                                        difference_In_Days(
                                                            startDate,
                                                            endDate
                                                        )
                                                    )}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        {total_rents(
                            slotObj.price,
                            difference_In_Days(startDate, endDate)
                        ) *
                            100 >
                            0 && (
                            <StripeCheckout
                                token={onToken}
                                stripeKey="pk_test_51KjCibLroMhKOKfoup1NmOhShBZdK3rPR3cVU2AwjAjmoogcqN0MAvXfhUk4gJJy4vjz8iEN4F331tCI8v1DeMQA00t418FV4i"
                                name={"F_Truck Officials Sdn Bhd"}
                                currency="MYR"
                                amount={
                                    total_rents(
                                        slotObj.price,
                                        difference_In_Days(startDate, endDate)
                                    ) * 100
                                }
                                label={
                                    "Checkout RM " +
                                    total_rents(
                                        slotObj.price,
                                        difference_In_Days(startDate, endDate)
                                    )
                                }
                            />
                        )}

                        <Button
                            className={styles.button}
                            onClick={handleClose}
                            variant="contained"
                            color="primary"
                            autoFocus
                        >
                            cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

const stripePromise = loadStripe(
    "pk_test_51KjCibLroMhKOKfoup1NmOhShBZdK3rPR3cVU2AwjAjmoogcqN0MAvXfhUk4gJJy4vjz8iEN4F331tCI8v1DeMQA00t418FV4i"
);

const Index = ({ places, index }) => {
    return (
        <Elements stripe={stripePromise}>
            <Checkout places={places} index={index} />
        </Elements>
    );
};

export default Index;
