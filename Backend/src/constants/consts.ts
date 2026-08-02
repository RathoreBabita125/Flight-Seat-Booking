// regex for checking valid user inputs
export const nameField = /^[A-Za-z ]*$/;
export const emailField = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordField = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
export const phoneField = /^[6-9]\d{9}$/;

// user input field
export const userInputFields=["fullName", "email", "password", "age", "gender", "phone"];

//seat data
export const seats=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const totalSeatsRow=10;