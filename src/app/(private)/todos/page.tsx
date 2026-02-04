'use client';
import NewActionButton from '@/app/components/ButtonAction/NewTodo';
import TodoList from '@/app/components/Fetch/TodoList';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TodoForm from '@/app/components/Forms/TodoForm';

export default function Todos() {
  const [newForm, setNewForm] = useState(false);

  const handleNewTodo = () => {
    setNewForm(true);
  };

  const handleCloseTodo = () => {
    setNewForm(false);
  };

  return (
    <div className="px-3">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-blue-950">My Todos</h1>
        <NewActionButton
          formState={newForm}
          handleNewTodo={handleNewTodo}
          handleCloseTodo={handleCloseTodo}
          actionName="todo"
        />
      </div>

      <AnimatePresence initial={false}>
        {newForm ? <TodoForm onCloseForm={handleCloseTodo} /> : null}
      </AnimatePresence>
      <TodoList />
    </div>
  );
}
