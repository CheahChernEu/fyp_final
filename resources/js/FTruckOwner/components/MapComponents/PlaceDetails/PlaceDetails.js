import React from "react";
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
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
            <CardMedia style={{ height: 350 }} image={place.slotImage} />
            <CardContent>
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
                        RM {place.price}
                    </Typography>
                </Box>

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
            </CardContent>
            <CardActions>
                <Checkout places={places} index={index} />
            </CardActions>
        </Card>
    );
};

export default PlaceDetails;
