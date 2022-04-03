import React, { useState, useEffect, createRef } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Grid,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import Checkout from "../../Checkout/Checkout";

import useStyles from "./styles.js";

const PlaceDetails = ({ place, selected, refProp, index, places }) => {
    if (selected)
        refProp?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    const classes = useStyles();

    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={
                    place.slotImage
                        ? place.slotImage
                        : "https://1.bp.blogspot.com/-MbntNDjCYls/XTK0TFH0CkI/AAAAAAAAaLQ/fh59xEPaHAQpQhOE9N_maCmWipgtduKswCLcBGAs/s1600/IJM-allianz-duo-highway-2019-selinawing-02.png"
                }
                // title={place.name}
            />
            <CardContent>
                {/* <Typography gutterBottom variant="h5">
                    {place.name}
                </Typography> */}
                <Box display="flex" justifyContent="space-between" my={2}>
                    {place.rating !== null && (
                        <Rating
                            name="read-only"
                            value={place.rating}
                            readOnly
                        />
                    )}
                    {place.review !== null && (
                        <Typography component="legend">
                            {place.review} review
                            {Number(place.review) > 1 && "s"}
                        </Typography>
                    )}
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.price}
                    </Typography>
                </Box>
                {/* <Box display="flex" justifyContent="space-between">
                    <Typography component="legend">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.ranking}
                    </Typography>
                </Box> */}
                {/* {place?.awards?.map((award) => (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        my={1}
                        alignItems="center"
                    >
                        <img src={award.images.small} />
                        <Typography variant="subtitle2" color="textSecondary">
                            {award.display_name}
                        </Typography>
                    </Box>
                ))} */}
                {/* {place?.cuisine?.map(({ name }) => (
                    <Chip
                        key={name}
                        size="small"
                        label={name}
                        className={classes.chip}
                    />
                ))} */}
                {place.slotStatus && (
                    <Chip
                        size="small"
                        label={place.slotStatus}
                        className={classes.chip}
                    />
                )}
                {place.address && (
                    <Typography
                        gutterBottom
                        variant="body2"
                        color="textSecondary"
                        className={classes.subtitle}
                    >
                        <LocationOnIcon />
                        {place.address}
                    </Typography>
                )}
                {/* {place.phone && (
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.spacing}
                    >
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )} */}
            </CardContent>
            <CardActions>
                {/* <h1>{place}</h1> */}
                {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClickOpen()}
                >
                    Slot Reservation!
                </Button> */}
                <Checkout places={places} index={index} />
            </CardActions>
        </Card>
    );
};

export default PlaceDetails;
