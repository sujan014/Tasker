import {
  createAccountWithEmail,
  loginWithEmail,
  logoutUser,
} from '@/app/services/auth';
import {
  IAuthInitialState,
  LoginRequest,
  RegisterAccountRequest,
  UserInfo,
} from '@/app/utils/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initAuthState: IAuthInitialState = {
  user: undefined,
  loginFailed: false,
  registerFailed: false,
  isAuthenticated: false,
  errorMessage: undefined,
  modifyFailed: false,
  modifySuccess: false,
};

type authStoreState = {
  authState: IAuthInitialState;
  loginAuthUser: (loginRequest: LoginRequest) => Promise<void>;
  registerAuthUser: (
    registerAccountRequest: RegisterAccountRequest
  ) => Promise<void>;
  logoutAuthUser: () => Promise<void>;
  setAuthUser: (user: UserInfo) => void;
};

export const useAuthStore = create<authStoreState>()(
  persist(
    (set) => ({
      authState: initAuthState,
      setAuthUser: (user: UserInfo) =>
        set((state) => ({
          authState: {
            ...state.authState,
            user: user,
          },
        })),
      loginAuthUser: async (loginRequest: LoginRequest) => {
        try {
          const response = await loginWithEmail(loginRequest);
          console.log('zustand login: ', response);
          if (response.isSuccess) {
            console.log('login success.');
            set({
              authState: {
                user: response.data,
                loginFailed: false,
                registerFailed: false,
                isAuthenticated: true,
                errorMessage: undefined,
                modifyFailed: false,
                modifySuccess: false,
              },
            });
            // set((state) => ({
            //   authState: {
            //     ...state.authState,
            //     user: response.data.data,
            //     isAuthenticated: true,
            //     loginFailed: false,
            //     errorMessage: undefined,
            //   },
            // }));
          } else {
            set({
              authState: {
                user: undefined,
                loginFailed: true,
                registerFailed: false,
                isAuthenticated: false,
                errorMessage: response.data.message ?? 'Login error',
                modifyFailed: false,
                modifySuccess: false,
              },
            });
          }
        } catch (error: any) {
          console.log(error.message);
          set((state) => ({
            authState: {
              ...state.authState,
              isAuthenticated: false,
              loginFailed: true,
              errorMessage: error?.message ?? 'Login Failed',
            },
          }));
        }
      },
      registerAuthUser: async (
        registerAccountRequest: RegisterAccountRequest
      ) => {
        try {
          const response = await createAccountWithEmail(registerAccountRequest);
          console.log(response);
          if (response.data.isSuccess) {
            set((state) => ({
              authState: {
                ...state.authState,
                user: response.data,
                isAuthenticated: true,
                registerFailed: false,
                loginFailed: false,
                errorMessage: undefined,
              },
            }));
          } else {
            set({
              authState: {
                user: undefined,
                loginFailed: false,
                registerFailed: true,
                isAuthenticated: false,
                errorMessage:
                  response.data.message ?? 'User registration error',
                modifyFailed: false,
                modifySuccess: false,
              },
            });
            // set((state) => ({
            //   authState: {
            //     ...state.authState,
            //     isAuthenticated: false,
            //     registerFailed: true,
            //     loginFailed: true,
            //     errorMessage: response.data.message,
            //   },
            // }));
          }
        } catch (error: any) {
          console.log(error);
          set((state) => ({
            authState: {
              ...state.authState,
              isAuthenticated: false,
              registerFailed: true,
              loginFailed: true,
              errorMessage: error?.message ?? 'Account Register Failed',
            },
          }));
        }
      },
      logoutAuthUser: async () => {
        const response = await logoutUser();
        console.info(response);
        set({ authState: initAuthState });
      },
    }),
    { name: 'auth-zustand' }
  )
);
