import type { UserFormData, FormError } from "../datatypes/datatypes";
import { formValidate } from "./formValidators";

export const handleInput=(
    event: React.ChangeEvent<HTMLInputElement>, 
    data:UserFormData,
    setData:React.Dispatch<React.SetStateAction<UserFormData>>,
    error:FormError,
    setError:React.Dispatch<React.SetStateAction<FormError>>
)=>
{
    const name = event.target.name as keyof UserFormData;
    const value=event.target.value;
    const newUser={...data, [name]:value};
    setData(newUser);

    if(error[name]!==''){
        const newError=formValidate(name, value, newUser);
        setError((pre)=>({...pre, [name]:newError}));
    }
}