import { emailField, nameField, passwordField, phoneField } from "../constants/consts";
import { UserDeatils } from "../datatypes/datatypes";

export const validateUser = (userData: UserDeatils, userInputFields: string[]) => {

    const { fullName, email, password, oldPassword, newPassword, confirmPassword, gender, age, phone } = userData;

    if (userInputFields.includes("fullName")) {
        if (!fullName || fullName.trim() === "") {
            throw new Error("fullName is required.");
        }
        if (!nameField.test(fullName)) {
            throw new Error("Only spaces and characters are allowed.");
        }
    }
    if (userInputFields.includes("email")) {
        if (!email || email.trim() === "") {
            throw new Error("Email is required.");
        }
        if (!emailField.test(email)) {
            throw new Error("Enter valid email address.");
        }
    }
    if (userInputFields.includes("password")) {
        if (!password || password.trim() === "") {
            throw new Error("Password is required.");
        }
        if (!passwordField.test(password)) {
            throw new Error("Password should contain atleast one lower, one upper, one special characters. Password length should be equal or greater than 8");
        }
    }
    if (userInputFields.includes("newPassword")) {
        if (!newPassword || newPassword.trim() === "") {
            throw new Error("New password is required.");
        }
        if (!passwordField.test(newPassword)) {
            throw new Error("Password should contain atleast one lower, one upper, one special characters. Password length should be equal or greater than 8");
        }
    }
    if (userInputFields.includes("newPassword") && userInputFields.includes("confirmPassword")) {
        if (newPassword!==confirmPassword) {
            throw new Error("password does not match.");
        }
    }
    if (userInputFields.includes("gender")) {
        if (!gender || gender.trim() === "") {
            throw new Error("Gender is required.");
        }
    }
    if (userInputFields.includes("age")) {
        if (!age) {
            throw new Error("Age is required.");
        }
    }
    if (userInputFields.includes("phone")) {
        if (!phone || phone.trim() === "") {
            throw new Error("Phone is required.");
        }
        if (!phoneField.test(phone)) {
            throw new Error("Enter valid phone number.");
        }
    }
}