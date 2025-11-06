'use client';
import NewActionButton from '@/app/components/ButtonAction/NewTodo';
import NoteList from '@/app/components/Fetch/NoteList';
import NoteForm from '@/app/components/Forms/NoteForm';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

export default function Notes() {
  const [newForm, setNewForm] = useState(false);
  const [reloadNotes, setReloadNotes] = useState(false);

  const handleNoteCallback = () => {
    setReloadNotes((prev) => !prev);
  };
  const handleNewNote = () => {
    setNewForm(true);
  };

  const handleCloseNote = () => {
    setNewForm(false);
  };

  return (
    <div className="px-3">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-blue-950">My Notes</h1>
        <NewActionButton
          formState={newForm}
          handleNewTodo={handleNewNote}
          handleCloseTodo={handleCloseNote}
          actionName="note"
        />
      </div>
      <AnimatePresence initial={false}>
        {newForm ? (
          <NoteForm
            noteCallback={handleNoteCallback}
            onCloseForm={handleCloseNote}
          />
        ) : null}
      </AnimatePresence>
      <NoteList reload={reloadNotes} />
    </div>
  );
}
