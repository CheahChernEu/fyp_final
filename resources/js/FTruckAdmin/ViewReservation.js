import React, { useState, useEffect } from "react";
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import Http from "../Http";
import swal from "sweetalert";
import AdminHeader from "../../js/components/AdminHeader";

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

const ViewReservation = () => {
    const api = "/api/v1/checkout";
    const slotApi = "/api/v1/slot";
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [slot, setSlot] = useState({});
    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    useEffect(() => {
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

    const rejectStatusUpdate = (checkout) => {
        const slotStatus = {
            slotStatus: "Available",
        };
        const reservationStatus = {
            reservationStatus: "Rejected",
        };
        swal({
            ID: "Are you sure?",
            text: "The reservation will be rejected and the slot will be available to public!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willUpdateReject) => {
            if (willUpdateReject) {
                Http.get(`${api}/${checkout.slotID}`)
                    .then((response) => {
                        const { data } = response.data;
                        setSlot(data[0]);
                        console.log("data:");
                        console.log(data[0]);
                        Http.patch(
                            `${api}/${data[0].slotID}`,
                            reservationStatus
                        ).then((response) => {
                            console.log("reservation status");
                            console.log(response);
                            Http.patch(
                                `${slotApi}/${data[0].slotID}`,
                                slotStatus
                            )
                                .then((response) => {
                                    console.log("slot status");
                                    console.log(response);
                                    swal("Status Updated!", {
                                        icon: "success",
                                    }).catch(() => {
                                        setError(
                                            "Sorry, there was an error updating your reservation."
                                        );
                                    });
                                })
                                .catch(() => {
                                    setError(
                                        "Sorry, there was an error updating your reservation."
                                    );
                                });
                        });
                    })
                    .catch((err) => {
                        console.log("Failed to retrieve data");
                        console.log(err);
                        swal(
                            "Unable to Update!",
                            "There was an error processing.",
                            { icon: "warning" }
                        );
                    });
            }
        });
    };

    const approveStatusUpdate = (checkout) => {
        const slotStatus = {
            slotStatus: "Unavailable",
        };

        const reservationStatus = {
            reservationStatus: "Confirmed",
        };
        swal({
            ID: "Are you sure?",
            text: "The reservation will be approved and the slot will be not available to public!",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((willUpdateApprove) => {
            if (willUpdateApprove) {
                Http.get(`${api}/${checkout.slotID}`)
                    .then((response) => {
                        const { data } = response.data;
                        setSlot(data[0]);
                        console.log("data:");
                        console.log(data[0]);
                        Http.patch(
                            `${api}/${data[0].slotID}`,
                            reservationStatus
                        ).then((response) => {
                            console.log("reservation status");
                            console.log(response);
                            Http.patch(
                                `${slotApi}/${data[0].slotID}`,
                                slotStatus
                            )
                                .then((response) => {
                                    console.log("slot status");
                                    console.log(response);
                                    swal("Status Updated!", {
                                        icon: "success",
                                    }).catch(() => {
                                        setError(
                                            "Sorry, there was an error updating your reservation."
                                        );
                                    });
                                })
                                .catch(() => {
                                    setError(
                                        "Sorry, there was an error updating your reservation."
                                    );
                                });
                        });
                    })
                    .catch((err) => {
                        console.log("Failed to retrieve data");
                        console.log(err);
                        swal(
                            "Unable to Update!",
                            "There was an error processing.",
                            { icon: "warning" }
                        );
                    });
            }
        });
    };

    // const deleteReservation = (e) => {
    //     const { key } = e.target.dataset;
    //     swal({
    //         slotID: "Are you sure?",
    //         text: "Once deleted, you will not be able to recover this reservation!",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //     }).then((willDelete) => {
    //         if (willDelete) {
    //             Http.delete(`${api}/${key}`)
    //                 .then((response) => {
    //                     console.log(key);
    //                     console.log(response);
    //                     if (response.status === 204) {
    //                         const updateState = dataState.filter(
    //                             (checkout) => checkout.id !== key
    //                         );
    //                         setError(false);
    //                         setData(updateState);
    //                         console.log("Reservation:", updateState);
    //                         swal("The reservation has been deleted!", {
    //                             icon: "success",
    //                         });
    //                     } else {
    //                         swal(
    //                             "Unable to Delete!",
    //                             "There was an error processing. 1",
    //                             { icon: "warning" }
    //                         );
    //                     }
    //                 })
    //                 .catch((errorResponse) => {
    //                     console.log(errorResponse);
    //                     console.log(errorResponse);
    //                     setError("There was an error processing.");
    //                     swal(
    //                         "Unable to Delete!",
    //                         "There was an error processing. 2",
    //                         { icon: "warning" }
    //                     );
    //                 });
    //         }
    //     });
    // };

    const columns = [
        { id: "slotID", label: "Slot ID", minWidth: 100 },
        {
            id: "address",
            label: "Address",
            minWidth: 130,
            format: (value) => value.slice(0, 60).concat("..."),
        },
        {
            id: "price",
            label: "Price",
            minWidth: 100,
            align: "center",
        },
        {
            id: "startDate",
            label: "Start Date",
            minWidth: 100,
            align: "center",
        },
        {
            id: "endDate",
            label: "End Date",
            minWidth: 100,
            align: "center",
        },
        {
            id: "reservationStatus",
            label: "Reservation Status",
            minWidth: 140,
            align: "center",
        },
        {
            id: "paymentStatus",
            label: "Payment Status",
            minWidth: 120,
            align: "center",
        },
        {
            id: "approve",
            label: "Approve",
            minWidth: 120,
            align: "center",
        },
        {
            id: "reject",
            label: "Reject",
            minWidth: 120,
            align: "center",
        },
    ];

    const rows = dataState;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
        },

        content: {
            flexGrow: 1,
            padding: theme.spacing(3, 3),
        },
    }));
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <AdminHeader />
                <CssBaseline />
                <main className={classes.content}>
                    <Box sx={{ display: "flex" }}>
                        <CssBaseline />
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
                            <main className={classes.content}>
                                <div className="col">
                                    <div className="todos">
                                        <h1 className="text-center mb-4">
                                            List of Reservation
                                        </h1>
                                        <Paper className={classes.root}>
                                            <TableContainer
                                                className={classes.container}
                                            >
                                                <Table
                                                    stickyHeader
                                                    aria-label="sticky table"
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            {columns.map(
                                                                (column) => (
                                                                    <TableCell
                                                                        key={
                                                                            column.id
                                                                        }
                                                                        align={
                                                                            column.align
                                                                        }
                                                                        style={{
                                                                            minWidth:
                                                                                column.minWidth,
                                                                        }}
                                                                    >
                                                                        {
                                                                            column.label
                                                                        }
                                                                    </TableCell>
                                                                )
                                                            )}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {rows
                                                            .slice(
                                                                page *
                                                                    rowsPerPage,
                                                                page *
                                                                    rowsPerPage +
                                                                    rowsPerPage
                                                            )
                                                            .map((row) => {
                                                                return (
                                                                    <TableRow
                                                                        hover
                                                                        role="checkbox"
                                                                        tabIndex={
                                                                            -1
                                                                        }
                                                                        key={
                                                                            row.id
                                                                        }
                                                                    >
                                                                        {columns.map(
                                                                            (
                                                                                column
                                                                            ) => {
                                                                                const value =
                                                                                    row[
                                                                                        column
                                                                                            .id
                                                                                    ];
                                                                                return (
                                                                                    <TableCell
                                                                                        key={
                                                                                            column.id
                                                                                        }
                                                                                        align={
                                                                                            column.align
                                                                                        }
                                                                                    >
                                                                                        {column.format
                                                                                            ? column.format(
                                                                                                  value
                                                                                              )
                                                                                            : value}

                                                                                        {column.id ===
                                                                                        "approve" ? (
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    approveStatusUpdate(
                                                                                                        row
                                                                                                    );
                                                                                                }}
                                                                                                disabled={
                                                                                                    row.reservationStatus ===
                                                                                                    "Confirmed"
                                                                                                }
                                                                                                style={{
                                                                                                    border: "none",
                                                                                                    borderRadius:
                                                                                                        "0px",
                                                                                                    outline:
                                                                                                        "transparent",
                                                                                                    background:
                                                                                                        "transparent",
                                                                                                }}
                                                                                            >
                                                                                                <ThumbUpIcon />
                                                                                            </button>
                                                                                        ) : column.id ===
                                                                                          "reject" ? (
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    rejectStatusUpdate(
                                                                                                        row
                                                                                                    );
                                                                                                }}
                                                                                                disabled={
                                                                                                    row.reservationStatus ===
                                                                                                    "Rejected"
                                                                                                }
                                                                                                style={{
                                                                                                    border: "none",
                                                                                                    borderRadius:
                                                                                                        "0px",
                                                                                                    outline:
                                                                                                        "transparent",
                                                                                                    background:
                                                                                                        "transparent",
                                                                                                }}
                                                                                            >
                                                                                                <ThumbDownIcon />
                                                                                            </button>
                                                                                        ) : (
                                                                                            <h6></h6>
                                                                                        )}
                                                                                    </TableCell>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </TableRow>
                                                                );
                                                            })}
                                                    </TableBody>
                                                </Table>
                                                <TablePagination
                                                    rowsPerPageOptions={[
                                                        10, 25, 100,
                                                    ]}
                                                    component="div"
                                                    count={rows.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    onPageChange={
                                                        handleChangePage
                                                    }
                                                    onRowsPerPageChange={
                                                        handleChangeRowsPerPage
                                                    }
                                                />
                                            </TableContainer>
                                        </Paper>
                                    </div>
                                </div>
                            </main>
                        </Box>
                    </Box>
                </main>
            </div>
        </>
    );
};

export default ViewReservation;
