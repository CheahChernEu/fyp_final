import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery, InputBase } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

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

    return (
        <div className={classes.mapContainer}>
            <LoadScript
                id="script-loader"
                //   googleMapsApiKey={"AIzaSyCw9FAbOyHnq202RNFWEC5dsMTQfa-IHeE"}
                language="en"
                region="EN"
                version="weekly"
                libraries={["places"]}
            >
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
                                lat={Number(place.latitude)}
                                lng={Number(place.longitude)}
                                key={i}
                            >
                                {!matches ? (
                                    <LocationOnOutlinedIcon
                                        color="primary"
                                        fontSize="large"
                                    />
                                ) : (
                                    <Paper
                                        elevation={3}
                                        className={classes.paper}
                                    >
                                        <Typography
                                            className={classes.typography}
                                            variant="subtitle2"
                                            gutterBottom
                                        >
                                            {" "}
                                            {place.name}
                                        </Typography>
                                        <img
                                            className={classes.pointer}
                                            src={
                                                place.photo
                                                    ? place.photo.images.large
                                                          .url
                                                    : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                                            }
                                        />
                                        <Rating
                                            name="read-only"
                                            size="small"
                                            value={Number(place.rating)}
                                            readOnly
                                        />
                                    </Paper>
                                )}
                            </div>
                        ))}
                    {weatherData?.list?.length &&
                        weatherData.list.map((data, i) => (
                            <div
                                key={i}
                                lat={data.coord.lat}
                                lng={data.coord.lon}
                            >
                                <img
                                    src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                                    height="70px"
                                />
                            </div>
                        ))}
                </GoogleMapReact>
            </LoadScript>
        </div>
    );
};

export default Map;
