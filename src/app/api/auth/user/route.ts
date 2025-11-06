import dbConnect from '@/app/connection/mongo.connection';
import UserModel from '@/app/models/User';
import { createResponse } from '@/app/utils';

export async function POST(request: Request) {
  const { _id, email, ...details } = await request.json();
  console.log(`${_id}, ${email},`);
  console.log(details);

  try {
    await dbConnect();
    const updatedUser = await UserModel.findByIdAndUpdate(_id, details, {
      new: true,
    });
    console.log('updated user:');
    console.log(updatedUser);
    return createResponse({
      data: updatedUser,
      code: 200,
      message: 'User updated',
      isSuccess: true,
    });
  } catch (error) {
    return createResponse({
      data: null,
      code: 400,
      message: 'Error in user update.',
      isSuccess: false,
    });
  }
}
