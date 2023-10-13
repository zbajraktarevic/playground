import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TodoService } from 'src/app/core/services/todo.service';
import { AppState } from '../app.state';
import { LoadTodoError, LoadTodoSuccess, addTodo, addTodoSuccess, loadTodo, removeTodo } from './todo.actons';
import { switchMap, catchError, exhaustMap } from 'rxjs/operators';
import { Todo } from 'src/app/components/todo-list/interface/todo';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GlobalEventDriverService } from 'src/app/core/services/global-event-driver/global-event-driver.service';
@Injectable()
export class TodoEffects {

  constructor(
    protected actions$: Actions,
    protected store: Store<AppState>,
    protected todoService: TodoService) {

  }

  // Run this code when a loadTodos action is dispatched
  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(loadTodo),
    exhaustMap((action) => this.todoService.getTodoList().pipe(
      map(todos => {
        // console.log('Load todo effect', todos)
        return LoadTodoSuccess({ todo: todos })
      })
    )),
  ));

  // Run this code when a loadTodos action is dispatched
  removeTodo$ = createEffect(() => this.actions$.pipe(
    ofType(removeTodo),
    exhaustMap(({ id }) => this.todoService.deleteTodo(id).pipe(
      map(todos => {

      })
    )),
  ), { dispatch: false });

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(addTodo),
    exhaustMap(({ task }) => this.todoService.addTodo({ id: null, createdAt: new Date().toISOString(),  date: new Date().toISOString(), task}).pipe(
      map((newTodo: Todo) => {
        let listenerService = GlobalEventDriverService.getInstance();
        listenerService.dispatch('[TODO] add todo', newTodo);
        // console.log('new Todo:', newTodo)
        return addTodoSuccess({ todo: newTodo });
      })
    )),
  ))
}
