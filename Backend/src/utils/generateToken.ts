import { UserType } from "../datatypes/datatypes";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const MY_SECRET_KEY=process.env.MY_SECRET_KEY;

export const generateToken=(userData:UserType)=>{
    const token=jwt.sign(
        {
            id:userData.id,
            email:userData.email,
            fullName:userData.fullName,
            role:userData.role
        },
        MY_SECRET_KEY as string,
        {
            expiresIn:'7d'
        }
    );

    return token;
}