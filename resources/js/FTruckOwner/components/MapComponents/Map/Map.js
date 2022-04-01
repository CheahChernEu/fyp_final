import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery, InputBase } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

import swal from "sweetalert";
import Geocode from "react-geocode";
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

import mapStyles from "../mapStyles";
import useStyles from "./styles.js";

const Map = ({
    coords,
    places,
    setCoords,
    setBounds,
    setChildClicked,
    weatherData,
    onPlaceChanged,
    onLoad,
}) => {
    const matches = useMediaQuery("(min-width:600px)");
    const classes = useStyles();

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

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
                                    <ComboboxOption
                                        key={id}
                                        value={description}
                                    />
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>
        );
    }

    return (
        <div className={classes.mapContainer}>
            {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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
            </Autocomplete> */}
            <Locate panTo={panTo} />
            <Search panTo={panTo} />
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
                                        src={
                                            place.slotImage
                                                ? "https://1.bp.blogspot.com/-MbntNDjCYls/XTK0TFH0CkI/AAAAAAAAaLQ/fh59xEPaHAQpQhOE9N_maCmWipgtduKswCLcBGAs/s1600/IJM-allianz-duo-highway-2019-selinawing-02.png"
                                                : place.slotImage
                                        }
                                    />
                                    <Rating
                                        name="read-only"
                                        size="small"
                                        value={place.rating}
                                        readOnly
                                    />
                                </Paper>
                            )}
                        </div>
                    ))}
                {/* {weatherData?.list?.length &&
                    weatherData.list.map((data, i) => (
                        <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                            <img
                                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                                height="70px"
                            />
                        </div>
                    ))} */}
            </GoogleMapReact>
        </div>
    );
};

export default Map;
