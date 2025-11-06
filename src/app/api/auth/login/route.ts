import dbConnect from '@/app/connection/mongo.connection';
import UserModel from '@/app/models/User';
import { comparePassword } from '@/app/services/auth';
import { createResponse } from '@/app/utils';
import { generateTokenAndSaveCookie } from '@/app/utils/auth';
import { UserInfo } from '@/app/utils/types';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log(`email: ${email}, password: ${password}`);

    await dbConnect();
    // check if user exists
    const user = await UserModel.findOne({ email });
    console.log('user found: ', user);
    if (!user) {
      return createResponse({
        data: null,
        code: 400,
        message: 'Invalid email or password',
        isSuccess: false,
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    console.log(`isPasswordValid: ${JSON.stringify(isPasswordValid)}`);
    if (!isPasswordValid) {
      console.log('Return state as login Fail');
      return createResponse({
        data: null,
        code: 400,
        message: 'Invalid email or password',
        isSuccess: false,
      });
    }

    // Generate JWT and set cookie
    const jwt = await generateTokenAndSaveCookie({
      userId: user._id.toString(),
      email: user.email,
      authType: 'email',
    });
    console.log(`jwt: ${jwt}`);

    const loginUserData: UserInfo = {
      _id: user._id,
      email: user.email,
      fullname: user.fullname ?? '',
    };
    return createResponse({
      //data: jwt,
      data: loginUserData,
      code: 200,
      message: 'Login Successful',
      isSuccess: true,
    });
  } catch (error) {
    console.error(error);
    return createResponse({
      data: null,
      code: 500,
      message: 'Internal Server Error',
      isSuccess: false,
    });
  }
}
