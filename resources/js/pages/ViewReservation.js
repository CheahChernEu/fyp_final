import React from "react";
import AdminHeader from './../components/AdminHeader';
export default function ViewReservation() {
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
                                        <th>Reservation No</th>
                                        <th>Payment Status</th>
                                        <th>Reservation Date</th>
                                        <th>Reservation Duration (months)</th>
                                        <th>Reservation Status</th>
                                        <th>License No</th>
                                        <th>Email</th>
                                        <th>Slot No</th>
                                        <th>Action</th>
                                    </tr>
                                    <tr>
                                        <td>R01</td>
                                        <td>Successful</td>
                                        <td>22/11/2022</td>
                                        <td>2</td>
                                        <td>Pending</td>
                                        <td>4125718</td>
                                        <td>waihoe1109@gmail.com</td>
                                        <td>B01</td>
                                        <td>
                                            <span
                                                type="button"
                                                className="badge badge-dark"
                                            >
                                                Edit
                                            </span>
                                            <span></span>
                                            <span
                                                type="button"
                                                className="badge badge-danger"
                                            >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
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
