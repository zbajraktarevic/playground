
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

  task: string = '';

  timeToQuicklyDelete = 3000;
  enableQuickClear = false;

  constructor(protected store: Store<AppState>) {
    //  this.todoList$ = this.todoService.getTodoList();
    this.store.dispatch(loadTodo());
  }

  onAddTodo() {
    if (!this.task) return;
    console.log('disaptching event onAddtodo', this.task)
    //dispatch add new todo Action
    this.store.dispatch(addTodo({ task: this.task }));

    // Clear task and enable quick claer
    this.task = '';
    this.enableQuickClear = true;
    setTimeout(() => {
      this.enableQuickClear = false
    }, this.timeToQuicklyDelete)

  }

  onDeleteTodo(todo: Todo) {
    //dispatch delete todo Action
    console.log('Dispatching delete todo,', todo);
    this.store.dispatch(removeTodo({ id: todo.id }));
  }

  onEnter(event: { [name: string]: any, code: string }) {
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
