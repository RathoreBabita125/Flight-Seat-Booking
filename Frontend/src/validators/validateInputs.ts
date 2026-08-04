import type { UserFormData, FormError } from "../datatypes/datatypes";
import { formValidate } from "./formValidators";

export const validateInput = (
    data: UserFormData,
    setError: React.Dispatch<React.SetStateAction<FormError>>,
    inputFields: (keyof UserFormData)[]
) => {

    const newErrors: FormError = {};
    let isValid = true;

    inputFields.forEach((field) => {
        
        const value = data[field] ?? "";
        const errorMsg = formValidate(field, value, data);
        newErrors[field] = errorMsg;

        if (errorMsg !== "") {
            isValid = false;
        }

    });
    setError(newErrors);
    return isValid;
};