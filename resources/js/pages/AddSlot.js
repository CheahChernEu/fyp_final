import React, { useState, useEffect } from "react";
import Http from "../Http";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import AdminHeader from './../components/AdminHeader';
const api = "/api/v1/slot";

const AddSlot = () => {
    const session = JSON.parse(window.localStorage.getItem("user"));
    const { id } = session;
    const { register, handleSubmit, watch, errors } = useForm();
    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    const [stateForm, setStateForm] = useState({
        content: "",
        title: "",
        image_url: "",
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
        addSlot(stateForm);
    };

    const addSlot = (slot) => {
        if (slot?.id) {
            Http.patch(`${api}/${slot.id}`, slot)
                .then((response) => {
                    console.log(response);
                    let filterSlots = dataState.filter(
                        (art) => art.id !== slot.id
                    );
                    filterSlots = [slot, ...filterSlots];
                    setData(filterSlots);
                    setStateForm({
                        content: "",
                        title: "",
                        image_url: "",
                    });
                    setError(false);
                })
                .catch(() => {
                    setError(
                        "Sorry, there was an error saving your food truck slot."
                    );
                });
        } else {
            Http.post(api, slot)
                .then(({ data }) => {
                    slot = { id: data.id, ...slot };
                    const allSlots = [slot, ...dataState];
                    setData(allSlots);
                    setStateForm({
                        content: "",
                        title: "",
                        image_url: "",
                    });
                    setError(false);
                })
                .catch(() => {
                    setError(
                        "Sorry, there was an error saving your food truck slot."
                    );
                });
        }
    };

    const editSlot = (slot) => {
        const { id } = slot;
        let form = dataState.filter((art) => art.id === id);
        console.log(id, form);
        setStateForm(form[0]);
    };

    const deleteSlot = (e) => {
        const { key } = e.target.dataset;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this food truck slot!",
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
                                (slot) => slot.id !== key
                            );
                            setError(false);
                            setData(updateState);
                            console.log("Food truck slot:", updateState);
                            swal("The food truck slot has been deleted!", {
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
                <div className="row">
                    <div className="col">
                        <div className="add-todos mb-5">
                            <h1 className="text-center mb-4">
                                Add/ Update Food Truck Slot
                            </h1>
                            <form
                                method="post"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="form-group">
                                    <label htmlFor="title">Slot No</label>
                                    <input
                                        id="title"
                                        type="title"
                                        name="title"
                                        className="form-control mr-3"
                                        placeholder="e.g. B01"
                                        required
                                        onChange={handleChange}
                                        value={stateForm.title}
                                        maxLength={100}
                                        minLength={3}
                                        ref={register({ required: true })}
                                    />
                                    {errors.title && (
                                        <span className="invalid-feedback">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addSlot">Address</label>
                                    <textarea
                                        name="content"
                                        id="content"
                                        name="content"
                                        required
                                        maxLength={1000}
                                        minLength={10}
                                        className="form-control mr-3"
                                        placeholder="e.g. 4C, Jalan Ipoh"
                                        onChange={handleChange}
                                        value={stateForm.content}
                                        ref={register()}
                                    />

                                    {errors.content && (
                                        <span className="invalid-feedback">
                                            This field is required.
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image_url">
                                        Slot Image Url
                                    </label>
                                    <input
                                        id="image_url"
                                        type="url"
                                        name="image_url"
                                        maxLength={100}
                                        className="form-control mr-3"
                                        placeholder="e.g.https://image.app.goo.gl"
                                        onChange={handleChange}
                                        maxLength={70}
                                        value={stateForm.image_url}
                                        ref={register()}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block btn-outline-primary"
                                >
                                    Add
                                </button>
                            </form>
                        </div>
                        {error && (
                            <div className="alert alert-warning" role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                    <div className="col">
                        <div className="todos">
                            <h1 className="text-center mb-4">
                                List of Food Truck Slots
                            </h1>
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
                                                                ? () =>
                                                                      editSlot(
                                                                          slot
                                                                      )
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
                </div>
            </div>
        </>
    );
};

export default AddSlot;
