'use client';
import { endpoints } from '@/app/services/endpoints';
import httpClient from '@/app/utils/http-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/hooks';
import { useAuthStore } from '@/zustand/auth/authStore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface NoteInterface {
  userId: string | undefined;
  title: string;
  content: string;
  active: boolean;
}

interface NoteFormProps {
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

export const NoteFormField = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  className,
}: NoteFormProps) => {
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
          className={`${className}`}
        />
      )}
    </div>
  );
};

type NoteFormType = {
  onCloseForm: () => void;
  noteCallback: () => void;
};

export default function NoteForm({ noteCallback, onCloseForm }: NoteFormType) {
  // const { user } = useAppSelector((state) => state.auth);
  const user = useAuthStore((state) => state.authState.user);
  const [newNote, setNewNote] = useState<NoteInterface>({
    userId: '',
    title: '',
    content: '',
    active: true,
  });

  useEffect(() => {
    if (user?._id) {
      setNewNote((note) => ({ ...note, userId: user._id }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const tempNote = { ...newNote, [name]: value };
    setNewNote(tempNote);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await httpClient.post(
        endpoints.CREATE_NEW_NOTE,
        newNote
      );
      console.log(response);
      if (response.data.isSuccess) {
        toast.success(`Note created.`);
        noteCallback();
      }
      setNewNote((prev) => ({ ...prev, title: '', content: '' }));
    } catch (error: any) {
      toast.error(error.message);
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
              New Note
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NoteFormField
              label="Title"
              name="title"
              type="text"
              value={newNote.title}
              onChange={handleChange}
              required={true}
            />
            <Separator className="w-4 bg-black" />
            <NoteFormField
              label="Content"
              name="content"
              type="textArea"
              value={newNote.content}
              onChange={handleChange}
              required={true}
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
