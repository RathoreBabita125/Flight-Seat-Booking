import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import type { BookingFilter, GetAllUsersResponse, User } from "../../datatypes/datatypes";
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from "../../query/user";
import LoadingCompo from "../../common/Loading";
import { userColumnOptions, userFilterField } from "../../constants/const";
import FilterModal from "../filter/FilterModal";

const UserManagement = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [filter, setFilter] = useState<BookingFilter>({
        fullName: "",
        gender: ""
    });
    const { data, loading } = useQuery<GetAllUsersResponse>(GET_USERS, {
        variables: {
            filter: {
                fullName: filter.fullName,
                gender: filter.gender,
            },
        },
        fetchPolicy: "network-only",
    });

    if (loading) return <LoadingCompo />

    return (
        <>
            <Box sx={{ mt: 15, padding: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "stretch", sm: "center" },
                        gap: 1.5,
                        mb: 2.5,
                        marginTop: 5,
                    }}
                >
                    <Typography variant="h5" sx={{ color: "#314B5A", fontWeight: 600 }}>
                        All Passenger Details
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            sx={{ color: '#314B5A' }}
                            onClick={() => setOpenFilter(true)}
                        >
                            Filter
                        </Button>
                    </Box>
                </Box>
                <TableContainer
                    sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: 2,
                        width: "100%",
                        overflowX: "auto",
                    }}
                >
                    <Table sx={{ backgroundColor: "#ffffff", width: "100%", minWidth: 1200, tableLayout: "fixed" }}>
                        <TableHead sx={{ backgroundColor: "#314B5A", color: 'white', padding: 10 }}>
                            <TableRow sx={{ color: 'white' }}>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>S.No.</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Passenger Name</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Email</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Gender</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Age</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Phone</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Role</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontSize: 18, border: '2px solid white' }}>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: "#ffffff" }}>
                            {
                                data?.getAllUsers?.map((user: User, index: number) => {
                                    if (user.role === "Passenger") return (
                                        <TableRow
                                            hover
                                            key={user.id}
                                            sx={{ backgroundColor: "#ffffff", "&:last-child td": { borderBottom: "none" }, border: '1px solid #314B5A' }}
                                        >
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{index + 1}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{user.fullName}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{user.email}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{user.gender}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{user.age}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{user.phone}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}>{user.role}</TableCell>
                                            <TableCell align="center" sx={{ border: '1px solid #314B5A' }}> {user.createdAt
                                                ? new Date(Number(user.createdAt)).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                }) : "-"}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <FilterModal
                    open={openFilter}
                    onClose={() => setOpenFilter(false)}
                    setOpenFilter={setOpenFilter}
                    setFilter={setFilter}
                    filter={filter}
                    filterField={userFilterField}
                    columnOptions={userColumnOptions}
                />
            </Box>
        </>
    )
}
export default UserManagement