'use client';

import { Button } from '@/components/ui/button';
import { FormEvent, useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { FaDoorOpen } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import { CiLogin } from 'react-icons/ci';
import { AiOutlineForward } from 'react-icons/ai';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import httpClient from '@/app/utils/http-client';
import { createAccountWithEmail, loginWithEmail } from '@/app/services/auth';
import { endpoints } from '@/app/services/endpoints';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/redux/store/auth/authSlice';
import { useAuthStore } from '@/zustand/auth/authStore';

interface FormFieldProps {
  type:
    | 'number'
    | 'email'
    | 'password'
    | 'search'
    | 'time'
    | 'text'
    | 'hidden'
    | 'tel'
    | 'url'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'week'
    | undefined;
  name: string;
  text: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FormField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = true,
  text,
}: FormFieldProps) => {
  return (
    <div className="m-5">
      <div className="flex items-center">
        <div className="min-w-32 mr-2">{text}</div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="border border-black rounded-md p-2 w-full"
        />
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
};

export default function LoginForm() {
  // const dispatch = useAppDispatch();
  // const { isAuthenticated, errorMessage, loginFailed, registerFailed } =
  //   useAppSelector((state) => state.auth);

  const authState = useAuthStore((state) => state.authState);
  const loginAuthUser = useAuthStore((state) => state.loginAuthUser);
  const registerAuthUser = useAuthStore((state) => state.registerAuthUser);

  const router = useRouter();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    confirmPassword?: string;
  }>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  useEffect(() => {
    console.log('isAuthenticated: ', authState.isAuthenticated);
    console.log('loginFailed: ', authState.loginFailed);
    console.log('errorMessage: ', authState.errorMessage);

    if (authState.isAuthenticated) {
      toast.success('Registration successful!');
      router.push('/dashboard');
    }
    if (authState.loginFailed) {
      toast.error(authState.errorMessage || 'Login Failed.');
    }
    if (authState.registerFailed) {
      toast.error(
        authState.errorMessage || 'Registration failed. Please try again.'
      );
    }
  }, [
    authState.isAuthenticated,
    authState.errorMessage,
    authState.loginFailed,
  ]);

  const toggleLoginMode = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoginMode((prev) => !prev);
  };
  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter valid email.';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      tempErrors.password = 'Password must have minimum 8 characters';
    }
    if (!isLoginMode) {
      if (!formData.confirmPassword) {
        tempErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        tempErrors.confirmPassword = 'Passwords do not match.';
      }
    }
    return tempErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      toast.error('Enter correct credentials');
      return;
    }
    // dispatch(
    //   loginUser({
    //     email: formData.email,
    //     password: formData.password,
    //   })
    // );

    loginAuthUser({
      email: formData.email,
      password: formData.password,
    });
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      if (validationErrors.confirmPassword?.length) {
        toast.error(
          'You must retype the exact same password in both password boxes. Check for capslock'
        );
      } else {
        toast.error('Enter correct credentials');
      }
      return;
    }
    const registerResponse = await createAccountWithEmail({
      email: formData.email,
      password: formData.password,
    });

    const returnCode = registerResponse.data.isSuccess;
    if (returnCode) {
      toast.success(registerResponse.data.message);
    } else {
      toast.error(registerResponse.data.message);
    }
  };

  return (
    <div className="my-10 w-full sm:w-1/3 mx-auto border border-gray-300 rounded-lg flex-col justify-center">
      <h1 className="border p-5 bg-blue-900 text-white text-center text-2xl rounded-lg">
        Login to Start your day
      </h1>
      <form className="grid" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          text="Email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleFormInput}
          error={errors.email}
          required={true}
        />
        <FormField
          type="password"
          name="password"
          text="Password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleFormInput}
          error={errors.password}
          required={true}
        />
        {!isLoginMode ? (
          <FormField
            type="password"
            name="confirmPassword"
            text="Confirm password"
            placeholder="Retype Password"
            value={formData.confirmPassword || ''}
            onChange={handleFormInput}
            error={errors.confirmPassword}
            required={true}
          />
        ) : null}

        {isLoginMode ? (
          <Button className="bg-blue-900 cursor-pointer" type="submit">
            Login <AiOutlineForward />
          </Button>
        ) : (
          <Button
            className="bg-[#006600] cursor-pointer"
            onClick={handleRegister}
          >
            Register <BiLogIn />
          </Button>
        )}

        <p className="text-[#1111ee] my-5 text-center">
          {isLoginMode
            ? "Don't have an account ?"
            : 'Already have an account ?'}{' '}
          <a className="font-bold cursor-pointer" onClick={toggleLoginMode}>
            {isLoginMode ? 'Sign up' : 'Sign in'}
          </a>
        </p>
        {/* <Button onClick={() => toast('Khai kata harayo toast?')}>Oye</Button> */}
      </form>
    </div>
  );
}
