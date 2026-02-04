'use client';
import { endpoints } from '@/app/services/endpoints';
import httpClient from '@/app/utils/http-client';
import { UserInfo } from '@/app/utils/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/zustand/auth/authStore';
import { UserPen, Check, CircleX } from 'lucide-react';
import React, { FormEvent, useEffect, useState } from 'react';

export default function ProfileForm() {
  const [edit, setEdit] = useState(false);
  //const [name, setName] = useState<string>('');
  const user = useAuthStore((state) => state.authState.user);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const [holdUser, setHoldUser] = useState<UserInfo | null>({
    _id: user?._id,
    email: user?.email,
    password: user?.password,
    fullname: user?.fullname || '',
    profileImage: undefined,
    secretQuestion: user?.secretQuestion || '',
    secretAnswer: user?.secretAnswer || '',
  });
  const [tempUser, setTempUser] = useState<UserInfo | null>({
    _id: user?._id,
    email: user?.email,
    password: user?.password,
    fullname: user?.fullname || '',
    profileImage: undefined,
    secretQuestion: user?.secretQuestion || '',
    secretAnswer: user?.secretAnswer || '',
  });

  useEffect(() => {
    console.log('Profile User state:');
    console.table(user);
  }, []);

  const showEditUser = () => {
    setTempUser(holdUser);
    setEdit(true);
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(tempUser);
    setEdit(false);

    try {
      const response = await httpClient.post(endpoints.UPDATE_USER, tempUser);
      console.log('response: ');
      console.log(response);
      if (response.data.isSuccess) {
        const updatedUser = {
          ...user,
          fullname: response.data.data.fullname,
          secretQuestion: response.data.data.secretQuestion,
          secretAnswer: response.data.data.secretAnswer,
        };
        setHoldUser(updatedUser);
        setAuthUser(updatedUser);
      }
    } catch (error) {
      console.log(error);
    }
    //setAuthUser(response.data.);
  };
  const handleUndo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEdit(false);
    const temp = {
      _id: user?._id,
      email: user?.email,
      password: user?.password,
      fullname: user?.fullname || '',
      profileImage: undefined,
      secretQuestion: user?.secretQuestion || '',
      secretAnswer: user?.secretAnswer || '',
    };
    setTempUser(temp);
  };

  return (
    <Card className="w-full md:w-xl mx-auto">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-1 justify-center text-2xl font-bold">
          User Profile
        </div>
        <UserPen onClick={showEditUser} />
      </CardHeader>
      {!edit ? (
        <CardContent>
          <div className="flex">
            <div className="inline-block basis-1/3">Id</div>
            <div className="inline-block">{user?._id}</div>
          </div>
          <div className="flex">
            <div className="inline-block basis-1/3">Email</div>
            <div className="inline-block">{user?._id}</div>
          </div>
          <div className="flex">
            <div className="inline-block basis-1/3">Name</div>
            <div className="inline-block">{user?.fullname}</div>
          </div>
          <div className="flex">
            <div className="inline-block basis-1/3">Secret Question</div>
            <div className="inline-block">{user?.secretQuestion}</div>
          </div>
          <div className="flex">
            <div className="inline-block basis-1/3">Secret Answer</div>
            <div className="inline-block">{user?.secretAnswer}</div>
          </div>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex">
              <div className="inline-block basis-1/3">Id</div>
              <div className="inline-block">{user?._id}</div>
            </div>
            <div className="flex">
              <div className="inline-block basis-1/3">Email</div>
              <div className="inline-block">{user?._id}</div>
            </div>
            <div className="flex justify-between items-center my-0.5">
              <div className="inline-block basis-1/3">Name</div>
              <Input
                id="fullname"
                className="inline-block"
                name="fullname"
                type="text"
                onChange={onChange}
                value={tempUser?.fullname}
                maxLength={30}
                placeholder="Maximum 30 characters"
              />
            </div>
            <div className="flex justify-between my-0.5">
              <div className="inline-block basis-1/3">Secret Question</div>
              <Input
                id="secretQuestion"
                className="inline-block"
                name="secretQuestion"
                type="text"
                onChange={onChange}
                value={tempUser?.secretQuestion}
                maxLength={50}
                placeholder="Enter secret question."
              />
            </div>
            <div className="flex justify-between my-0.5">
              <div className="inline-block basis-1/3">Secret Answer</div>
              <Input
                id="secretAnswer"
                className="inline-block"
                name="secretAnswer"
                type="text"
                onChange={onChange}
                value={tempUser?.secretAnswer}
                maxLength={50}
                placeholder="Enter secret answer."
              />
            </div>
            <div className="flex justify-between">
              <Button
                onClick={handleUndo}
                className="w-1/3 bg-red-500 hover:bg-red-700"
              >
                Undo
                <CircleX />
              </Button>
              <Button type="submit" className="w-1/3 hover:bg-blue-600">
                Save
                <Check size={30} strokeWidth={2} />
              </Button>
            </div>
          </CardContent>
        </form>
      )}
    </Card>
  );

  return (
    <Card className="w-full md:w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-800 text-center">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="profileName" className="text-blue-800 text-xl">
            Name
          </Label>

          <Input
            id="profileName"
            name="profileName"
            type="text"
            onChange={onChange}
            value={name}
            maxLength={30}
            placeholder="Maximum 30 characters"
          />

          <div className="flex justify-between">
            <Button onClick={handleUndo} className="w-1/3 hover:bg-red-500">
              Undo Changed
            </Button>
            <Button type="submit" className="w-1/3 hover:bg-blue-600">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
