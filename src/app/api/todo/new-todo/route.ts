import dbConnect from '@/app/connection/mongo.connection';
import { TodoModel } from '@/app/models/User';
import { createResponse } from '@/app/utils';
import { Types } from 'mongoose';

export async function POST(request: Request): Promise<Response> {
  const { userId, todo, item, description, done, unable } =
    await request.json();
  console.log(`New Todo post: ${userId}, ${todo} ${item} ${description}`);
  try {
    await dbConnect();
    const newTodo = new TodoModel({
      _userId: userId,
      todo,
      item,
      description,
      done,
      unable,
    });
    await newTodo.save();
    return createResponse({
      data: newTodo,
      code: 200,
      message: 'Todo added successfully.',
      isSuccess: true,
    });
  } catch (error) {
    console.log(error);
    return createResponse({
      data: null,
      code: 500,
      message: 'Internal Server Error.',
      isSuccess: false,
    });
  }
}
