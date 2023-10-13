import { createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/components/todo-list/interface/todo';
import { LoadTodoError, LoadTodoSuccess, addTodo, addTodoSuccess, loadTodo, removeLastTodo, removeTodo } from './todo.actons';



export interface TodoState {
  todos: Todo[];
  error: string | null;
  status: string | 'pending' | 'loading' | 'error' | 'success';
}

export const InitialState: TodoState = {
  todos:[],
  error: null,
  status:'pending'
}


export const TodoReducer = createReducer(
  InitialState,

  // Add new task on Todo List
  on(addTodo, (state, { task }) => ({
    ...state,
    status: 'loading'
  })),

  // Add new task on Todo List on api end
  on(addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    status: 'success'
  })),

  // Remove Task from todod List
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => {  return todo.id !== id } ),
  })),

  on(removeLastTodo, (state) => ({
    ...state,
    todos: state.todos.slice(0, state.todos.length - 1)
  })),


  // Remove Task from todo List
  on(loadTodo, (state) => ({ ...state, status: 'loading' })),


  on(LoadTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: todo,
    error: null,
    status: 'success'
  })),

  on(LoadTodoError, (state, { error }) => ({
    ...state,
    error: error.message,
    status: 'error'
  })),

)
