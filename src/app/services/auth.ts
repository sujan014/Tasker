import bcrypt from 'bcryptjs';
import httpClient from '../utils/http-client';
import {
  LoginRequest,
  RegisterAccountRequest,
  TodoRequest,
} from '../utils/types';
import { endpoints } from './endpoints';

export async function comparePassword(
  inputpassword: string,
  storedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputpassword, storedPassword);
}
export async function encryptpassword(password: string): Promise<string> {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const cryptPassword = await bcrypt.hash(password, salt);
  return cryptPassword;
}

export const createAccountWithEmail = async (body: RegisterAccountRequest) => {
  const response = await httpClient.post(
    endpoints.CREATE_NEW_ACCOUNT,
    JSON.stringify(body)
  );

  return response;
};

export const loginWithEmail = async (body: LoginRequest) => {
  const response = await httpClient.post(endpoints.LOGIN, JSON.stringify(body));
  return response.data;
};

export const logoutUser = async () => {
  const response = await httpClient.post(endpoints.LOGOUT);
  return response.data;
};
//export { createAccountWithEmail };
