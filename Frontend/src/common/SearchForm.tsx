import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    TextField,
} from "@mui/material";
import type { SearchTypeProps } from "../datatypes/datatypes";
import { searchOptions } from "../constants/const";

const SearchForm = ({
    searchValue,
    setSearchValue,
    searchBy,
    handleSearchByChange,
    handleSearch,
}: SearchTypeProps) => {

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1.4,
                alignItems: "center",
            }}
        >
            {searchBy === "status" ? (
                <FormControl sx={{ width: 220 }}>
                    <InputLabel>Select Status</InputLabel>

                    <Select
                        value={searchValue}
                        label="Select Status"
                        onChange={(e) => setSearchValue(e.target.value)}
                        size="small"
                        color="success"
                    >
                        <MenuItem value="">Select Status</MenuItem>

                        {searchOptions.status.map((item) => (
                            <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <TextField
                    sx={{ width: 220 }}
                    size="small"
                    label="Seat Number"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            )}

            <FormControl sx={{ width: 220 }}>
                <InputLabel>Search By</InputLabel>

                <Select
                    value={searchBy}
                    label="Search By"
                    onChange={handleSearchByChange}
                    size="small"
                    color="success"
                >
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="seatNumber">Seat Number</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                    backgroundColor: "#314B5A",
                    color: "white",
                }}
            >
                Search
            </Button>
        </Box>
    );
};
export default SearchForm;