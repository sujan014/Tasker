export interface IAuthInitialState {
  user?: UserInfo;
  loginFailed: boolean;
  registerFailed: boolean;
  isAuthenticated: boolean;
  errorMessage?: string;
  modifyFailed: boolean;
  modifySuccess: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterAccountRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  _id?: string;
  email?: string;
  password?: string;
  fullname?: string;
  profileImage?: string;
  secretQuestion?: string;
  secretAnswer?: string;
}

export interface PayloadSignJWT {
  userId: string;
  email?: string;
  authType?: 'email' | 'google' | 'linkedin';
}

export interface TodoInfo {
  _id?: string;
  _userId?: string;
  todo?: string;
  item?: string;
  description?: string;
  done?: boolean;
  unable?: boolean;
}

export interface TodoRequest {
  _userId: string;
  todo: string;
  description: string;
  done: boolean;
  unable: boolean;
}

export interface NoteInfo {
  _id: string;
  _userId: string;
  title: string;
  content: string;
  active: boolean;
}
