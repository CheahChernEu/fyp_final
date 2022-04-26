// import React, { useState, useEffect } from "react";
// import OwnerHeader from "../../components/FoodTruckOwnerHeader";
// import Http from "../../Http";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";

// const Reservation = () => {
//     const api = "/api/v1/checkout";

//     const [dataState, setData] = useState([]);

//     const session = JSON.parse(window.localStorage.getItem("user"));

//     useEffect(() => {
//         Http.get(`${api}/${session.id}`)
//             .then((response) => {
//                 const { data } = response.data;
//                 console.log("reservation lists");
//                 console.log(response.data);
//                 setData(data);
//             })
//             .catch((err) => {
//                 console.log("Failed to retrieve data");
//             });
//     }, []);

//     const useStyles = makeStyles((theme) => ({
//         root: {
//             display: "flex",
//         },

//         content: {
//             flexGrow: 12,
//             padding: theme.spacing(12),
//         },
//     }));
//     const classes = useStyles();

//     return (
//         <>
//             <div className={classes.root}>
//                 <OwnerHeader />
//                 <CssBaseline />
//                 <main className={classes.content}>
//                     <div className="col">
//                         <div className="todos">
//                             <h1 className="text-center mb-4">
//                                 List of Reservation Details
//                             </h1>
//                             <table className="table table-striped">
//                                 <tbody>
//                                     <tr>
//                                         <th>Slot ID</th>
//                                         <th>Address</th>
//                                         <th>Price (in RM)</th>
//                                         <th>Start Date</th>
//                                         <th>End Date</th>
//                                         <th>Reservation Status</th>
//                                         <th>Payment Status</th>
//                                     </tr>

//                                     {dataState.length > 0 ? (
//                                         dataState.map((slot) => (
//                                             <tr key={slot.id}>
//                                                 <td>{slot.slotID}</td>
//                                                 <td>
//                                                     {slot.address
//                                                         .slice(0, 30)
//                                                         .concat("...")}
//                                                 </td>
//                                                 <td>{slot.price}</td>
//                                                 <td>{slot.startDate}</td>
//                                                 <td>{slot.endDate}</td>
//                                                 <td>
//                                                     {slot.reservationStatus}
//                                                 </td>
//                                                 <td>{slot.paymentStatus}</td>
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <h2 style={{ margin: "auto" }}>
//                                             No reservation is made yet!
//                                         </h2>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </>
//     );
// };

// export default Reservation;

import React, { useState, useEffect } from "react";
import OwnerHeader from "../../components/FoodTruckOwnerHeader";
import Http from "../../Http";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const Reservation = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [dataState, setData] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const api = "/api/v1/checkout";

    const session = JSON.parse(window.localStorage.getItem("user"));

    useEffect(() => {
        Http.get(`${api}/${session.id}`)
            .then((response) => {
                const { data } = response.data;
                console.log("reservation lists");
                console.log(response.data);
                setData(data);
            })
            .catch((err) => {
                console.log("Failed to retrieve data");
            });
    }, []);

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
        },

        content: {
            flexGrow: 1,
            padding: theme.spacing(12),
        },
        container: {
            maxHeight: 650,
        },
    }));
    const classes = useStyles();

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
    ];

    // function createData(dataState) {
    //     if(dataState.length>0){
    //         dataState.map((slot) => (retrun rows.add()
    //                                                     ))
    //     }
    //     return { name, code, population, size, density };
    // }

    const rows = dataState;

    return (
        <>
            <div className={classes.root}>
                <OwnerHeader />
                <CssBaseline />
                <main className={classes.content}>
                    <div className="col">
                        <div className="todos">
                            <h1 className="text-center mb-4">
                                List of Reservation Details
                            </h1>
                            <Paper className={classes.root}>
                                <TableContainer className={classes.container}>
                                    <Table
                                        stickyHeader
                                        aria-label="sticky table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth:
                                                                column.minWidth,
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows
                                                .slice(
                                                    page * rowsPerPage,
                                                    page * rowsPerPage +
                                                        rowsPerPage
                                                )
                                                .map((row) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row.id}
                                                        >
                                                            {columns.map(
                                                                (column) => {
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
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                    />
                                </TableContainer>
                            </Paper>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Reservation;
