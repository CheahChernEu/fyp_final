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
                {/* <Box display="flex" justifyContent="space-between"> */}
                <Typography component="legend">
                    Price (in RM): {place.price}/day
                </Typography>
                {/* <Typography gutterBottom variant="subtitle1">

                </Typography> */}
                {/* </Box> */}

                {place.address && (
                    <Typography
                        // gutterBottom
                        // variant="body2"
                        // color="textSecondary"
                        component="legend"
                        className={classes.subtitle}
                    >
                        <LocationOnIcon />
                        {/* <Box display="flex" justifyContent="space-between"> */}
                        {place.address}
                        {/* </Box> */}
                    </Typography>
                )}
                {place.slotStatus && (
                    <Chip
                        size="small"
                        label={place.slotStatus}
                        className={
                            place.slotStatus != "Available"
                                ? classes.chipRed
                                : classes.chipBlue
                        }
                    />
                )}
            </CardContent>
            <CardActions>
                <Checkout places={places} index={index} />
            </CardActions>
        </Card>
    );
};

export default PlaceDetails;
