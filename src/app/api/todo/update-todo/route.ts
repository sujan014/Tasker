import dbConnect from '@/app/connection/mongo.connection';
import { TodoModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';

export async function POST(request: Request): Promise<Response> {
  const { _id, ...todoProps } = await request.json();
  console.log(`Update Todo post: ${_id}, ${JSON.stringify(todoProps)}`);
  try {
    await dbConnect();
    const todoUpdate = await TodoModel.findByIdAndUpdate(
      _id, // ID to find
      todoProps, // Fields to update
      { new: true } // Option to return updated document
    );
    console.log(todoUpdate);
    if (!todoUpdate) {
      return createResponse({
        data: null,
        code: 404,
        message: 'Update todo not found',
        isSuccess: false,
      });
    }
    return createResponse({
      data: todoUpdate,
      code: 200,
      message: 'Update todo found',
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
