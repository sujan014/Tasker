'use client';

import { endpoints } from '@/app/services/endpoints';
import httpClient from '@/app/utils/http-client';
import { TodoInfo } from '@/app/utils/types';
import { useEffect, useState } from 'react';
import TodoItem from '../todo/todo-item';
import TodoHeader from '../todo/todoHeader';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoInfo[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<any>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const getTodo = await httpClient.get(endpoints.GET_TODO);
        console.log(getTodo);
        setTodos(getTodo.data.data);
        const tempData = getTodo.data.data;
        const uniqueArray = [
          ...new Set(tempData?.map((item: TodoInfo) => item.todo)),
        ];
        setUniqueCategories(uniqueArray);
        console.log(uniqueArray);
      } catch (error) {
        alert(error);
      }
    };
    getTodo();
  }, [reload]);

  const handleReloadTodos = () => {
    setReload((prev) => !prev);
  };

  return (
    <div>
      {todos &&
        uniqueCategories?.map(
          (uniqueCategory: string, categoryIndex: number) => {
            let firstTodoItem = todos.find((todo) => todo.todo === uniqueCategory);
            return (
              <div
                key={categoryIndex}
                className="w-full mt-3 p-3 bg-gray-200 border-2 rounded-2xl shadow-2xl "
              >
                <TodoHeader todoItem={firstTodoItem} />
                {/* <TodoHeader uniqueCategory={uniqueCategory} /> */}
                <hr className="h-[2px] my-1 bg-gray-400" />
                {todos
                  .filter((todoItem) => todoItem.todo === uniqueCategory)
                  .map((filteredTodo, _index) => (
                    <div key={_index}>
                      <TodoItem
                        todoCallback={handleReloadTodos}
                        {...filteredTodo}
                      />
                    </div>
                  ))}
              </div>
            );
          }
        )}
    </div>
  );
}
