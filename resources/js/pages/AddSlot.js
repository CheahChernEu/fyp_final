import React, { useState, useEffect } from "react";
import Http from "../Http";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Geocode from "react-geocode";
import AdminHeader from "./../components/AdminHeader";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import { FaLocationArrow } from "react-icons/fa";
import "@reach/combobox/styles.css";
import AddSlotMapStyles from "./AddSlotMapStyles";

const api = "/api/v1/slot";

const libraries = ["places"];

const mapContainerStyle = {
    height: "40vh",
    width: "100%",
};

const options = {
    styles: AddSlotMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const center = {
    lat: 3.140853,
    lng: 101.693207,
};

const AddSlot = () => {
    const session = JSON.parse(window.localStorage.getItem("user"));
    const { id } = session;
    const { register, handleSubmit, watch, errors } = useForm();
    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    const [stateForm, setStateForm] = useState({
        address: "",
        slotID: "",
        slotImage: "",
        lat: "",
        lng: "",
        price: "",
        review: null,
        rating: null,
        slotStatus: "available",
    });

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setStateForm({
            ...stateForm,
            slotImage: base64,
        });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

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
                        address: "",
                        slotID: "",
                        slotImage: "",
                        lat: "",
                        lng: "",
                        price: "",
                        review: null,
                        rating: null,
                        slotStatus: "available",
                    });
                    setError(false);
                })
                .catch(() => {
                    setError(
                        "Sorry, there was an error nananana saving your food truck slot."
                    );
                });
        } else {
            Http.post(api, slot)
                .then(({ data }) => {
                    slot = { id: data.id, ...slot };
                    const allSlots = [slot, ...dataState];
                    setData(allSlots);
                    setStateForm({
                        address: "",
                        slotID: "",
                        slotImage: "",
                        lat: "",
                        lng: "",
                        price: "",
                        review: null,
                        rating: null,
                        slotStatus: "available",
                    });
                    setError(false);
                })
                .catch(() => {
                    setError(
                        "Sorry, there was an error hehehehe saving your food truck slot."
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
            slotID: "Are you sure?",
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

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCw9FAbOyHnq202RNFWEC5dsMTQfa-IHeE",
        libraries,
    });
    const [marker, setMarkers] = React.useState({});
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setMarkers({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
        });
        Geocode.setApiKey("AIzaSyCw9FAbOyHnq202RNFWEC5dsMTQfa-IHeE");

        Geocode.setLanguage("en");

        Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log(address);
                setStateForm({
                    ...stateForm,
                    address: address,
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

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
                                    <label htmlFor="slotID">Slot ID</label>
                                    <input
                                        id="slotID"
                                        type="slotID"
                                        name="slotID"
                                        className="form-control mr-3"
                                        placeholder="e.g. B01"
                                        required
                                        onChange={handleChange}
                                        value={stateForm.slotID}
                                        maxLength={100}
                                        minLength={3}
                                        ref={register({ required: true })}
                                    />
                                    {errors.slotID && (
                                        <span className="invalid-feedback">
                                            This field is required
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addSlot">Address</label>
                                    <textarea
                                        name="address"
                                        id="address"
                                        required
                                        maxLength={1000}
                                        minLength={10}
                                        className="form-control mr-3"
                                        placeholder="e.g. 4C, Jalan Ipoh"
                                        onChange={handleChange}
                                        value={stateForm.address}
                                        ref={register()}
                                    />

                                    {errors.address && (
                                        <span className="invalid-feedback">
                                            This field is required.
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="addSlot">Price in RM</label>
                                    <input
                                        name="price"
                                        id="price"
                                        required
                                        maxLength={100}
                                        minLength={3}
                                        className="form-control mr-3"
                                        placeholder="e.g. 100"
                                        onChange={handleChange}
                                        value={stateForm.price}
                                        ref={register()}
                                    />

                                    {errors.price && (
                                        <span className="invalid-feedback">
                                            This field is required.
                                        </span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="slotImage">
                                        Slot Image
                                    </label>
                                    <input
                                        id="slotImage"
                                        type="file"
                                        name="slotImage"
                                        className="form-control mr-3"
                                        style={{ border: "none" }}
                                        onChange={(e) => {
                                            uploadImage(e);
                                        }}
                                        ref={register()}
                                    />
                                </div>
                                {/* <input
                                    name="lat"
                                    id="lat"
                                    required
                                    className="form-control mr-3"
                                    onChange={handleChange}
                                    value={marker.lat}
                                    ref={register()}
                                    readOnly
                                />
                                <input
                                    name="lng"
                                    id="lng"
                                    required
                                    className="form-control mr-3"
                                    onChange={handleChange}
                                    value={marker.lng}
                                    ref={register()}
                                    readOnly
                                /> */}
                                <div className="form-group">
                                    <label htmlFor="map">Location</label>
                                    <div></div>
                                    <Locate panTo={panTo} />
                                    <Search panTo={panTo} />

                                    <GoogleMap
                                        id="map"
                                        mapContainerStyle={mapContainerStyle}
                                        zoom={8}
                                        center={center}
                                        options={options}
                                        onClick={onMapClick}
                                        onLoad={onMapLoad}
                                    >
                                        <Marker
                                            key={`${marker.lat}-${marker.lng}`}
                                            position={{
                                                lat: marker.lat,
                                                lng: marker.lng,
                                            }}
                                            onClick={() => {
                                                setSelected(marker);
                                            }}
                                        />

                                        {selected ? (
                                            <InfoWindow
                                                position={{
                                                    lat: selected.lat,
                                                    lng: selected.lng,
                                                }}
                                                onCloseClick={() => {
                                                    setSelected(null);
                                                }}
                                            >
                                                <div>
                                                    <h2>Food Truck Slot</h2>
                                                    <p>
                                                        Selected{" "}
                                                        {formatRelative(
                                                            selected.time,
                                                            new Date()
                                                        )}{" "}
                                                        Latitude: {selected.lat}{" "}
                                                        Longitude:{" "}
                                                        {selected.lng}
                                                    </p>
                                                </div>
                                            </InfoWindow>
                                        ) : null}
                                    </GoogleMap>
                                </div>
                                <div></div>
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
                                        <th>Slot ID</th>
                                        <th>Address</th>
                                        <th>Price (in RM)</th>
                                        <th>Slot Image</th>
                                        <th>Slot Status</th>
                                        <th>Delete</th>
                                        <th>Edit</th>
                                    </tr>
                                    {dataState.length > 0 &&
                                        dataState.map((slot) => (
                                            <tr key={slot.id}>
                                                <td>
                                                    {slot.slotID}
                                                </td>
                                                <td>
                                                    {slot.address
                                                        .slice(0, 30)
                                                        .concat("...")}
                                                </td>
                                                <td>
                                                    {slot.price}
                                                </td>
                                                <td>
                                                    <img
                                                        src={slot.slotImage}
                                                        className="rounded mx-auto d-block"
                                                    ></img>
                                                </td>
                                                <td>
                                                    {slot.slotStatus}
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

function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <FaLocationArrow /> Use Current Location
        </button>
    );
}

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 500,
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default AddSlot;
