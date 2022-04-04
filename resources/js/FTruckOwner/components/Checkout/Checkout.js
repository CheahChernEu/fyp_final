import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { DateRangePicker } from "rsuite";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

import styled from "styled-components";

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

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const Checkout = ({ success, places, index }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
    const [slotObj, setSlotObj] = React.useState({});

    const handleClickOpen = (index, places) => {
        setOpen(true);

        setSlotObj(places[index]);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const difference_In_Days = (startDate, endDate) => {
        const diffInMs = Math.abs(startDate - endDate);
        const days = Math.round(diffInMs / (1000 * 60 * 60 * 24));
        return days;
    };

    const total_rents = (price, days) => {
        const totalCost = price * days;

        return totalCost;
    };

    const handleSubmit = async (event) => {
        // event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        console.log("Hey");
        console.log(error);
        console.log(paymentMethod);

        // if (error) {
        //     const { id } = paymentMethod;

        //     try {
        //         await axios
        //             .post("/sendPayment", {
        //                 id,
        //                 price: slotObj.price,
        //                 slotID: slotObj.slotID,
        //                 address: slotObj.address,
        //                 slotStatus: slotObj.slotStatus,
        //                 paymentStatus: success,
        //             })
        //             .then(function (response) {
        //                 console.log(response);
        //             });
        //         console.log("testing");

        //         success();
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalRents, setTotalRents] = useState(0);
    const [diffDays, setDiffDays] = useState(0);

    const onToken = (token) => {
        console.log(token);
    };
    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => handleClickOpen(index, places)}
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
                    <StripeCheckout
                        token={onToken}
                        stripeKey="pk_test_51KjCibLroMhKOKfoup1NmOhShBZdK3rPR3cVU2AwjAjmoogcqN0MAvXfhUk4gJJy4vjz8iEN4F331tCI8v1DeMQA00t418FV4i"
                        name={slotObj.slotID}
                        currency="MYR"
                        amount={totalRents * 100}
                    />
                    <Button
                        className={styles.button}
                        onClick={handleClose}
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
    const [status, setStatus] = React.useState("ready");

    if (status === "success") {
        return <div>Congrats on your empanadas!</div>;
    }

    return (
        <Elements stripe={stripePromise}>
            <Checkout
                success={() => {
                    setStatus("success");
                }}
                places={places}
                index={index}
            />
        </Elements>
    );
};

export default Index;

// import React, { useState } from "react";
// import {
//     useStripe,
//     useElements,
//     PaymentElement,
// } from "@stripe/react-stripe-js";

// const CheckoutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const [errorMessage, setErrorMessage] = useState(null);

//     const handleSubmit = async (event) => {
//         // We don't want to let default form submission happen here,
//         // which would refresh the page.
//         event.preventDefault();

//         if (!stripe || !elements) {
//             // Stripe.js has not yet loaded.
//             // Make sure to disable form submission until Stripe.js has loaded.
//             return;
//         }

//         const { error } = await stripe.confirmPayment({
//             //`Elements` instance that was used to create the Payment Element
//             elements,
//             confirmParams: {
//                 return_url: "https://example.com/order/123/complete",
//             },
//         });

//         if (error) {
//             // This point will only be reached if there is an immediate error when
//             // confirming the payment. Show error to your customer (for example, payment
//             // details incomplete)
//             setErrorMessage(error.message);
//         } else {
//             // Your customer will be redirected to your `return_url`. For some payment
//             // methods like iDEAL, your customer will be redirected to an intermediate
//             // site first to authorize the payment, then redirected to the `return_url`.
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <PaymentElement />
//             <button disabled={!stripe}>Submit</button>
//             {/* Show error message to your customers */}
//             {errorMessage && <div>{errorMessage}</div>}
//         </form>
//     );
// };

// export default CheckoutForm;
