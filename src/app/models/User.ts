import { model, models, Schema } from 'mongoose';
import { NoteInfo, TodoInfo, UserInfo } from '../utils/types';

const CollectionName = 'TaskUsers';
const CollectionTodo = 'Todos';
const CollectionNote = 'Notes';

const UserSchema = new Schema<UserInfo>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: String,
    profileImage: String,
    secretQuestion: String,
    secretAnswer: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel =
  models?.TaskUsers ?? model<UserInfo>(CollectionName, UserSchema);

export default UserModel;

const TodoSchema = new Schema<TodoInfo>(
  {
    // _userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'UserModel',
    //   required: true,
    // },
    _userId: { type: String, required: true },
    todo: { type: String, required: true },
    item: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, required: true },
    unable: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const NoteSchema = new Schema<NoteInfo>(
  {
    _userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const TodoModel = models?.Todos ?? model<TodoInfo>(CollectionTodo, TodoSchema);

const NoteModel = models?.Notes ?? model<NoteInfo>(CollectionNote, NoteSchema);
export { TodoModel, NoteModel };
