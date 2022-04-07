import React, { useState, useEffect } from "react";
import AdminHeader from './../components/AdminHeader';
import Http from "./../Http";
import swal from "sweetalert";

const ViewReservation = () => {
    const api = "/api/v1/checkout";

    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    

    useEffect(() => {
        //Http.get(`${api}?status=open`)
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
                                "There was an error processing.",
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
                            "There was an error processing.",
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
                                        <th>Payment Method</th>
                                        <th>Payment Status</th>
                                        <th>Reservation Status</th>
                                        <th>Action</th>
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
                                                <td>{checkout.paymentMethod}</td>
                                                <td>{checkout.paymentStatus}</td>
                                                <td>{checkout.reservationStatus}</td>
                                                <td>
                                                    <span
                                                        type="button"
                                                        className="badge badge-danger"
                                                        onClick={
                                                            deleteReservation
                                                        }
                                                        data-key={checkout.id}
                                                    >
                                                        Delete
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                        ) : (
                                            <h3 style={{ margin: "auto" }}>
                                                No reservation is made yet!
                                            </h3>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="add-todos mb-5">
                            <h1 className="text-center mb-4">
                                Manage Reservations
                            </h1>
                            <form method="post">
                                <div className="form-group">
                                    <label htmlFor="reservationNo">
                                        Reservation No
                                    </label>
                                    <input
                                        id="reservationNo"
                                        type="reservationNo"
                                        name="reservationNo"
                                        className="form-control mr-3"
                                        value="R01"
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
                                        value="Successful"
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Reservation Status</label>
                                    <input
                                        id="paymentStatus"
                                        type="paymentStatus"
                                        name="paymentStatus"
                                        className="form-control mr-3"
                                        value="Pending"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block btn-outline-primary"
                                >
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewReservation;
