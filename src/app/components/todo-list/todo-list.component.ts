
import { Component, Inject } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from './interface/todo';
import { Store } from '@ngrx/store';
import { addTodo, removeTodo, loadTodo, removeLastTodo } from 'src/app/store/todo/todo.actons';
import { selectAllTodos, currentTodoStatus } from 'src/app/store/todo/todo.selectors';
import { AppState } from 'src/app/store/app.state';
import { NgModel } from '@angular/forms';
import { GlobalEventDriverService } from 'src/app/core/services/global-event-driver/global-event-driver.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  allTodos$ = this.store.select<Todo[]>(selectAllTodos);
  currentTodoStatus$ = this.store.select<string>(currentTodoStatus)
  //allTodos$ = new Observable<Todo[]>();
  task: string = '';

  enableQuickClear = false;
  constructor(protected store: Store<AppState>) {
    //  this.todoList$ = this.todoService.getTodoList();
    this.store.dispatch(loadTodo());
  }

  onAddTodo() {
    if (!this.task) return;
    //dispatch add new todo Action

    this.store.dispatch(addTodo({ task: this.task }));

    this.task = '';
    this.enableQuickClear = true;


  }

  onDeleteTodo(todo: Todo) {
    //dispatch delete todo Action
    console.log('Dispatching delete todo,', todo);
    this.store.dispatch(removeTodo({ id: todo.id }));
  }

  onEnter(event: any) {
    // console.log(event)
    switch (event.code) {
      case 'Enter':
        this.onAddTodo();
        break;
      case 'Escape':
        this.clearLast();
        break;
    }
  }

  clearLast() {
    if (this.enableQuickClear)  {
      this.store.dispatch(removeLastTodo());
      this.enableQuickClear = false;
    }
  }
}
