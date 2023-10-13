import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/components/todo-list/interface/todo';

export const addTodo = createAction(
  '[Todo] add Todo',
  props<{task:string}>()
)

export const addTodoSuccess = createAction(
  '[Todo] add Todo Success',
  props<{ todo:Todo }>()
)

export const removeTodo = createAction(
  '[Todo] remove Todo',
  props<{ id: number | null }>()
)

export const removeLastTodo = createAction(
  '[Todo] remove last Todo'
)

export const loadTodo = createAction('[Todo] load Todo')

export const LoadTodoSuccess = createAction(
  '[Todo] Load Todo Success',
  props<{todo: Todo[]}>()
);
export const LoadTodoError = createAction(
  '[Todo] Load Todo Error',
  props <{ error: HttpErrorResponse }>()
);
