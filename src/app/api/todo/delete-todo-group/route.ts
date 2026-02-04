import dbConnect from '@/app/connection/mongo.connection';
import { TodoModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';

export async function POST(request: Request): Promise<Response> {
  const { userId, todo } = await request.json();
  try {
    await dbConnect();
    const deletionCriteria = {
      _userId: userId,
      todo: todo,
    };
    const deleteTodos = await TodoModel.deleteMany(deletionCriteria);

    return createResponse({
      data: deleteTodos,
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
