import React, { useState, useEffect } from "react";
import AdminHeader from "./../components/AdminHeader";
import Http from "./../Http";
import swal from "sweetalert";

const ViewReservation = () => {
    const api = "/api/v1/checkout";
    const slotApi = "/api/v1/slot";
    const [slot, setSlot] = useState({});
    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);

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

    const rejectStatusUpdate = (checkout) => {
        const slotStatus = {
            slotStatus: "Available",
        };
        const reservationStatus = {
            reservationStatus: "Rejected",
        };
        swal({
            ID: "Are you sure?",
            text: "The reservation will be rejected and the slot will be available to public!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdateReject) => {
            if (willUpdateReject) {
                Http.get(`${api}/${checkout.slotID}`)
                    .then((response) => {
                        const { data } = response.data;
                        setSlot(data[0]);
                        console.log("data:");
                        console.log(data[0]);
                        Http.patch(`${api}/${data[0].slotID}`, reservationStatus)
                            .then((response) => {
                                console.log("reservation status");
                                console.log(response);
                                Http.patch(`${slotApi}/${data[0].slotID}`, slotStatus)
                                    .then((response) => {
                                        console.log("slot status");
                                        console.log(response);
                                        swal("Status Updated!", {
                                            icon: "success",
                                    })
                                    .catch(() => {
                                        setError(
                                            "Sorry, there was an error updating your reservation."
                                        );
                                    });
                            })
                            .catch(() => {
                                setError(
                                    "Sorry, there was an error updating your reservation."
                                );
                            });
                        })
                    })
                    .catch((err) => {
                        console.log("Failed to retrieve data");
                        console.log(err);
                        swal(
                            "Unable to Update!",
                            "There was an error processing.",
                            { icon: "warning" }
                        );
                    });
                
            }
        });
    };

    const approveStatusUpdate = (checkout) => {
        const slotStatus = {
            slotStatus: "Unavailable",
        };

        const reservationStatus = {
            reservationStatus: "Confirmed",
        };
        swal({
            ID: "Are you sure?",
            text: "The reservation will be approved and the slot will be not available to public!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdateApprove) => {
            if(willUpdateApprove){
                Http.get(`${api}/${checkout.slotID}`)
                    .then((response) => {
                        const { data } = response.data;
                        setSlot(data[0]);
                        console.log("data:");
                        console.log(data[0]);
                        Http.patch(`${api}/${data[0].slotID}`, reservationStatus)
                            .then((response) => {
                                console.log("reservation status");
                                console.log(response);
                                Http.patch(`${slotApi}/${data[0].slotID}`, slotStatus)
                                    .then((response) => {
                                        console.log("slot status");
                                        console.log(response);
                                        swal("Status Updated!", {
                                            icon: "success",
                                })
                                .catch(() => {
                                    setError(
                                        "Sorry, there was an error updating your reservation."
                                    );
                                });
                            })
                            .catch(() => {
                                setError(
                                    "Sorry, there was an error updating your reservation."
                                );
                            });
                        })
                    })
                    .catch((err) => {
                        console.log("Failed to retrieve data");
                        console.log(err);
                        swal(
                            "Unable to Update!",
                            "There was an error processing.",
                            { icon: "warning" }
                        );
                    });
            }
        });
    };

    // const deleteReservation = (e) => {
    //     const { key } = e.target.dataset;
    //     swal({
    //         slotID: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this reservation!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     }).then((willDelete) => {
    //         if (willDelete) {
    //             Http.delete(`${api}/${key}`)
    //                 .then((response) => {
    //                     console.log(key);
    //                     console.log(response);
    //                     if (response.status === 204) {
    //                         const updateState = dataState.filter(
    //                             (checkout) => checkout.id !== key
    //                         );
    //                         setError(false);
    //                         setData(updateState);
    //                         console.log("Reservation:", updateState);
    //                         swal("The reservation has been deleted!", {
    //                             icon: "success",
    //                         });
    //                     } else {
    //                         swal(
    //                             "Unable to Delete!",
    //                             "There was an error processing. 1",
    //                             { icon: "warning" }
    //                         );
    //                     }
    //                 })
    //                 .catch((errorResponse) => {
    //                     console.log(errorResponse);
    //                     console.log(errorResponse);
    //                     setError("There was an error processing.");
    //                     swal(
    //                         "Unable to Delete!",
    //                         "There was an error processing. 2",
    //                         { icon: "warning" }
    //                     );
    //                 });
    //         }
    //     });
    // };

    return (
        <>
            <AdminHeader />
            <div className="container py-5">
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
                                                className="badge badge-primary"
                                                onClick={() => {
                                                    approveStatusUpdate(
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
                                                className="badge badge-secondary"
                                                onClick={() => {
                                                    rejectStatusUpdate(
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
        </>
    );
};

export default ViewReservation;
