import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import List from "../../FTruckOwner/components/MapComponents/List/List";
import Map from "../../FTruckOwner/components/MapComponents/Map/Map";
import OwnerHeader from "../../components/FoodTruckOwnerHeader";
import Http from "../../Http";

const ViewFoodTruckSlot = () => {
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");

    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState(null);

    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [places, setPlaces] = useState([]);

    const [autocomplete, setAutocomplete] = useState(null);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);

    const api = "/api/v1/slot";

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoords({ lat: latitude, lng: longitude });
            }
        );
    }, []);

    useEffect(() => {
        //Http.get(`${api}?status=open`)
        Http.get(api)
            .then((res) => {
                // setIsLoading(true);
                const { data } = res.data;
                console.log(data);
                setPlaces(data);
                setError(false);
                setFilteredPlaces([]);
                setRating("");
                setIsLoading(false);
            })
            .catch((err) => {
                setError("Unable to fetch data.");
            });
    }, []);

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoords({ lat, lng });
    };

    return (
        <>
            <OwnerHeader />
            <CssBaseline />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List
                        isLoading={isLoading}
                        childClicked={childClicked}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Map
                        setChildClicked={setChildClicked}
                        setBounds={setBounds}
                        setCoords={setCoords}
                        coords={coords}
                        places={places}
                        onPlaceChanged={onPlaceChanged}
                        onLoad={onLoad}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ViewFoodTruckSlot;
