'use client';
import { endpoints } from '@/app/services/endpoints';
import httpClient from '@/app/utils/http-client';
import { NoteInfo } from '@/app/utils/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { NoteFormField, NoteInterface } from '../Forms/NoteForm';
import { Separator } from '@/components/ui/separator';

interface NoteItemProps {
  noteItem: NoteInfo;
  onNoteChanged: () => void;
}

export default function NoteCard({ noteItem, onNoteChanged }: NoteItemProps) {
  const [dispNote, setDispNote] = useState<NoteInfo>({
    _id: noteItem._id,
    _userId: noteItem._userId,
    title: noteItem.title,
    content: noteItem.content,
    active: noteItem.active,
  });
  const [newNote, setNewNote] = useState<NoteInterface>({
    userId: noteItem._userId,
    title: noteItem.title,
    content: noteItem.content,
    active: noteItem.active,
  });
  const [editNoteDialog, setEditNoteDialog] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const tempNote = { ...newNote, [name]: value };
    setNewNote(tempNote);
  };

  const submitEditedNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEditedNote = { ...noteItem };
    newEditedNote.title = newNote.title;
    newEditedNote.content = newNote.content;

    //console.table(newEditedNote);
    try {
      const response = await httpClient.post(
        endpoints.UPDATE_NOTE,
        newEditedNote
      );
      //console.log(response);
      if (response.data.isSuccess) {
        toast.success('Note edited');
        setDispNote((prev) => ({
          ...prev,
          title: newNote.title,
          content: newNote.content,
        }));
      }
    } catch (error: any) {
      toast.error(error.message);
      setNewNote({
        userId: noteItem._userId,
        title: noteItem.title,
        content: noteItem.content,
        active: noteItem.active,
      });
    }
    setEditNoteDialog(false);
  };
  const handleEditNoteCancel = () => {
    setNewNote({
      userId: dispNote._userId,
      title: dispNote.title,
      content: dispNote.content,
      active: dispNote.active,
    });
  };
  const handleDeleteNote = async () => {
    //console.info(`note to delete:`);
    //console.table(noteItem);

    try {
      const response = await httpClient.post(endpoints.DELETE_NOTE, noteItem);
      console.log(response);
      if (response.data.isSuccess) {
        toast.info(`Deleted Note: ${noteItem.title}`);
        onNoteChanged();
      }
    } catch (error) {
      toast.error('Could not delete note');
    }
  };
  return (
    <Card className="flex-1 shadow-lg rounded-xl bg-gray-100">
      <CardHeader className="flex justify-between ">
        <span className="text-2xl font-bold ">
          {dispNote.title}
          {/* {noteItem.title} */}
        </span>
        <div className="flex gap-x-2">
          <Dialog open={editNoteDialog} onOpenChange={setEditNoteDialog}>
            <DialogTrigger asChild>
              <Button
                className="rounded-md bg-gray-600 hover:bg-gray-700"
                variant="default"
                onClick={() => {}}
              >
                Edit <Pencil strokeWidth={3} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={submitEditedNote}>
                <DialogHeader>
                  <DialogTitle>
                    <NoteFormField
                      label="Title"
                      name="title"
                      type="text"
                      value={newNote.title}
                      onChange={handleChange}
                      required={true}
                    />
                  </DialogTitle>
                </DialogHeader>
                <Separator className="w-4 bg-black" />
                <NoteFormField
                  label="Content"
                  name="content"
                  type="textArea"
                  value={newNote.content}
                  onChange={handleChange}
                  required={true}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" onClick={handleEditNoteCancel}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="outline"
                    className="text-red-600 hover:bg-red-600 hover:text-white"
                    type="submit"
                  >
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            className="rounded-md hover: bg-red-500"
            onClick={handleDeleteNote}
          >
            Del
            <X strokeWidth={5} />
          </Button>
        </div>
      </CardHeader>
      <hr className="h-[2px] my-1 bg-gray-400" />
      <CardContent>
        {dispNote.content}
        {/* {noteItem.content} */}
      </CardContent>
    </Card>
  );
}
