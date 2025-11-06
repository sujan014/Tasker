'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { endpoints } from '@/app/services/endpoints';
import { useAppSelector } from '@/hooks';
import httpClient from '@/app/utils/http-client';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/zustand/auth/authStore';

export interface TodoInterface {
  userId: string | undefined;
  name: string;
  item: string;
  description: string;
  done: boolean;
  unable: boolean;
}

interface TodoFormProps {
  label: string;
  type: 'text' | 'textArea';
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  required?: boolean;
  className?: string;
}

const TodoFormField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  className,
}: TodoFormProps) => {
  return (
    <div className="flex-col mt-2 mb-5">
      <Label htmlFor={name} className="text-blue-800 text-xl">
        {label}
      </Label>
      {type === 'text' ? (
        <Input
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          maxLength={30}
          placeholder="Maximum 30 characters"
          required={required}
          className={`${className}`}
        />
      ) : (
        <Textarea
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          maxLength={100}
          placeholder="Maximum 100 characters"
          className={`${className}`}
        />
      )}
    </div>
  );
};

export { TodoFormField };

type TodoFormType = {
  onCloseForm: () => void;
};
export default function TodoForm({ onCloseForm }: TodoFormType) {
  //const { user } = useAppSelector((state) => state.auth);
  const user = useAuthStore((state) => state.authState.user);
  console.log('Todo Form displaying user');
  console.table(user);
  const [todo, setTodo] = useState<TodoInterface>({
    userId: '', //user?._id ?? '',
    name: '',
    item: '',
    description: '',
    done: false,
    unable: false,
  });

  useEffect(() => {
    if (user?._id) {
      setTodo((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setTodo((todo) => ({ ...todo, [name]: value }));
    console.log(`todo changes:`, todo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // const newTodoData = {
    //   userId: todo.userId,
    //   todo: todo.name,
    //   description: todo.description,
    //   done: todo.done,
    //   unable: todo.unable,
    // };
    // console.log('newTodoData: ', newTodoData);
    try {
      const response = await httpClient.post(
        endpoints.CREATE_NEW_TODO,
        JSON.stringify({
          userId: todo.userId,
          todo: todo.name,
          item: todo.item,
          description: todo.description,
          done: todo.done,
          unable: todo.unable,
        })
      );
      console.log('response: ', response);
      setTodo({ ...todo, item: '', description: '' });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCloseForm();
  };
  return (
    <motion.div
      className="w-full md:w-xl mx-auto"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-800 text-center">
              Create Todo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TodoFormField
              label=""
              name="name"
              type="text"
              value={todo.name}
              onChange={handleChange}
              required={true}
            />
            <Separator className="w-4 bg-black" />
            <TodoFormField
              label="Todo Item"
              name="item"
              type="text"
              value={todo.item}
              onChange={handleChange}
              required={true}
            />
            <TodoFormField
              label="Description"
              name="description"
              type="textArea"
              value={todo.description}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <Button onClick={handleClose} className="w-1/3 hover:bg-red-500">
                Close
              </Button>
              <Button type="submit" className="w-1/3 hover:bg-blue-600">
                Add
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </motion.div>
  );
}
