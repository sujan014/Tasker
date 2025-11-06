'use client';
import { endpoints } from '@/app/services/endpoints';
import httpClient from '@/app/utils/http-client';
import { NoteInfo } from '@/app/utils/types';
import { useEffect, useState } from 'react';
import NoteItem from '../note/note-item';
import NoteCard from '../note/note-item';

type NoteListProp = {
  reload: boolean;
};

export default function NoteList({ reload }: NoteListProp) {
  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [reloadNotes, setReloadNotes] = useState(false);

  useEffect(() => {
    const getNotesMethod = async () => {
      try {
        const noteResponse = await httpClient.get(endpoints.GET_NOTE);
        //console.log(noteResponse);
        if (noteResponse.data.isSuccess) {
          setNotes(noteResponse.data.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getNotesMethod();
  }, [reload, reloadNotes]);

  const handleNoteChanged = () => {
    setReloadNotes((prev) => !prev);
  };

  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {notes.map((item) => (
        <NoteCard
          noteItem={item}
          onNoteChanged={handleNoteChanged}
          key={item._id}
        />
      ))}
    </div>
  );
}
