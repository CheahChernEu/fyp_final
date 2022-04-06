import React, { useState, useEffect } from "react";
import OwnerHeader from "../../components/FoodTruckOwnerHeader";
import Http from "../../Http";

const Reservation = () => {
    const api = "/api/v1/checkout";

    const [dataState, setData] = useState([]);

    const session = JSON.parse(window.localStorage.getItem("user"));

    useEffect(() => {
        Http.get(`${api}/${session.id}`)
            .then((response) => {
                const { data } = response.data;
                console.log(data);
                setData(data);
            })
            .catch((err) => {
                console.log("Failed to retrieve data");
            });
    }, []);

    return (
        <>
            <OwnerHeader />
            <div className="col">
                <div className="todos">
                    <h1 className="text-center mb-4">
                        List of Reservation Details
                    </h1>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th>Slot ID</th>
                                <th>Address</th>
                                <th>Price (in RM)</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Reservation Status</th>
                                <th>Payment Status</th>
                            </tr>

                            {dataState.length > 0 ? (
                                dataState.map((slot) => (
                                    <tr key={slot.id}>
                                        <td>{slot.slotID}</td>
                                        <td>
                                            {slot.address
                                                .slice(0, 30)
                                                .concat("...")}
                                        </td>
                                        <td>{slot.price}</td>
                                        <td>{slot.startDate}</td>
                                        <td>{slot.endDate}</td>
                                        <td>{slot.reservationStatus}</td>
                                        <td>{slot.paymentStatus}</td>
                                    </tr>
                                ))
                            ) : (
                                <h2 style={{ margin: "auto" }}>
                                    No reservation is made yet!
                                </h2>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Reservation;
