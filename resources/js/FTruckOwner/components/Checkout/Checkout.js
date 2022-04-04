import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import "../Checkout/index.css";
import { DateRangePicker } from "rsuite";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DatePicker from "react-multi-date-picker";

const Checkout = ({ places, index }) => {
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

    // const difference_In_Days = (startDate, endDate) => {
    //     const Difference_In_Time = startDate.getTime() - endDate.getTime();

    //     return Difference_In_Time / (1000 * 3600 * 24);
    // };

    const total_rents = (price, days) => {
        const totalCost = price * days;
        return totalCost;
    };

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [totalRents, setTotalRents] = useState(0);
    const [diffDays, setDiffDays] = useState(0);

    const session = JSON.parse(window.localStorage.getItem("user"));
    const { userSession } = session;

    const onToken = (token) => {
        // if(!isNaN(token.created)){
        //         await axios
        //     .post("/sendPayment", {
        //         id,
        //         price: slotObj.price,
        //         slotID: slotObj.slotID,
        //         address: slotObj.address,
        //         slotStatus: slotObj.slotStatus,
        //         paymentStatus: success,
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //     });

        // } else {

        // }

        console.log(token);
        console.log(token.email);
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
                    {"Reserve slot for "} {slotObj.slotID}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <section>
                            <div className="product">
                                <img
                                    src={slotObj.slotImage}
                                    alt="The cover of Stubborn Attachments"
                                />

                                <div className="description">
                                    <h3>
                                        Please select the duration for the slot
                                        rental below:
                                    </h3>

                                    <h3>
                                        Start Date:{" "}
                                        <DatePicker
                                            placeholderText="Select Start Date"
                                            startDate={startDate}
                                            onChange={setStartDate}
                                            format={"DD / MM / YYYY"}
                                            minDate={new Date()}
                                        />
                                    </h3>

                                    <h3>
                                        End Date:{" "}
                                        <DatePicker
                                            placeholderText="Select End Date"
                                            endDate={endDate}
                                            onChange={setEndDate}
                                            minDate={startDate}
                                            format={"DD / MM / YYYY"}
                                        />
                                    </h3>

                                    <h3>
                                        {"Price: "}
                                        {slotObj.price} {" per day"}
                                    </h3>
                                    <h3>
                                        {"Address: "}
                                        {slotObj.address}
                                    </h3>
                                    <h3>
                                        {"Status: "} {slotObj.slotStatus}
                                    </h3>
                                    <h3>
                                        {"Days: "}{" "}
                                        {difference_In_Days(startDate, endDate)}
                                    </h3>
                                    <h3>
                                        {"Total Rents: "}{" "}
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
                                ) *
                                    100
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

// const stripePromise = loadStripe(
//     "pk_test_51KjCibLroMhKOKfoup1NmOhShBZdK3rPR3cVU2AwjAjmoogcqN0MAvXfhUk4gJJy4vjz8iEN4F331tCI8v1DeMQA00t418FV4i"
// );

const Index = ({ places, index }) => {
    const [status, setStatus] = React.useState("ready");

    if (status === "success") {
        return <div>Congrats on your empanadas!</div>;
    }

    return (
        // <Elements stripe={stripePromise}>
        <Checkout
            success={() => {
                setStatus("success");
            }}
            places={places}
            index={index}
        />
        // </Elements>
    );
};

export default Index;
