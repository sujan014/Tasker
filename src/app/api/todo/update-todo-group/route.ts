import dbConnect from '@/app/connection/mongo.connection';
import { TodoModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';

export async function POST(request: Request) {
  const { userId, oldTodoGroup, newTodoGroup } = await request.json();
  console.log(
    `userId: ${userId}, oldTodoGroup: ${oldTodoGroup}, newTodoGroup: ${newTodoGroup}`
  );
  try {
    await dbConnect();
    const response = await TodoModel.updateMany(
      {
        _userId: userId,
        todo: oldTodoGroup,
      },
      {
        $set: { todo: newTodoGroup },
      }
    );
    console.log(response);
    return createResponse({
      data: 'Group updated',
      code: 200,
      message: 'Update todo found',
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return createResponse({
      data: null,
      code: 400,
      message: 'Todo Group update error',
      isSuccess: false,
    });
  }
}
