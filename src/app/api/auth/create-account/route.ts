import dbConnect from '@/app/connection/mongo.connection';
import UserModel from '@/app/models/User';
import { encryptpassword } from '@/app/services/auth';
import { createResponse } from '@/app/utils';

//export default async function POST(request: Request): Promise<Response> {
export async function POST(request: Request): Promise<Response> {
  const { email, password } = await request.json();
  console.log(`email: ${email}, password: ${password}`);

  try {
    await dbConnect();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return createResponse({
        data: null,
        code: 400,
        message: 'Registration failed. Email already exists.',
        isSuccess: false,
      });
    }
    const hashedpassword = await encryptpassword(password);
    const newUser = new UserModel({
      email,
      password: hashedpassword,
    });
    await newUser.save();

    return createResponse({
      data: { email, password },
      code: 200,
      message: 'Account created successfully.',
      isSuccess: true,
    });
  } catch (error) {
    return createResponse({
      data: null,
      code: 500,
      message: 'Internal Server Error.',
      isSuccess: false,
    });
  }
}
