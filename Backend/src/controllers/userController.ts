import { userInputFields } from "../constants/consts";
import { MyContext, UserDeatils, UserResponseType, UserRole } from "../datatypes/datatypes";
import { User } from "../modules/userModule";
import { generateToken } from "../utils/generateToken";
import { validateUser } from "../validators/validateUser";
import bcrypt from 'bcrypt';

export const userResolver = {
    Query: {
        getMe: async (_: any, __: any, context: MyContext) => {
            const userRepo = context.db.getRepository(User);
            try {
                if (!context.user) {
                    throw new Error("Unauthorized Access.");
                }
                const user = await userRepo.findOne({
                    where: {
                        id: context.user.id
                    }
                });
                return user;
            } catch (error) {
                throw new Error((error as Error).message);
            }
        }
    },

    Mutation: {
        register: async (_: any, userData: UserDeatils, context: MyContext): Promise<UserResponseType> => {
            const userRepo = context.db.getRepository(User);
            try {
                validateUser(userData, userInputFields);

                const user = await userRepo.findOne({
                    where: {
                        email: userData.email,
                    }
                });

                if (user) {
                    throw new Error("This user is already existed.");
                }

                const existingPhoneNumber = await userRepo.findOne({
                    where: {
                        phone: userData.phone
                    }
                });

                if (existingPhoneNumber) {
                    throw new Error("This number is already existed. Try with another one.")
                }

                const hashedPassword = await bcrypt.hash(userData.password, 10);

                const newUser = userRepo.create({
                    fullName: userData.fullName,
                    email: userData.email,
                    password: hashedPassword,
                    role: UserRole.PASSENGER,
                    gender: userData.gender,
                    age: userData.age,
                    phone: userData.phone
                });

                await userRepo.save(newUser);

                return {
                    message: "You have successfully registered",
                }
            } catch (error) {
                throw new Error(`Registeration failed: ${(error as Error).message}`);
            }
        },

        login: async (_: any, userData: UserDeatils, context: MyContext): Promise<UserResponseType> => {
            const userRepo = context.db.getRepository(User);

            try {
                const userLoginInput = ["email", "password"];
                validateUser(userData, userLoginInput);

                const user = await userRepo.findOne({
                    where: {
                        email: userData.email,
                    },
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        password: true,
                        role: true
                    }
                });

                if (!user) {
                    throw new Error("User does not exist.");
                }

                const vaildUser = await bcrypt.compare(userData.password, user.password);

                if (!vaildUser) {
                    throw new Error("Invalid Crendentials.");
                }

                const payloadData = {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                }

                const token = generateToken(payloadData);
                context.res.cookie("token", token,
                    {
                        httpOnly: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    }
                );

                return {
                    message: "You have successfully logged in.",
                }

            } catch (error) {
                throw new Error(`Login failed: ${(error as Error).message}`);
            }
        },

        logout: async (_: any, userData: UserDeatils, context: MyContext): Promise<UserResponseType> => {

            try {

                if (!context.user) {
                    throw new Error("User is not logged in. First login for logout.");
                }

                context.res.clearCookie("token", {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });

                return {
                    message: "You have successfully logged out.",
                }

            } catch (error) {
                throw new Error(`Logout failed: ${(error as Error).message}`);
            }
        },

        forget: async (_: any, userData: UserDeatils, context: MyContext): Promise<UserResponseType> => {
            const userRepo = context.db.getRepository(User);
            try {
                const userLoginInput = ["email", "newPassword", "confirmPassword"];
                validateUser(userData, userLoginInput);

                const user = await userRepo.findOne({
                    where: {
                        email: userData.email,
                    }
                });

                if (!user) {
                    throw new Error("User not found.");
                }

                const hashedPasssword = await bcrypt.hash(userData.newPassword, 10);

                user.password = hashedPasssword;

                await userRepo.save(user);

                return {
                    message: "You have generated new password successfully.",
                }
            } catch (error) {
                throw new Error(`Reset password failed: ${(error as Error).message}`);
            }
        },

        changePassword: async (_: any, userData: UserDeatils, context: MyContext): Promise<UserResponseType> => {
            const userRepo = context.db.getRepository(User);
            console.log("context inside change password :", context.user)
            try {
                const userLoginInput = ["oldPassword", "newPassword"];
                validateUser(userData, userLoginInput);

                if (!context.user?.email) {
                    throw new Error("You are not logged in. First login to change password.");
                }

                const user = await userRepo.findOne({
                    where: {
                        id: context.user?.id,
                    },
                    select: {
                        id: true,
                        email: true,
                        password: true,
                        fullName: true,
                    }
                });

                if (!user) {
                    throw new Error("User not found.");
                }

                const validPassword = await bcrypt.compare(userData.oldPassword, user?.password);

                if (!validPassword) {
                    throw new Error("Email or Password does not match.");
                }

                const hashedPasssword = await bcrypt.hash(userData.newPassword, 10);

                user.password = hashedPasssword;

                await userRepo.save(user);

                return {
                    message: "Password has been updated successfully.",
                }

            } catch (error) {
                throw new Error(`Update password failed: ${(error as Error).message}`);
            }
        },
    }
}