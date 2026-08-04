import type { FormData, FormError } from "../datatypes/datatypes";
import { formValidate } from "./formValidators";

export const handleOnBlurInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: FormData,
    error: FormError,
    setError: React.Dispatch<React.SetStateAction<FormError>>
) => {
    const name = event.target.name as keyof FormData;
    const value = event.target.value;

    const newUser = { ...data, [name]: value };
    const newError = formValidate(name, value, newUser);
    setError((pre) => ({
        ...pre,
        [name]: newError
    }));


};