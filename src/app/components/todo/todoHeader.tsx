import { endpoints } from '@/app/services/endpoints';
import httpClient from '@/app/utils/http-client';
import { TodoInfo } from '@/app/utils/types';
import { Button } from '@/components/ui/button';
import {
  Ban,
  Check,
  CircleAlert,
  LogOut,
  Pencil,
  Plus,
  Save,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TodoFormField, TodoInterface } from '../Forms/TodoForm';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';

interface todoHeadProps {
  todoItem: TodoInfo;
}
const TodoHeader: React.FC<todoHeadProps> = ({ todoItem }) => {
  const [newTodo, setNewTodo] = useState<boolean>(false);
  const [editGroup, setEditGroup] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoInterface>({
    userId: '',
    name: '',
    item: '',
    description: '',
    done: false,
    unable: false,
  });
  const [defaultTodo, setDefaultTodo] = useState<TodoInfo>({
    _id: '',
    _userId: '',
    todo: '',
    item: '',
    description: '',
    done: false,
    unable: false,
  });
  const [groupName, setGroupName] = useState<string | undefined>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    setDefaultTodo(todoItem);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      userId: todoItem._userId,
      todo: todoItem.todo,
      item: todo.item,
      description: todo.description,
      done: todo.done,
      unable: todo.unable,
    };
    console.table(newTodo);
    try {
      const response = await httpClient.post(
        endpoints.CREATE_NEW_TODO,
        JSON.stringify(newTodo)
      );
      console.log('response: ', response);
      setNewTodo(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setNewTodo(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setTodo((todo) => ({ ...todo, [name]: value }));
    console.log(`todo changes:`, todo);
  };

  const handleNewTodo = () => {
    setNewTodo(true);
  };
  const handleDeleteGroup = async () => {
    const response = await httpClient.post(endpoints.DELETE_TODO_GROUP, {
      userId: todoItem._userId,
      todo: todoItem.todo,
    });
    console.log(response);
    setOpenDialog(false);
  };
  const handleEditGroup = () => {
    setGroupName(defaultTodo.todo);
    setEditGroup(true);
  };
  const handleDiscardGroupEdit = () => {
    setEditGroup(false);
  };
  const handleSaveGroup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await httpClient.post(endpoints.UPDATE_TODO_GROUP, {
        userId: todoItem._userId,
        oldTodoGroup: todoItem.todo,
        newTodoGroup: groupName,
      });
      console.log(response);
      setEditGroup(false);
      if (response.data.isSuccess)
        setDefaultTodo((prev) => ({ ...prev, todo: groupName }));
    } catch (error) {
      console.error(error);
    }
  };
  const groupChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setGroupName(e.target.value);
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center">
        {!editGroup ? (
          <h1 className="flex-1/2 text-2xl mb-3 font-bold text-center">
            {' '}
            {/* {todoItem.todo} */}
            {defaultTodo.todo}
          </h1>
        ) : (
          <Input
            id="todo-group"
            name="todo-group"
            type="text"
            onChange={groupChanged}
            value={groupName}
            maxLength={30}
            placeholder="Maximum 30 characters"
            required={true}
            className="flex-1/2 text-4xl mb-3 font-bold bg-white"
          />
        )}
        <div className="flex gap-2 flex-wrap justify-around">
          {!editGroup ? (
            <Button
              className="rounded-md bg-gray-700"
              variant="default"
              onClick={handleEditGroup}
            >
              Edit name <Pencil strokeWidth={3} />
            </Button>
          ) : (
            <Button
              className="rounded-md mx-2"
              variant="default"
              onClick={handleSaveGroup}
            >
              Save <Save strokeWidth={3} />
            </Button>
          )}
          {!editGroup ? (
            ''
          ) : (
            <Button
              className="rounded-md"
              variant="default"
              onClick={handleDiscardGroupEdit}
            >
              Back <Ban strokeWidth={5} />
            </Button>
          )}
          <Button
            // className="h-10 w-10 rounded-full bg-blue-700 hover:bg-blue-500"
            className="rounded-md bg-blue-700 hover:bg-blue-500"
            onClick={handleNewTodo}
          >
            Add Item
            <Plus strokeWidth={5} />
          </Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-md hover: bg-red-500"
                // onClick={handleDeleteGroup}
              >
                Del group
                <X strokeWidth={5} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>
                Delete Todo Group{' '}
                <CircleAlert className="inline" color="red" strokeWidth={2} />
              </DialogTitle>
              <DialogHeader>
                Are you sure you want to delete this todo group ?
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">No</Button>
                </DialogClose>
                <Button
                  variant="outline"
                  className="text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={handleDeleteGroup}
                >
                  Yes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {newTodo && (
        <form className="" onSubmit={handleSubmit}>
          <TodoFormField
            label="Todo Item"
            name="item"
            type="text"
            value={todo.item}
            onChange={handleChange}
            required={true}
            className="bg-white"
          />
          <TodoFormField
            label="Description"
            name="description"
            type="textArea"
            value={todo.description}
            onChange={handleChange}
            className="bg-white"
          />
          <div className="flex justify-between">
            <Button className="bg-blue-600 hover:bg-blue-700" type="submit">
              Submit <Check strokeWidth={4} />
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={handleCancel}
            >
              Cancel <LogOut strokeWidth={4} />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TodoHeader;
