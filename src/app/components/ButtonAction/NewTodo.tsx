'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TodoForm from '../Forms/TodoForm';
import { AnimatePresence, motion } from 'framer-motion';

interface NewTodoProps {
  formState: boolean;
  handleNewTodo: () => void;
  handleCloseTodo: () => void;
  actionName: string;
}

export default function NewActionButton({
  formState,
  handleNewTodo,
  handleCloseTodo,
  actionName,
}: NewTodoProps) {
  return (
    <div>
      {!formState ? (
        <Button onClick={handleNewTodo}>New {actionName}</Button>
      ) : (
        <Button onClick={handleCloseTodo}>Close {actionName}</Button>
      )}
    </div>
  );
}
