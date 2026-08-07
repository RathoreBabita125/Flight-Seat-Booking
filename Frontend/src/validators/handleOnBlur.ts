import type { UserFormData, FormError } from "../datatypes/datatypes";
import { formValidate } from "./formValidators";

export const handleOnBlurInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    data: UserFormData,
    setError: React.Dispatch<React.SetStateAction<FormError>>
) => {
    const name = event.target.name as keyof FormData & string;
    const value = event.target.value;

    const newUser = { ...data, [name]: value };
    const newError = formValidate(name, value, newUser);
    setError((pre) => ({
        ...pre,
        [name]: newError
    }));
};