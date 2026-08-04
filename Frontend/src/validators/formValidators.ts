import { emailField, nameField, passwordField, phoneField } from "../constants/const";
import type { UserFormData } from "../datatypes/datatypes";

export const formValidate = (name: string, value: string, data: UserFormData) => {

    switch (name) {

        case 'fullName':
            if (!value || value.trim() === "") {
                return "Full name is required.";
            }
            if (!nameField.test(value)) {
                return "Please enter valid full name. Only spaces or characters are allowed.";
            }
            if (value.length < 3) {
                return "The length of fullname should be equal or greater than 3.";
            }
            return "";

        case 'email':
            if (!value || value.trim() === "") {
                return "Email is required.";
            }
            if (!emailField.test(value)) {
                return "Please enter valid email address.";
            }
            return "";

        case 'password':
            if (!value || value.trim() === "") {
                return "Password is required.";
            }
            if (!passwordField.test(value)) {
                return "Password should contain atleast one lowercase, uppercase, digit and special character.";
            }
            return "";

        case 'confirmPassword':
            if (!value || value.trim() === "") {
                return "Confirm password is required.";
            }
            if (!passwordField.test(value)) {
                return "Password should contain atleast one lowercase, uppercase, digit and special character.";
            }
            if (data.password !== value) {
                return "Password does not match.";
            }

            return "";

        case 'phone':
            if (!value || value.trim() === "") {
                return "Phone number is required.";
            }
            if (!phoneField.test(value)) {
                return "Please enter valid phone number.";
            }
            return "";

        case 'age':
            if (!value) {
                return "Age is required.";
            }
            if (Number(value) < 0) {
                return "Age can not be negative.";
            }
            return "";

        case 'gender':
            if (!value) {
                return "Gender is required.";
            }
            return "";

        default:
            return ""
    }
}