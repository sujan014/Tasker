import { loginWithEmail } from '@/app/services/auth';
import { IAuthInitialState, LoginRequest, UserInfo } from '@/app/utils/types';
import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuthInitialState = {
  user: undefined,
  loginFailed: false,
  registerFailed: false,
  isAuthenticated: false,
  errorMessage: undefined,
  modifyFailed: false,
  modifySuccess: false,
};

export const loginUser = createAppAsyncThunk<UserInfo, LoginRequest>(
  'auth/loginUser',
  async (body: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginWithEmail(body);
      console.log('redux login: ', response);
      return response.data;
      // Login with wrong password also success, what is WRONG ??
    } catch (error: any) {
      console.log('Login Redux Fail with error message: ', error.response);
      return rejectWithValue(
        error.response?.data || 'Redux message: Login Failed.'
      );
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<UserInfo | undefined>) => {
      state.user = payload;
    },
    resetModifyStatus: (state) => {
      state.modifyFailed = false;
      state.modifySuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(loginUser.fulfilled, (state: IAuthInitialState, action) => {
        console.log('extra reducer login success: ', action.payload);
        state.isAuthenticated = true;
        state.loginFailed = false;
        state.user = action.payload;
        state.errorMessage = undefined;
      })
      .addCase(loginUser.rejected, (state: IAuthInitialState, action) => {
        state.loginFailed = true;
        state.errorMessage =
          (action.payload as { message?: string })?.message ||
          'Redux Login failed';
      });
  },
});

export const { setUser, resetModifyStatus } = authSlice.actions;
export default authSlice.reducer;
