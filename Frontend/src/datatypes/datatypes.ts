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
}

export interface AuthState {
  userAuth: User | null;
  loading:boolean;
}

export interface GetMeResponse {
  getMe: User;
}



