// import React, { useState, useEffect } from "react";
// import { CssBaseline, Grid } from "@material-ui/core";
// import List from "../../FTruckOwner/components/MapComponents/List/List";
// import Map from "../../FTruckOwner/components/MapComponents/Map/Map";
// import OwnerHeader from "../../components/FoodTruckOwnerHeader";
// import Http from "../../Http";

// const ViewFoodTruckSlot = () => {
//     const [type, setType] = useState("restaurants");
//     const [rating, setRating] = useState("");

//     const [coords, setCoords] = useState({});
//     const [bounds, setBounds] = useState(null);

//     const [filteredPlaces, setFilteredPlaces] = useState([]);
//     const [places, setPlaces] = useState([]);

//     const [autocomplete, setAutocomplete] = useState(null);
//     const [childClicked, setChildClicked] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const [dataState, setData] = useState([]);
//     const [error, setError] = useState(false);

//     const api = "/api/v1/slot";

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             ({ coords: { latitude, longitude } }) => {
//                 setCoords({ lat: latitude, lng: longitude });
//             }
//         );
//     }, []);

//     useEffect(() => {
//         Http.get(api)
//             .then((res) => {
//                 const { data } = res.data;
//                 console.log(data);
//                 setPlaces(data);
//                 setError(false);
//                 setFilteredPlaces([]);
//                 setRating("");
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 setError("Unable to fetch data.");
//             });
//     }, []);

//     const onLoad = (autoC) => setAutocomplete(autoC);

//     const onPlaceChanged = () => {
//         const lat = autocomplete.getPlace().geometry.location.lat();
//         const lng = autocomplete.getPlace().geometry.location.lng();

//         setCoords({ lat, lng });
//     };

//     return (
//         <>
//             <OwnerHeader />
//             <CssBaseline />
//             <Grid container spacing={3} style={{ width: "100%" }}>
//                 <Grid item xs={12} md={4}>
//                     <List
//                         isLoading={isLoading}
//                         childClicked={childClicked}
//                         places={filteredPlaces.length ? filteredPlaces : places}
//                         type={type}
//                         setType={setType}
//                         rating={rating}
//                         setRating={setRating}
//                     />
//                 </Grid>
//                 <Grid
//                     item
//                     xs={12}
//                     md={8}
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                 >
//                     <Map
//                         setChildClicked={setChildClicked}
//                         setBounds={setBounds}
//                         setCoords={setCoords}
//                         coords={coords}
//                         places={places}
//                         onPlaceChanged={onPlaceChanged}
//                         onLoad={onLoad}
//                     />
//                 </Grid>
//             </Grid>
//         </>
//     );
// };

// export default ViewFoodTruckSlot;

import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import List from "../../FTruckOwner/components/MapComponents/List/List";
import Map from "../../FTruckOwner/components/MapComponents/Map/Map";
import OwnerHeader from "../../components/FoodTruckOwnerHeader";
import Http from "../../Http";
import "../../../sass/app.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(6, 1),
    },
}));

export default function ViewFoodTruckSlot() {
    const classes = useStyles();
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

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
        Http.get(api)
            .then((res) => {
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
        <div className={classes.root}>
            <CssBaseline />
            {/* <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <OwnerHeader />
            {/* <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <list>
                    {["Inbox", "Starred", "Send email", "Drafts"].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <Divider />
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </list>
            </Drawer> */}
            <main className={classes.content}>
                {/* <div className={classes.toolbar} /> */}
                <Grid container spacing={3} style={{ width: "100%" }}>
                    <Grid item xs={12} md={4}>
                        <List
                            isLoading={isLoading}
                            childClicked={childClicked}
                            places={
                                filteredPlaces.length ? filteredPlaces : places
                            }
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
                            marginTop: "42px",
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
            </main>
        </div>
    );
}
