import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from "../../api/travelAdvisorAPI";
import Header from "../../FTruckOwner/components/MapComponents/Header/Header";
import List from "../../FTruckOwner/components/MapComponents/List/List";
import Map from "../../FTruckOwner/components/MapComponents/Map/Map";
import OwnerHeader from "../../components/FoodTruckOwnerHeader";
import axios from "axios";
import Http from "../../Http";

const ViewFoodTruckSlot = () => {
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");

    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState(null);

    const [weatherData, setWeatherData] = useState([]);
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

    // useEffect(() => {
    //     axios.get("/api/getSlots").then((res) => {
    //         if (res.data.status === 200) {
    //             console.log(res.data.slots);
    //         }
    //     });
    // }, []);

    // useEffect(() => {
    //     const filtered = places.filter(
    //         (place) => Number(place.rating) > rating
    //     );

    //     setFilteredPlaces(filtered);
    // }, [rating]);

    // useEffect(() => {
    //     if (bounds) {
    //         setIsLoading(true);

    //         // getWeatherData(coords.lat, coords.lng).then((data) =>
    //         //     setWeatherData(data)
    //         // );

    //         getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
    //             setPlaces(
    //                 data.filter((place) => place.name && place.num_reviews > 0)
    //             );
    //             setFilteredPlaces([]);
    //             setRating("");
    //             setIsLoading(false);
    //         });
    //     }
    // }, [bounds, type]);

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
            {/* <Header onPlaceChanged={onPlaceChanged} /> */}
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
                        weatherData={weatherData}
                        onPlaceChanged={onPlaceChanged}
                        onLoad={onLoad}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ViewFoodTruckSlot;
