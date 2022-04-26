import React from "react";
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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

const AdminDashboard = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    //   const handleDrawerOpen = () => {
    //       setOpen(true);
    //   };

    //   const handleDrawerClose = () => {
    //       setOpen(false);
    //   };
    const session = JSON.parse(window.localStorage.getItem("user"));

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
        },

        content: {
            flexGrow: 1,
            padding: theme.spacing(3, 0),
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
                        {/* <AppBar position="fixed" open={open}>
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
          </Drawer> */}

                        <Box
                            component="main"
                            sx={{ flexGrow: 1, p: 3 }}
                            style={{ marginTop: "50px" }}
                        >
                            <section className="hero-section">
                                <p>Welcome </p>
                                <h1>Admin {session.licenseNo}</h1>
                            </section>
                        </Box>
                    </Box>
                </main>
            </div>
        </>
    );
};
export default AdminDashboard;
