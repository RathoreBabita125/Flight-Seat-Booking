import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { DecodedToken } from '../datatypes/datatypes';
import { Request } from 'express'; 

dotenv.config();
export const AuthMiddleware = (req: Request): DecodedToken | null => {
    
    const token = req.cookies?.token;
    if (!token) return null;

    try {
        const decoded = jwt.verify(
            token,
            process.env.MY_SECRET_KEY as string
        ) as DecodedToken;

        console.log("In middleware", decoded);

        return decoded;

    } catch (error) {
        return null;
    }
}