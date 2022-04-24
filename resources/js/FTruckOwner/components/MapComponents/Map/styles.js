import { alpha, makeStyles } from "@material-ui/core/styles";
import { SlowMotionVideoOutlined } from "@material-ui/icons";
export default makeStyles((theme) => ({
    paper: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "180px",
    },
    mapContainer: {
        height: "85vh",
        width: "100%",
    },
    markerContainer: {
        position: "absolute",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        "&:hover": { zIndex: 2 },
    },
    pointer: {
        cursor: "pointer",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,

        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        marginRight: theme.spacing(0),
        marginLeft: "100%",
        marginBottom: theme.spacing(1),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
        borderStyle: "solid",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: { width: "20ch" },
    },
}));
