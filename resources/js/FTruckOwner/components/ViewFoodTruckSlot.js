import React from "react";

const ViewFoodTruckSlot = () => {
    return (
        <div className="col">
            <div className="todos">
                <h1 className="text-center mb-4">List of Food Truck Slots</h1>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Slot No</th>
                            <th>Address</th>
                            <th>Slot Image</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                        {dataState.length > 0 &&
                            dataState.map((slot) => (
                                <tr key={slot.id}>
                                    <td>{slot.title}</td>
                                    <td>
                                        {slot.content
                                            .slice(0, 30)
                                            .concat("...")}
                                    </td>
                                    <td>
                                        <img
                                            src={slot.image_url}
                                            className="rounded mx-auto d-block"
                                        ></img>
                                    </td>
                                    <td>
                                        <span
                                            type="button"
                                            className="badge badge-danger"
                                            onClick={
                                                slot.user_id === id
                                                    ? deleteSlot
                                                    : () =>
                                                          console.log(
                                                              "No access to the slot created by other admin"
                                                          )
                                            }
                                            data-key={slot.id}
                                        >
                                            Delete
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            type="button"
                                            className="badge badge-dark"
                                            onClick={
                                                slot.user_id === id
                                                    ? () => editSlot(slot)
                                                    : () =>
                                                          console.log(
                                                              "No access to the slot created by other admin"
                                                          )
                                            }
                                            data-key={slot.id}
                                        >
                                            Edit
                                        </span>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewFoodTruckSlot;
