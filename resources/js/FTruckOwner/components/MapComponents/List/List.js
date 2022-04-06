import React, { useState, useEffect, createRef, useRef } from "react";
import {
    CircularProgress,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core";

import Checkout from "../../Checkout/Checkout";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles.js";

const List = ({
    places,
    type,
    setType,
    rating,
    setRating,
    childClicked,
    isLoading,
}) => {
    const [elRefs, setElRefs] = useState([]);
    const inputEl = React.useRef({});
    const classes = useStyles();

    useEffect(() => {
        setElRefs((refs) =>
            Array(places.length)
                .fill()
                .map((_, i) => refs[i] || createRef())
        );
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4" style={{ margin: "45px" }}>
                Food Truck Slot Around You
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, i) => (
                            <Grid ref={elRefs[i]} key={i} item xs={12}>
                                <PlaceDetails
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                    place={place}
                                    places={places}
                                    index={i}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    );
};

export default List;
