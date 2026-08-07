import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from "react";
import type { BookingFilter, FilterModalProps } from "../../datatypes/datatypes";
import { bookingStatus, genders, seatStatus } from "../../constants/const";

const FilterModal = ({ open, onClose, setOpenFilter, setFilter, columnOptions, filterField, filter }: FilterModalProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [column, setColumn] = useState<keyof BookingFilter | "">("");

    useEffect(() => {
        if (open && filter) {
            const activeField = filterField.find((field) => Boolean(filter[field]));
            if (activeField) {
                setColumn(activeField);
                setInputValue(filter[activeField] ?? "");
            } else {
                setColumn("");
                setInputValue("");
            }
        }
    }, [open, filter, filterField]);

    const handleApply = () => {
        
        if (!column) return;

        const resetInputField: BookingFilter = {};

        filterField.forEach((field: keyof BookingFilter) => {
            resetInputField[field] = undefined;
        });
        const updatedFilter = {
            ...resetInputField,
            [column]: inputValue,
        };
        setFilter(updatedFilter);
        setOpenFilter(false);
    };

    const handleReset = () => {
        setColumn("");
        setInputValue("");
        const resetInputField: BookingFilter = {};
        filterField.forEach((field: keyof BookingFilter) => {
            resetInputField[field] = "";
        });
        setFilter(resetInputField);
    };

    const renderValueInput = () => {
        if (column === "status") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Status</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Status"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Status</MenuItem>
                        {bookingStatus.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "seatStatus") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Seat Status</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Seat Status"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Seat Status</MenuItem>
                        {seatStatus.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        if (column === "gender") {
            return (
                <FormControl fullWidth margin="normal">
                    <InputLabel color="success">Select Gender</InputLabel>
                    <Select
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        label="Select Gender"
                        color="success"
                    >
                        <MenuItem value="" disabled>Select Gender</MenuItem>
                        {genders.map((opt) => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        }
        return (
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                label="Enter filter value"
                fullWidth
                margin="normal"
                color="success"
                disabled={!column}
            />
        );
    };
    return (
        <Dialog
            open={open}
            onClose={(_, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    return;
                }
                onClose();
            }}
            fullWidth
            maxWidth="sm"
        >
            <Box sx={{ padding: 1 }}>
                <Box sx={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", color: "#053348"
                }}>
                    <DialogTitle sx={{ fontWeight: "bold", fontSize: "25px", color: '#314B5A' }}>Filter</DialogTitle>
                    <ClearIcon sx={{ marginRight: 3, cursor: "pointer" }}
                        onClick={() => setOpenFilter(false)} />
                </Box>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel color="success">Select Column</InputLabel>
                        <Select
                            value={column}
                            onChange={(e) => { setColumn(e.target.value); setInputValue(""); }}
                            label="Select Column"
                            color="success"
                        >
                            <MenuItem value="" disabled>Select Column</MenuItem>
                            {columnOptions?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {renderValueInput()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset} variant="outlined" sx={{ color: '#314B5A' }}>Reset Filter</Button>
                    <Button onClick={handleApply} sx={{ backgroundColor: '#314B5A', color: 'white' }}>Apply Filter</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
export default FilterModal;