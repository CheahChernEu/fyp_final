import React, { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { Link } from "react-router-dom";
import Http from "../Http";
import swal from "sweetalert";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const ViewReservation = () => {
    const api = "/api/v1/checkout";
    const slotApi = "/api/v1/slot";
    const [slot, setSlot] = useState({});
    const [dataState, setData] = useState([]);
    const [error, setError] = useState(false);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                        Http.patch(`${api}/${data[0].slotID}`, reservationStatus)
                            .then((response) => {
                                console.log("reservation status");
                                console.log(response);
                                Http.patch(`${slotApi}/${data[0].slotID}`, slotStatus)
                                    .then((response) => {
                                        console.log("slot status");
                                        console.log(response);
                                        swal("Status Updated!", {
                                            icon: "success",
                                    })
                                    .catch(() => {
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
                        })
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
            if(willUpdateApprove){
                Http.get(`${api}/${checkout.slotID}`)
                    .then((response) => {
                        const { data } = response.data;
                        setSlot(data[0]);
                        console.log("data:");
                        console.log(data[0]);
                        Http.patch(`${api}/${data[0].slotID}`, reservationStatus)
                            .then((response) => {
                                console.log("reservation status");
                                console.log(response);
                                Http.patch(`${slotApi}/${data[0].slotID}`, slotStatus)
                                    .then((response) => {
                                        console.log("slot status");
                                        console.log(response);
                                        swal("Status Updated!", {
                                            icon: "success",
                                })
                                .catch(() => {
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
                        })
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

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
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
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <Link tag={Link} to="/admin" style={{textDecoration: 'none', color: '#757575'}}>
                            <ListItem disablePadding>
                                <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                >
                                <ListItemIcon                                 
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    }}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link tag={Link} to="/add-slot" style={{textDecoration: 'none', color: '#757575'}}>
                            <ListItem disablePadding>
                                <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                                <ListItemIcon                                 
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    }}>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add New Slot" sx={{ opacity: open ? 1 : 0 }}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link tag={Link} to="/view-reservation" style={{textDecoration: 'none', color: '#757575'}}>
                            <ListItem disablePadding>
                                <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                >
                                <ListItemIcon                                 
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    }}>
                                    <TableRowsIcon />
                                </ListItemIcon>
                                <ListItemText primary="View Reservation" sx={{ opacity: open ? 1 : 0 }}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link tag={Link} to="/home" style={{textDecoration: 'none', color: '#757575'}}>
                            <ListItem disablePadding>
                                <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                                >
                                <ListItemIcon                                 
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    }}>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" sx={{ opacity: open ? 1 : 0 }}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{marginTop: "50px"}}>
                    <div className="container py-5">
                        <div className="todos">
                            <h1 className="text-center mb-4">
                                List of Reservations
                            </h1>
                            <table className="table table-striped" style={{minHeight:"200px"}}>
                                <tbody>
                                    <tr>
                                        <th>Slot No</th>
                                        <th>Address</th>
                                        <th>Price</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Payment Status</th>
                                        <th>Reservation Status</th>
                                        <th>Approve</th>
                                        <th>Reject</th>
                                    </tr>
                                    {dataState.length > 0 ? (
                                        dataState.map((checkout) => (
                                            <tr key={checkout.id}>
                                                <td>{checkout.slotID}</td>
                                                <td>
                                                    {checkout.address
                                                        .slice(0, 30)
                                                        .concat("...")}
                                                </td>
                                                <td>{checkout.price}</td>
                                                <td>{checkout.startDate}</td>
                                                <td>{checkout.endDate}</td>
                                                <td>
                                                    {checkout.paymentStatus}
                                                </td>
                                                <td>
                                                    {checkout.reservationStatus}
                                                </td>

                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            approveStatusUpdate(
                                                                checkout
                                                            );
                                                        }}
                                                        disabled={
                                                            checkout.reservationStatus === "Confirmed"
                                                        }
                                                        style={{
                                                            border: "none",
                                                            borderRadius: "0px",
                                                            outline: "transparent",
                                                            background: "transparent",
                                                        }}
                                                    >
                                                        <ThumbUpIcon />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            rejectStatusUpdate(
                                                                checkout
                                                            );
                                                        }}
                                                        disabled={
                                                            checkout.reservationStatus === "Rejected"
                                                        }
                                                        style={{
                                                            border: "none",
                                                            borderRadius: "0px",
                                                            outline: "transparent",
                                                            background: "transparent",
                                                        }}
                                                    >
                                                        <ThumbDownIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <h3 style={{ margin: "auto" }}>
                                            No reservation is made yet!
                                        </h3>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default ViewReservation;
