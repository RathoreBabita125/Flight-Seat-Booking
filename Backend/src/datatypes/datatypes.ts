import { DataSource } from "typeorm";
import { Request, Response } from "express";
import { User } from "../modules/userModule";

export enum UserRole {
  ADMIN = "Admin",
  PASSENGER = "Passenger"
}

export enum GenderType {
  MALE = "Male",
  FEMALE = "Female",
  OTHERS = "Others"
}

export enum SeatStatus {
  AVAILABLE = "Available",
  BOOKED = "Booked",
}

export enum BookingStatus {
  CONFIRMED = "Confirmed",
  CANCELLED = "Cancelled"
}

export type UserDeatils = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword:string;
  oldPassword: string;
  gender: GenderType;
  age: number;
  phone: string;
}

export type UserType={
  id:string;
  fullName:string;
  email:string;
  role:string;
}

export interface DecodedToken {
    id: string;
    fullName: string;
    email: string;
    role: string;
}

export type UserResponseType={
  message: string;
  user?: UserDeatils;
  token?: string;
}

export type MyContext = {
  req: Request;
  res: Response;
  db:DataSource
  user: { 
    id: string; 
    fullName:string;
    email:string;
    role: string ;
  } | null
}

export type SeatDetails={
  id:string;
  seatNumber:string;
  status:SeatStatus;
}

export type BookingDetails={
  id:string;
  status:BookingStatus;
  user:{
    id: string; 
    fullName:string;
    email:string;
    role: string ;
    gender: GenderType;
    age: number;
    phone: string;
  };
  seat:SeatDetails;
}

export type BookingSeat={
  seat:string;
}

export type BookingResponse={
  message:string;
  bookings?:BookingDetails
}

export type SeatResponse={
  message:string;
  seat?:SeatDetails;
}

export type userFilterProps={
  fullName: String
  gender: String
}

export interface BookingFilter {
  status?: BookingStatus;
  fullName?: string;
  seatNumber?: string;
  gender?:GenderType;
}