export interface UserFormData {
  fullName?: string;
  email?: string;
  password?: string;
  newPassword?:string;
  confirmPassword?: string;
  phone?: string;
  gender?: string;
  age?: string;
}

export interface FormError {
  fullName?: string;
  email?: string;
  password?: string;
  newPassword?:string;
  confirmPassword?: string;
  phone?: string;
  gender?: string;
  age?: string;
}

export type NavbarProps = {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerWidth: number;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export interface User {
  id: string;
  fullName: string;
  email: string;
  age:number;
  gender:string
  role: string;
  phone:string;
  createdAt:string;
}

export interface AuthState {
  userAuth: User | null;
  loading:boolean;
}

export interface GetMeResponse {
  getMe: User;
}

export interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
}

export interface GetAllUsersResponse {
  getAllUsers: User[];
}

export interface Seat {
  id?: string;
  seatNumber?: string;
  status?: string;
  bookings?: string;
}

export interface GetAllUsersResponse {
  getAllSeats: User[];
}

export interface GetAllSeatsResponse {
  getAllSeats: Seat[];
}

export interface Booking {
  id: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    gender: string;
    age: number;
    phone: string;
  };
  seat: {
    id: string;
    seatNumber: string;
    status: string;
  };
}

export interface GetAllBookingsResponse {
  getAllBookings: Booking[];
}

export interface GetMyBookingsResponse {
  myAllBookings: Booking[];
}

export interface SeatProps {
  selectedSeat?: string;
  status?: string;
  seatNumber?: string;
  bookedSeatData?:Booking[];
  onClick?: () => void;
}

export interface ViewBookingDetailsProps {
  open: boolean;
  status?:string;
  seatNumber?:string;
  bookedSeatData:Booking[]
  onClose: () => void;
}

export interface ChangePasswordProps{
  open:boolean;
  onClose: () => void;
}

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordError {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ShowVisible {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

export interface BookMySeatProps {
  open:boolean;
  onClose: () => void;
  seatNumber:string | undefined;
  selectedSeat?: string;  
}

export interface ConfirmSeatProps {
  open:boolean;
  onClose: () => void;
  selectedSeat?: string;  
}

export interface LoginResponse {
  login: {
    message:string;
    user: User; 
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}

export type FilterType = 'all' | 'Available' | 'Booked';

export interface SeatState {
  seats: Seat[];
  filter: FilterType;
  loading: boolean;
}

export interface BookingFilter {
  seatNumber?: string;
  passengerName?: string;
  status?: string;
  gender?: string;
  bookingDate?: string;
  [key: string]: string | undefined; 
}

export interface ColumnOption {
  label: string;
  value: keyof BookingFilter; 
}

export interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setFilter: React.Dispatch<React.SetStateAction<BookingFilter>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  columnOptions: ColumnOption[];
  filterField: (keyof BookingFilter)[];
  filter: BookingFilter;
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export interface FilterColumn {
  fullName?: string;
  gender?: string;
}

export type SearchType = "status" | "seatNumber";;

export type SearchOptions = {
  status: string[];
};

export type SearchTypeProps={
  searchBy:string;
  setSearchBy:React.Dispatch<React.SetStateAction<string>>;
  searchValue:string;
  setSearchValue:React.Dispatch<React.SetStateAction<string>>;
  handleSearchByChange:() => void;
  handleSearch:() => void;
}

export type SeatStatus = "Booked" | "Available";

export interface GetAllSeatsVariables {
    status?: SeatStatus;
}