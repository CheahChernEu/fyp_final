import React, { useState, useEffect } from "react";
import AdminHeader from './../components/AdminHeader';
import Http from "./../Http";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

const ViewReservation = () => {
    const api = "/api/v1/checkout";
    const slotApi = "/api/v1/slot";

    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    const { handleSubmit, errors } = useForm();
    const [stateForm, setStateForm] = useState({
        slotID: "",
        address: "",
        startDate: "",
        endDate: "",
        paymentStatus: "",
        reservationStatus: "",
    });
    

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateForm({
            ...stateForm,
            [name]: value,
        });
    };

    const onSubmit = () => {
        updateReservation(stateForm);
    };

    const updateReservation = (checkout) => {
        Http.patch(`${api}/${checkout}`, checkout)
            .then((response) => {
                console.log(response);
                let filterSlots = dataState.filter(
                    (chk) => chk.id !== checkout.slotID
                );
                filterSlots = [checkout, ...filterSlots];
                setData(filterSlots);
                setStateForm({
                    reservationStatus: "",
                });
                setError(false);
            })
            .catch(() => {
                setError(
                    "Sorry, there was an error saving your food truck slot."
                );
            });
    }

    const editReservation = (checkout) => {
        const { id } = checkout;
        let form = dataState.filter((chk) => chk.id === id);
        console.log(id, form);
        setStateForm(form[0]);
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
                                        <th>Edit</th>
                                        <th>Delete</th>
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
                                                <td>{checkout.paymentStatus}</td>
                                                <td>{checkout.reservationStatus}</td>
                                                <td>
                                                    <span
                                                        type="button"
                                                        className="badge badge-dark"
                                                        onClick={
                                                            checkout.slotID =! null ?
                                                                editReservation
                                                                : (checkout) =>
                                                                      console.log(
                                                                          "error"
                                                                      )
                                                        }
                                                        data-key={checkout.id}
                                                    >
                                                        Edit
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        type="button"
                                                        className="badge badge-danger"
                                                        onClick={
                                                            checkout.slotID =! null ?
                                                                deleteReservation
                                                                : () =>
                                                                      console.log(
                                                                          "error"
                                                                      )
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
                </div>
            </div>
        </>
    );
}

export default ViewReservation;
