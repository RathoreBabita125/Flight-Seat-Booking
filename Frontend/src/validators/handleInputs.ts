import type { FormData, FormError } from "../datatypes/datatypes";
import { formValidate } from "./formValidators";

export const handleInput=(
    event: React.ChangeEvent<HTMLInputElement>, 
    data:FormData,
    setData:React.Dispatch<React.SetStateAction<FormData>>,
    error:FormError,
    setError:React.Dispatch<React.SetStateAction<FormError>>
)=>
{
    const name = event.target.name as keyof FormData;
    const value=event.target.value;
    const newUser={...data, [name]:value};
    setData(newUser);

    if(error[name]!==''){
        const newError=formValidate(name, value, newUser);
        setError((pre)=>({...pre, [name]:newError}));
    }
}