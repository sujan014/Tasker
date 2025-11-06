'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { TodoInfo } from '../../utils/types';
import { FormEvent, useEffect, useState } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import httpClient from '../../utils/http-client';
import { endpoints } from '../../services/endpoints';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TodoFormField, TodoInterface } from '../Forms/TodoForm';
import { Separator } from '@radix-ui/react-separator';

type TodoItemProp = {
  todoCallback: () => void;
  _id?: string;
  _userId?: string;
  todo?: string;
  item?: string;
  description?: string;
  done?: boolean;
  unable?: boolean;
};
export default function TodoItem({ todoCallback, ...todoItem }: TodoItemProp) {
  const [itemDone, setItemDone] = useState<boolean | undefined>(false);
  const [strike, setStrike] = useState<boolean | undefined>(false);
  const [editItem, setEditItem] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<TodoInfo>({
    _id: '',
    _userId: '',
    todo: '',
    item: '',
    description: '',
    done: false,
    unable: false,
  });

  useEffect(() => {
    setItemDone(todoItem.done);
    setStrike(todoItem.unable);
    setEditTodo(todoItem);
  }, []);

  const handleItemDone = async () => {
    const tempDone = !itemDone;
    setItemDone(tempDone);
    const tempTodo = { ...todoItem, done: tempDone };
    console.log(tempTodo);
    const response = await httpClient.post(endpoints.UPDATE_TODO, tempTodo);
    console.info(response);
    todoCallback();
  };
  const handleDeleteItem = async () => {
    console.log(`Item to delete: ${todoItem.todo}`);
    const response = await httpClient.post(endpoints.DELETE_TODO, todoItem);
    console.info(response);
    todoCallback();
  };
  const handleIncomplete = async () => {
    const tempStrike = !strike;
    setStrike(tempStrike);
    const tempTodo = { ...todoItem, unable: tempStrike };
    console.info(`strike: ${strike}`);
    const response = await httpClient.post(endpoints.UPDATE_TODO, tempTodo);
    console.info(response);
    todoCallback();
  };
  const handleEditItem = () => {
    setEditItem(true);    
  };
  const onCloseEditForm = () => {
    setEditItem(false);
  };
  const onEditSuccess = (editedTodoItem: TodoInfo) => {
    setEditTodo(editedTodoItem);
    setEditItem(false);
  };

  if (editItem) {
    console.log(`todoItem props:`);
    console.log(todoItem);
    return (
      <EditTodoForm
        onClose={onCloseEditForm}
        todoItem={todoItem}
        onSuccess={onEditSuccess}
      />
    );
  }
  return (
    <div>
      <p className={clsx(`font-semibold`, strike && 'line-through')}>
        {editTodo.item}
        {/* {todoItem.item} */}
      </p>
      <div className="flex flex-col md:flex-row justify-between items-center gap-1.5">
        <div className="w-full md:w-[80%] border border-gray-400 rounded-md my-2 p-3">
          {editTodo.description}
          {/* {todoItem.description} */}
        </div>
        <div className="w-full flex flex-row justify-between items-center md:flex-1 ">
          <div className="py-2 px-1.5 flex justify-evenly items-center w-36 border border-blue-500 bg-white rounded-sm hover:bg-blue-100">
            <Checkbox
              // id={`done-${todoItem._id}`}
              id={`done-${editTodo._id}`}
              className="border border-gray-600 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700 inline"
              checked={itemDone}
              onCheckedChange={handleItemDone}
            />
            <Label htmlFor={`done-${editTodo._id}`} className="inline">
              {/* <Label htmlFor={`done-${todoItem._id}`} className="inline"> */}
              Done
            </Label>
          </div>
          <Button onClick={handleIncomplete}>Incomplete</Button>
          <SquarePen
            className="text-blue-800 hover:scale-110"
            onClick={handleEditItem}
          />
          <Trash2
            className="text-red-600 hover:scale-110"
            onClick={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}

type EditTodoProps = {
  onClose: () => void;
  onSuccess: (todoItem: TodoInfo) => void;
  todoItem: TodoInfo;
};

const EditTodoForm = ({ onClose, onSuccess, todoItem }: EditTodoProps) => {
  const [todoEdit, setTodoEdit] = useState<TodoInterface>({
    userId: '',
    name: '',
    item: '',
    description: '',
    done: false,
    unable: false,
  });
  console.table(todoItem);

  useEffect(() => {
    setTodoEdit((prev) => ({
      ...prev,
      item: todoItem?.item ?? '',
      description: todoItem?.description ?? '',
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setTodoEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodoEdit = { ...todoItem };
    newTodoEdit.item = todoEdit.item;
    newTodoEdit.description = todoEdit.description;

    console.log(`newTodoEdit: ${newTodoEdit}`);

    try {
      const response = await httpClient.post(
        endpoints.UPDATE_TODO,
        newTodoEdit
      );
      console.info(response);
      if (response.data.isSuccess) {
        onSuccess(newTodoEdit);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <TodoFormField
            label="Todo Item"
            name="item"
            type="text"
            value={todoEdit.item}
            onChange={handleChange}
            required={true}
          />
          <TodoFormField
            label="Description"
            name="description"
            type="textArea"
            value={todoEdit.description}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <Button onClick={handleClose} className="w-1/3 hover:bg-red-500">
              Cancel
            </Button>
            <Button type="submit" className="w-1/3 hover:bg-blue-600">
              Edit
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};
