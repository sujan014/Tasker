import dbConnect from '@/app/connection/mongo.connection';
import { TodoModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';

export async function POST(request: Request): Promise<Response> {
  const { _id, userId, todo, item, description, done, unable } =
    await request.json();
  //   console.log(`Delete Todo post: ${_id}, ${userId}, ${todo} ${item} ${description} ${done} ${unable}`);
  try {
    await dbConnect();
    const todo = await TodoModel.findOneAndDelete({ _id, userId });
    //console.log(todo);
    return createResponse({
      data: todo,
      code: 200,
      message: 'Delete todo found',
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
