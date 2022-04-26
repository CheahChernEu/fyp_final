import React, { useState, useEffect } from "react";
import Http from "../Http";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Geocode from "react-geocode";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LogoutIcon from "@mui/icons-material/Logout";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddIcon from "@mui/icons-material/Add";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AdminHeader from "../../js/components/AdminHeader";

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
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
import { formatRelative } from "date-fns";
import { FaLocationArrow } from "react-icons/fa";
import "@reach/combobox/styles.css";
import AddSlotMapStyles from "./AddSlotMapStyles";
import "../../sass/app.scss";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//     transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up("sm")]: {
//         width: `calc(${theme.spacing(8)} + 1px)`,
//     },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(["width", "margin"], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

// const Drawer = styled(MuiDrawer, {
//     shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//     boxSizing: "border-box",
//     ...(open && {
//         ...openedMixin(theme),
//         "& .MuiDrawer-paper": openedMixin(theme),
//     }),
//     ...(!open && {
//         ...closedMixin(theme),
//         "& .MuiDrawer-paper": closedMixin(theme),
//     }),
// }));

const api = "/api/v1/slot";

const libraries = ["places"];

const mapContainerStyle = {
    height: "52vh",
    width: "100%",
};

const options = {
    styles: AddSlotMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

const center = {
    lat: 3.140853,
    lng: 101.693207,
};

const AddSlot = () => {
    // const theme = useTheme();
    // const [open, setOpen] = React.useState(false);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
        },

        content: {
            flexGrow: 1,
            padding: theme.spacing(0, 3),
        },
    }));
    const classes = useStyles();

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const [value, setValue] = React.useState(0);
    const session = JSON.parse(window.localStorage.getItem("user"));
    const { id } = session;
    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [stateForm, setStateForm] = useState({
        address: "",
        slotID: "",
        slotImage: "",
        lat: "",
        lng: "",
        price: "",
        review: null,
        rating: null,
        slotStatus: "Available",
    });

    const handleClick = () => {
        setOpenSnackbar(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setStateForm({
            ...stateForm,
            slotImage: base64,
        });
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    useEffect(() => {
        //Http.get(`${api}?status=open`)
        Http.get(api)
            .then((response) => {
                const { data } = response.data;
                console.log(data);
                setData(data);
                setError(false);
            })
            .catch((err) => {
                setError("Unable to fetch data.");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateForm({
            ...stateForm,
            [name]: value,
        });
    };

    const onSubmit = () => {
        addSlot(stateForm);
    };

    const addSlot = (slot) => {
        if (slot?.id) {
            Http.patch(`${api}/${slot.id}`, slot)
                .then((response) => {
                    console.log(response);
                    let filterSlots = dataState.filter(
                        (art) => art.id !== slot.id
                    );
                    filterSlots = [slot, ...filterSlots];
                    setData(filterSlots);
                    setStateForm({
                        address: "",
                        slotID: "",
                        slotImage: "",
                        lat: "",
                        lng: "",
                        price: "",
                        review: null,
                        rating: null,
                        slotStatus: "Available",
                    });
                    setError(false);
                    handleClick();
                })
                .catch(() => {
                    setError(
                        "Sorry, there was an error saving your food truck slot."
                    );
                });
        } else {
            Http.post(api, slot)
                .then(({ data }) => {
                    slot = { id: data.id, ...slot };
                    const allSlots = [slot, ...dataState];
                    setData(allSlots);
                    setStateForm({
                        address: "",
                        slotID: "",
                        slotImage: "",
                        lat: "",
                        lng: "",
                        price: "",
                        review: null,
                        rating: null,
                        slotStatus: "Available",
                    });
                    setError(false);
                    handleClick();
                })
                .catch(() => {
                    setError(
                        "Sorry, there was an error saving your food truck slot."
                    );
                });
        }
    };

    const resetForm = () => {
        setStateForm({
            address: "",
            slotID: "",
            slotImage: "",
            lat: "",
            lng: "",
            price: "",
            review: null,
            rating: null,
            slotStatus: "Available",
        });
        setMarkers({
            lat: null,
            lng: null,
            time: null,
        });
    };

    const deleteSlot = (e) => {
        const { key } = e.target.dataset;
        swal({
            slotID: "Are you sure?",
            text: "Once deleted, you will not be able to recover this food truck slot!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                Http.delete(`${api}/${key}`)
                    .then((response) => {
                        console.log(key);
                        console.log(response);
                        if (response.status === 204) {
                            const updateState = dataState.filter(
                                (slot) => slot.id !== key
                            );
                            setError(false);
                            setData(updateState);
                            console.log("Food truck slot:", updateState);
                            swal("The food truck slot has been deleted!", {
                                icon: "success",
                            });
                        } else {
                            swal(
                                "Unable to Delete!",
                                "There was an error processing.",
                                { icon: "warning" }
                            );
                        }
                    })
                    .catch((errorResponse) => {
                        console.log(errorResponse);
                        setError("There was an error processing.");
                        swal(
                            "Unable to Delete!",
                            "There was an error processing.",
                            { icon: "warning" }
                        );
                    });
            }
        });
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCw9FAbOyHnq202RNFWEC5dsMTQfa-IHeE",
        libraries,
    });
    const [marker, setMarkers] = React.useState({});
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setMarkers({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
        });
        Geocode.setApiKey("AIzaSyCw9FAbOyHnq202RNFWEC5dsMTQfa-IHeE");

        Geocode.setLanguage("en");

        Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
            (response) => {
                const address = response.results[0].formatted_address;

                setStateForm({
                    ...stateForm,
                    address: address,
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                });
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <>
            <div className={classes.root}>
                <AdminHeader />
                <CssBaseline />
                <main className={classes.content}>
                    <Box sx={{ display: "flex" }}>
                        {/* <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            F_Truck
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <Link
                            tag={Link}
                            to="/admin"
                            style={{ textDecoration: "none", color: "#757575" }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Dashboard"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link
                            tag={Link}
                            to="/add-slot"
                            style={{ textDecoration: "none", color: "#757575" }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Add New Slot"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link
                            tag={Link}
                            to="/view-reservation"
                            style={{ textDecoration: "none", color: "#757575" }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TableRowsIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="View Reservation"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link
                            tag={Link}
                            to="/home"
                            style={{ textDecoration: "none", color: "#757575" }}
                        >
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Log Out"
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer> */}
                        <Box
                            component="main"
                            sx={{ flexGrow: 1, p: 3 }}
                            style={{ marginTop: "50px" }}
                        >
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChangeTab}
                                    aria-label="basic tabs example"
                                    centered
                                >
                                    <Tab
                                        icon={<AddLocationIcon />}
                                        {...a11yProps(0)}
                                        style={{ outline: "none" }}
                                    />
                                    <Tab
                                        icon={<LocalShippingIcon />}
                                        {...a11yProps(1)}
                                        style={{ outline: "none" }}
                                    />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <div className="container py-5">
                                    <div className="add-todos mb-5">
                                        <h1 className="text-center mb-4">
                                            Add New Food Truck Slot
                                        </h1>
                                        <form
                                            method="post"
                                            onSubmit={handleSubmit(onSubmit)}
                                        >
                                            <div className="form-group">
                                                <label htmlFor="addSlot">
                                                    Address
                                                </label>
                                                <textarea
                                                    name="address"
                                                    id="address"
                                                    required
                                                    maxLength={1000}
                                                    minLength={10}
                                                    className="form-control mr-3"
                                                    placeholder="e.g. 4C, Jalan Ipoh"
                                                    onChange={handleChange}
                                                    value={stateForm.address}
                                                    ref={register()}
                                                    disabled
                                                />

                                                {errors.address && (
                                                    <span className="invalid-feedback">
                                                        This field is required.
                                                    </span>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Locate panTo={panTo} />
                                                    <div
                                                        style={{
                                                            marginLeft: "5px",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Search panTo={panTo} />
                                                    </div>
                                                </div>

                                                <GoogleMap
                                                    id="map"
                                                    mapContainerStyle={
                                                        mapContainerStyle
                                                    }
                                                    zoom={8}
                                                    center={center}
                                                    options={options}
                                                    onClick={onMapClick}
                                                    onLoad={onMapLoad}
                                                >
                                                    <Marker
                                                        key={`${marker.lat}-${marker.lng}`}
                                                        position={{
                                                            lat: marker.lat,
                                                            lng: marker.lng,
                                                        }}
                                                        onClick={() => {
                                                            setSelected(marker);
                                                        }}
                                                    />

                                                    {selected ? (
                                                        <InfoWindow
                                                            position={{
                                                                lat: selected.lat,
                                                                lng: selected.lng,
                                                            }}
                                                            onCloseClick={() => {
                                                                setSelected(
                                                                    null
                                                                );
                                                            }}
                                                        >
                                                            <div>
                                                                <h2>
                                                                    Food Truck
                                                                    Slot
                                                                </h2>
                                                                <p>
                                                                    Selected{" "}
                                                                    {formatRelative(
                                                                        selected.time,
                                                                        new Date()
                                                                    )}{" "}
                                                                    Latitude:{" "}
                                                                    {
                                                                        selected.lat
                                                                    }{" "}
                                                                    Longitude:{" "}
                                                                    {
                                                                        selected.lng
                                                                    }
                                                                </p>
                                                            </div>
                                                        </InfoWindow>
                                                    ) : null}
                                                </GoogleMap>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="slotID">
                                                    Slot ID
                                                </label>
                                                <input
                                                    id="slotID"
                                                    type="slotID"
                                                    name="slotID"
                                                    className="form-control mr-3"
                                                    placeholder="e.g. B01"
                                                    required
                                                    onChange={handleChange}
                                                    value={stateForm.slotID}
                                                    maxLength={100}
                                                    minLength={3}
                                                    ref={register({
                                                        required: true,
                                                    })}
                                                    style={{ height: "32px" }}
                                                />
                                                {errors.slotID && (
                                                    <span className="invalid-feedback">
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="addSlot">
                                                    Price in RM
                                                </label>
                                                <input
                                                    name="price"
                                                    id="price"
                                                    required
                                                    maxLength={4}
                                                    minLength={2}
                                                    className="form-control mr-3"
                                                    placeholder="e.g. 100"
                                                    onChange={handleChange}
                                                    value={stateForm.price}
                                                    style={{ height: "32px" }}
                                                    ref={register()}
                                                />

                                                {errors.price && (
                                                    <span className="invalid-feedback">
                                                        This field is required.
                                                    </span>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="slotImage">
                                                    Slot Image
                                                </label>
                                                <input
                                                    id="slotImage"
                                                    type="file"
                                                    name="slotImage"
                                                    className="form-control mr-3"
                                                    style={{
                                                        border: "none",
                                                        height: "32px",
                                                    }}
                                                    onChange={(e) => {
                                                        uploadImage(e);
                                                    }}
                                                    ref={register()}
                                                    required
                                                />
                                                {errors.slotImage && (
                                                    <span className="invalid-feedback">
                                                        This field is required.
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="btn  btn-outline-primary"
                                                    style={{
                                                        height: "36px",
                                                        background: "#556cd6",
                                                        color: "white",
                                                        width: "auto",
                                                        fontsize: "14px",
                                                        border: "0",
                                                        fontweight: "500",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        float: "right",
                                                    }}
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn  btn-outline-primary"
                                                    onClick={resetForm}
                                                    style={{
                                                        height: "36px",
                                                        background:
                                                            "transparent",
                                                        color: "#556cd6",
                                                        width: "auto",
                                                        fontsize: "14px",
                                                        border: "0",
                                                        fontweight: "500",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        float: "right",
                                                    }}
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {error && (
                                        <div
                                            className="alert alert-warning"
                                            role="alert"
                                            style={{ marginTop: "64px" }}
                                        >
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <Snackbar
                                    open={openSnackbar}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                >
                                    <Alert
                                        onClose={handleClose}
                                        severity="success"
                                        sx={{ width: "100%" }}
                                    >
                                        Added Successfully
                                    </Alert>
                                </Snackbar>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className="container py-5">
                                    <div className="todos">
                                        <h1 className="text-center mb-4">
                                            List of Food Truck Slots
                                        </h1>
                                        {errorMessage && (
                                            <div
                                                className="alert alert-warning"
                                                role="alert"
                                            >
                                                {errorMessage}
                                            </div>
                                        )}
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <th>Slot ID</th>
                                                    <th>Address</th>
                                                    <th>Price (in RM)</th>
                                                    <th>Slot Image</th>
                                                    <th>Slot Status</th>
                                                    <th>Delete</th>
                                                </tr>

                                                {dataState.length > 0 ? (
                                                    dataState.map((slot) => (
                                                        <tr key={slot.id}>
                                                            <td>
                                                                {slot.slotID}
                                                            </td>
                                                            <td>
                                                                {slot.address
                                                                    .slice(
                                                                        0,
                                                                        40
                                                                    )
                                                                    .concat(
                                                                        "..."
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {slot.price}
                                                            </td>
                                                            <td>
                                                                <img
                                                                    src={
                                                                        slot.slotImage
                                                                    }
                                                                    className="rounded mx-auto d-block"
                                                                    style={{
                                                                        maxWidth:
                                                                            "300px",
                                                                        minWidth:
                                                                            "150px",
                                                                    }}
                                                                ></img>
                                                            </td>
                                                            <td>
                                                                {
                                                                    slot.slotStatus
                                                                }
                                                            </td>
                                                            <td
                                                                style={{
                                                                    display:
                                                                        "flex",
                                                                    justifyContent:
                                                                        "center",
                                                                }}
                                                            >
                                                                <button
                                                                    style={{
                                                                        border: "none",
                                                                        borderRadius:
                                                                            "0px",
                                                                        outline:
                                                                            "transparent",
                                                                        background:
                                                                            "transparent",
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                    onClick={
                                                                        slot.user_id ===
                                                                        id
                                                                            ? deleteSlot
                                                                            : () => {
                                                                                  setErrorMessage(
                                                                                      "No access to the slot created by other admin"
                                                                                  );
                                                                                  console.log(
                                                                                      "No access to the slot created by other admin"
                                                                                  );
                                                                              }
                                                                    }
                                                                    data-key={
                                                                        slot.id
                                                                    }
                                                                >
                                                                    <DeleteIcon
                                                                        style={{
                                                                            fontSize:
                                                                                "20px",
                                                                            color: "darkred",
                                                                        }}
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <h2
                                                        style={{
                                                            margin: "auto",
                                                        }}
                                                    >
                                                        No slot is added yet!
                                                    </h2>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </TabPanel>
                        </Box>
                    </Box>
                </main>
            </div>
        </>
    );
};

function Locate({ panTo }) {
    return (
        <button
            type="button"
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
            style={{
                height: "32px",
                background: "transparent",
                color: "white",
                width: "30px",
                fontsize: "14px",
                border: "0",
                borderRadius: "2px",
                fontweight: "500",
                cursor: "pointer",
                marginBottom: "5px",
                outline: "transparent",
            }}
        >
            <FaLocationArrow color="#556cd6" size={"18px"} />
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
                    placeholder="Search your location here"
                    style={{
                        height: "32px",
                        width: "100%",
                        border: "1px solid #DCE0E6",
                        borderRadius: "2px",
                        padding: "0px 8px",
                        marginBottom: "5px",
                    }}
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}

export default AddSlot;
