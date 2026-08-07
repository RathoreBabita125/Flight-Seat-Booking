import type { SearchOptions } from "../datatypes/datatypes";

export const nameField = /^[A-Za-z ]*$/;
export const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneField = /^[6-9]\d{9}$/;

export const genders = ["Male", "Female", "Other"];
export const bookingStatus = ["Confirmed", "Cancelled"];
export const seatStatus = ["Available", "Booked"];

export const userFilterField = ["fullName", "gender"];
export const bookingFilterField = ["fullName", "gender", "seatNumber", "status"];
export const myBookingFilterField = ["seatNumber", "status"];

export const userColumnOptions = [
    { label: "Passenger Name", value: "fullName" },
    { label: "Gender", value: "gender" },
];

export const myBookingColumnOptions = [
    { label: "Seat Number", value: "seatNumber" },
    { label: "Status", value: "status" },
];

export const bookingColumnOptions = [
    { label: "Passenger Name", value: "fullName" },
    { label: "Gender", value: "gender" },
    { label: "Seat Number", value: "seatNumber" },
    { label: "Status", value: "status" },
];

export const searchOptions:SearchOptions = {
    status: [
        "Booked",
        "Available",
    ],
};
