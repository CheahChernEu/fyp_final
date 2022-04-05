import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery, InputBase } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import SearchIcon from "@material-ui/icons/Search";
import {
    Autocomplete,
    LoadScript,
    useLoadScript,
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

import "@reach/combobox/styles.css";

import mapStyles from "../mapStyles";
import useStyles from "./styles.js";

const Map = ({
    coords,
    places,
    setCoords,
    setBounds,
    setChildClicked,

    onPlaceChanged,
    onLoad,
}) => {
    const matches = useMediaQuery("(min-width:600px)");
    const classes = useStyles();

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCw9FAbOyHnq202RNFWEC5dsMTQfa-IHeE",
        libraries,
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div className={classes.mapContainer}>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>
            </Autocomplete>

            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyCw9FAbOyHnq202RNFWEC5dsMTQfa-IHeE",
                }}
                defaultCenter={coords}
                center={coords}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: mapStyles,
                }}
                onLoad={onMapLoad}
                onChange={(e) => {
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({
                        ne: e.marginBounds.ne,
                        sw: e.marginBounds.sw,
                    });
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places.length &&
                    places.map((place, i) => (
                        <div
                            className={classes.markerContainer}
                            lat={Number(place.lat)}
                            lng={Number(place.lng)}
                            key={i}
                        >
                            {!matches ? (
                                <LocationOnOutlinedIcon
                                    color="primary"
                                    fontSize="large"
                                />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography
                                        className={classes.typography}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {" "}
                                        {place.slotID}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.slotImage}
                                    />
                                    <Typography
                                        className={classes.typography}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {" "}
                                        RM {place.price} per day
                                    </Typography>
                                    <Typography
                                        className={classes.typography}
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {" "}
                                        {place.address}
                                    </Typography>
                                </Paper>
                            )}
                        </div>
                    ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
