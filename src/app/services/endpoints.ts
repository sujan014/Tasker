export const endpoints = {
  CREATE_NEW_ACCOUNT: '/api/auth/create-account',
  LOGIN: '/api/auth/login',
  VERIFY: '/api/auth/verify',
  LOGOUT: 'api/auth/logout',
  CREATE_NEW_TODO: '/api/todo/new-todo',
  GET_TODO: '/api/todo/get-todo',
  DELETE_TODO: '/api/todo/delete-todo',
  UPDATE_TODO: '/api/todo/update-todo',
  DELETE_TODO_GROUP: '/api/todo/delete-todo-group',
  UPDATE_TODO_GROUP: '/api/todo/update-todo-group',
  GET_NOTE: '/api/note/get-note',
  CREATE_NEW_NOTE: '/api/note/new-note',
  DELETE_NOTE: '/api/note/delete-note',
  UPDATE_NOTE: '/api/note/update-note',

  UPDATE_USER: '/api/auth/user',
};

/* if name is preceded by '/', then it is absolute path */
/* else name is relative path */
