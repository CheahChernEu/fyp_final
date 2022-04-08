import React, { useState, useEffect } from "react";
import AdminHeader from "./../components/AdminHeader";
import Http from "./../Http";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

const ViewReservation = () => {
    const api = "/api/v1/checkout";
    const slotApi = "/api/v1/slot";
    const [slot, setSlot] = useState({});
    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    const { handleSubmit, errors } = useForm();
    const [stateForm, setStateForm] = useState({
        slotID: "",
        paymentStatus: "",
        reservationStatus: "",
        slotStatus: "",
    });

    useEffect(() => {
        Http.get(api)
            .then((response) => {
                const { data } = response.data;
                console.log(data);
                setData(data);
                setError(false);
            })
            .catch((err) => {
                setError("Unable to fetch data.");
            });
    }, []);

    const statusUpdate = (checkout) => {
        const slotStatus = {
            slotStatus: "Available",
        };

        const reservationStatus = {
            reservationStatus: "Rejected",
        };

        Http.get(`${api}/${checkout.slotID}`)
            .then((response) => {
                const { data } = response.data;
                setSlot(data[0]);

                Http.patch(`${api}/${data[0].slotID}`, reservationStatus)
                    .then((response) => {
                        console.log("reservation status");
                        console.log(response);
                    })
                    .catch(() => {
                        setError(
                            "Sorry, there was an error saving your food truck slot."
                        );
                    });

                Http.patch(`${slotApi}/${data[0].slotID}`, slotStatus)
                    .then((response) => {
                        console.log("SlotStatus");
                        console.log(response);
                    })
                    .catch(() => {
                        setError(
                            "Sorry, there was an error saving your food truck slot."
                        );
                    });
            })
            .catch((err) => {
                console.log("Failed to retrieve data");
            });
    };

    const updateStatus = (checkout) => {
        const slotStatus = {
            slotStatus: "Unavailable",
        };

        const reservationStatus = {
            reservationStatus: "Comfirmed",
        };

        Http.get(`${api}/${checkout.slotID}`)
            .then((response) => {
                const { data } = response.data;
                setSlot(data[0]);
                console.log("data");
                console.log(data[0]);
                Http.patch(`${api}/${data[0].slotID}`, reservationStatus)
                    .then((response) => {
                        console.log("reservation status");
                        console.log(response);
                    })
                    .catch(() => {
                        setError(
                            "Sorry, there was an error saving your food truck slot."
                        );
                    });

                Http.patch(`${slotApi}/${data[0].slotID}`, slotStatus)
                    .then((response) => {
                        console.log("SlotStatus");
                        console.log(response);
                    })
                    .catch(() => {
                        setError(
                            "Sorry, there was an error saving your food truck slot."
                        );
                    });
            })
            .catch((err) => {
                console.log("Failed to retrieve data");
            });
    };

    const deleteReservation = (e) => {
        const { key } = e.target.dataset;
        swal({
            slotID: "Are you sure?",
            text: "Once deleted, you will not be able to recover this reservation!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                Http.delete(`${api}/${key}`)
                    .then((response) => {
                        console.log(key);
                        console.log(response);
                        if (response.status === 204) {
                            const updateState = dataState.filter(
                                (checkout) => checkout.id !== key
                            );
                            setError(false);
                            setData(updateState);
                            console.log("Reservation:", updateState);
                            swal("The reservation has been deleted!", {
                                icon: "success",
                            });
                        } else {
                            swal(
                                "Unable to Delete!",
                                "There was an error processing. 1",
                                { icon: "warning" }
                            );
                        }
                    })
                    .catch((errorResponse) => {
                        console.log(errorResponse);
                        console.log(errorResponse);
                        setError("There was an error processing.");
                        swal(
                            "Unable to Delete!",
                            "There was an error processing. 2",
                            { icon: "warning" }
                        );
                    });
            }
        });
    };

    return (
        <>
            <AdminHeader />
            <div className="container py-5">
                <div className="col">
                    <div className="row">
                        <div className="todos">
                            <h1 className="text-center mb-4">
                                List of Reservations
                            </h1>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <th>Slot No</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Payment Status</th>
                                        <th>Reservation Status</th>
                                        <th>Approve</th>
                                        <th>Reject</th>
                                    </tr>
                                    {dataState.length > 0 ? (
                                        dataState.map((checkout) => (
                                            <tr key={checkout.id}>
                                                <td>{checkout.slotID}</td>
                                                <td>
                                                    {checkout.address
                                                        .slice(0, 30)
                                                        .concat("...")}
                                                </td>
                                                <td>{checkout.price}</td>
                                                <td>{checkout.startDate}</td>
                                                <td>{checkout.endDate}</td>
                                                <td>
                                                    {checkout.paymentStatus}
                                                </td>
                                                <td>
                                                    {checkout.reservationStatus}
                                                </td>

                                                <td>
                                                    <span
                                                        type="button"
                                                        className="badge badge-dark"
                                                        onClick={() => {
                                                            updateStatus(
                                                                checkout
                                                            );
                                                        }}
                                                    >
                                                        Approve
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        type="button"
                                                        className="badge badge-dark"
                                                        onClick={() => {
                                                            statusUpdate(
                                                                checkout
                                                            );
                                                        }}
                                                    >
                                                        Reject
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <h3 style={{ margin: "auto" }}>
                                            No reservation is made yet!
                                        </h3>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
<<<<<<< HEAD
=======
                    <div className="row">
                        <div className="add-todos mb-5">
                            <h1 className="text-center mb-4">
                                Manage Reservations
                            </h1>
                            <form 
                                method="post"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="form-group">
                                    <label htmlFor="slotNo">
                                        Slot No
                                    </label>
                                    <input
                                        id="slotNo"
                                        type="slotNo"
                                        name="slotNo"
                                        className="form-control mr-3"
                                        value={dataState.slotID}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Payment Status</label>
                                    <input
                                        id="paymentStatus"
                                        type="paymentStatus"
                                        name="paymentStatus"
                                        className="form-control mr-3"
                                        value={dataState.paymentStatus}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Reservation Status</label>
                                    <input
                                        id="reservationStatus"
                                        type="reservationStatus"
                                        name="reservationStatus"
                                        className="form-control mr-3"
                                        value={dataState.reservationStatus}
                                    />
                                </div>
                                {/*<div className="form-group">
                                    <label htmlFor="">Slot Status</label>
                                    <input
                                        id="slotStatus"
                                        type="slotStatus"
                                        name="slotStatus"
                                        className="form-control mr-3"
                                        value={stateForm.slotStatus}
                                    />
                                </div>*/}
                                <button
                                    type="submit"
                                    className="btn btn-block btn-outline-primary"
                                    style={{
                                        height: "36px",
                                        background: "#556cd6",
                                        color: "white",
                                        width: "100%",
                                        fontsize: "14px",
                                        border: "0",
                                        fontweight: "500",
                                        cursor: "pointer"
                                    }}
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
>>>>>>> 83886dd0bdc927e6ce6635fc0fd61d31e0d7b36a
                </div>
            </div>
        </>
    );
};

export default ViewReservation;
