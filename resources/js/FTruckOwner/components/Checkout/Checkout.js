import React, { useState } from "react";
import styles from "./checkout.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DatePicker from "react-multi-date-picker";
import StripeCheckout from "react-stripe-checkout";
import Http from "../../../Http";
import { useHistory } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Moment from "moment";

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
        const checkout = {
            user_id: session.id,
            price: slotObj.price,
            slotID: slotObj.slotID,
            address: slotObj.address,
            reservationStatus: "Pending",
            paymentStatus: "Successful",
            paymentMethod: token.type,
            startDate: Moment(startDate).format("DD-MM-YYYY"),
            endDate: Moment(endDate).format("DD-MM-YYYY"),
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

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    <h3 className={styles.h3}>
                        {"Reserve slot for slot ID: "} {slotObj.slotID}
                    </h3>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <section className={styles.section}>
                            <div className={styles.product}>
                                <img
                                    className={styles.img}
                                    src={slotObj.slotImage}
                                    alt="The cover of Stubborn Attachments"
                                />

                                <div className={styles.description}>
                                    <h3 className={styles.h3}>
                                        Please select the duration for the slot
                                        rental below:
                                    </h3>

                                    <h3 className={styles.h3}>
                                        Start Date:{" "}
                                        <DatePicker
                                            placeholderText="Select Start Date"
                                            startDate={startDate}
                                            onChange={setStartDate}
                                            format={"DD / MM / YYYY"}
                                            minDate={new Date()}
                                        />
                                    </h3>

                                    <h3 className={styles.h3}>
                                        End Date:{" "}
                                        <DatePicker
                                            placeholderText="Select End Date"
                                            endDate={endDate}
                                            onChange={setEndDate}
                                            minDate={startDate}
                                            format={"DD / MM / YYYY"}
                                        />
                                    </h3>

                                    <h3 className={styles.h3}>
                                        {"Price: "}
                                        {slotObj.price} {" per day"}
                                    </h3>
                                    <h3 className={styles.h3}>
                                        {"Address: "}
                                        {slotObj.address}
                                    </h3>
                                    <h3 className={styles.h3}>
                                        {"Status: "} {slotObj.slotStatus}
                                    </h3>
                                    <h3 className={styles.h3}>
                                        {"Days: "}{" "}
                                        {difference_In_Days(startDate, endDate)}
                                    </h3>
                                    <h3 className={styles.h3}>
                                        {"Total Rents: RM "}{" "}
                                        {total_rents(
                                            slotObj.price,
                                            difference_In_Days(
                                                startDate,
                                                endDate
                                            )
                                        )}
                                    </h3>
                                </div>
                            </div>
                        </section>
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
                            name={
                                "Reserve Food Truck Slot ID " + slotObj.slotID
                            }
                            currency="MYR"
                            amount={
                                total_rents(
                                    slotObj.price,
                                    difference_In_Days(startDate, endDate)
                                ) * 100
                            }
                            label={
                                "Pay RM " +
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
