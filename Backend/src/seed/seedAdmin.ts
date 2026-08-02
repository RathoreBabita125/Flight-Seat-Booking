import { AppDataSource } from "../config/db"
import { User } from "../modules/userModule";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { GenderType, UserRole } from "../datatypes/datatypes";

dotenv.config();
export const seedAdmin=async()=>{
    const userRepo=AppDataSource.getRepository(User);
    const admin_email=process.env.ADMIN_EMAIL;

    const admin=await userRepo.findOne({
        where:{
            email:admin_email
        }
    });

    if(admin){
        return;
    }

    const hashedPassword=await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);

    const adminData=userRepo.create({
        fullName:"Babita Rathore",
        email:admin_email,
        password:hashedPassword,
        role:UserRole.ADMIN,
        phone:'9876543110',
        gender:GenderType.FEMALE,
        age:1
    });

    await userRepo.save(adminData);

    return {
        message:"Admin data inserted successfully."
    }
}