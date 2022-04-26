import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Drawer from "@material-ui/core/Drawer";
import Listing from "@material-ui/core/List";
import ViewListIcon from "@material-ui/icons/ViewList";
import MapIcon from "@material-ui/icons/Map";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Redirect } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import * as actions from "../store/actions";

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
        justifyContent: "space-between",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    listItem: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
}));

const FoodTruckOwnerHeader = (props) => {
    let history = useHistory();

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();
    const theme = useTheme();

    const handleLogout = (e) => {
        e.preventDefault();
        swal({
            text: "Are you sure to log out from your account?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((logout) => {
            if (logout) {
                props.dispatch(actions.authLogout());
                history.push("/home");
            }
        });
    };

    const handleRedirectToHome = (e) => {
        e.preventDefault();
        props.dispatch(actions.authLogout());
        history.push("/");
    };


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleHome() {
        history.push("/owner");
    }

    function handleViewing() {
        history.push("/viewFoodTruckSlot");
    }

    function handleStatus() {
        history.push("/reservationStatus");
    }

    return (
        // <header className="d-flex align-items-center justify-content-between">
        //     <h1 className="logo my-0 font-weight-normal h4">
        //         <Link
        //             to="/"
        //             style={{
        //                 textDecoration: "none",
        //             }}
        //         >
        //             F_Truck
        //         </Link>
        //     </h1>

        //     {props.isAuthenticated && (
        //         <div className="navigation d-flex justify-content-end">
        //             <Nav>
        //                 <NavItem>
        //                     <NavLink tag={Link} to="/owner">
        //                         Home
        //                     </NavLink>
        //                 </NavItem>
        //                 <NavItem>
        //                     <NavLink tag={Link} to="/viewFoodTruckSlot">
        //                         Booking/Reservation
        //                     </NavLink>
        //                 </NavItem>
        //                 <NavItem>
        //                     <NavLink tag={Link} to="reservationStatus">
        //                         View Reservation Status
        //                     </NavLink>
        //                 </NavItem>
        //                 <UncontrolledDropdown nav inNavbar>
        //                     <DropdownToggle nav caret>
        //                         Account
        //                     </DropdownToggle>
        //                     <DropdownMenu
        //                         right
        //                         style={{
        //                             outline: "transparent",
        //                         }}
        //                     >
        //                         <DropdownItem>Settings</DropdownItem>
        //                         <DropdownItem divider />
        //                         <DropdownItem onClick={handleLogout}>
        //                             <Link tag={Link} to="/home">
        //                                 Log Out
        //                             </Link>
        //                         </DropdownItem>
        //                     </DropdownMenu>
        //                 </UncontrolledDropdown>
        //             </Nav>
        //         </div>
        //     )}
        // </header>

        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                    style={{ background: "#35353f" }}
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

                        <Link
                            to="/"
                            style={{
                                color: "white",
                                fontSize: "medium",
                                textDecoration: "none",
                            }}
                            onClick={handleRedirectToHome}
                        >
                            F_Truck
                        </Link>
                    </Toolbar>
                </AppBar>
                {props.isAuthenticated && (
                    <Drawer
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

                        <Listing>
                            <ListItem
                                disablePadding
                                button
                                className={classes.listItem}
                                onClick={handleHome}
                            >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>

                                <ListItemText primary={"Home"} />
                            </ListItem>
                            <ListItem
                                disablePadding
                                button
                                className={classes.listItem}
                                onClick={handleViewing}
                            >
                                <ListItemIcon>
                                    <MapIcon />
                                </ListItemIcon>

                                <ListItemText primary={"Slot Reservation"} />
                            </ListItem>
                            <ListItem
                                disablePadding
                                button
                                className={classes.listItem}
                                onClick={handleStatus}
                            >
                                <ListItemIcon>
                                    <ViewListIcon />
                                </ListItemIcon>

                                <ListItemText primary={"Reservation Lists"} />
                            </ListItem>
                            <ListItem
                                disablePadding
                                button
                                className={classes.listItem}
                                onClick={handleLogout}
                            >
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>

                                <ListItemText primary={"Log Out"} />
                            </ListItem>
                        </Listing>
                    </Drawer>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(FoodTruckOwnerHeader);
