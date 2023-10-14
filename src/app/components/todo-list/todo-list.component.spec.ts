import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from 'src/app/core/services/todo.service';
import { MockStore, MockStoreConfig, provideMockStore  } from '@ngrx/store/testing';
import { AppState } from 'src/app/store/app.state';
import { AppMaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { addTodo, loadTodo, removeLastTodo, removeTodo } from 'src/app/store/todo/todo.actons';
import { Todo } from './interface/todo';
import { TodoState } from 'src/app/store/todo/todo.reducer';
import { INITIAL_STATE } from '@ngrx/store';

let todoState: TodoState = {
  status: 'pending',
  todos: [],
  error: null
}


let store: MockStore;



const initialState = {
  todos: todoState
};
describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let storeSpy: any;

  const mockStore = jasmine.createSpyObj('Store', [
    'dispatch',
    'select',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        CommonModule,
        AppMaterialModule
      ], providers: [

        provideMockStore({initialState})
      ]
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    storeSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create a component & dispatch loadTodo action', () => {
    // const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(TodoListComponent)
    component = fixture.componentInstance;
    expect(component).toBeTruthy();

    const loadTodoAction = loadTodo();
    expect(storeSpy).toHaveBeenCalledWith(loadTodoAction)
  });

  it('Should NOT enable QuickClear flag when not Task is provided', () => {
    component.task = '';
    component.onAddTodo();
    expect(component.enableQuickClear).toBe(false);
  });

  it('Should dispatch  addTodo  event and enable QuickClear and should clear task', (done:DoneFn) => {
  //  const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const newTask = 'Test task';
    const addTodoAction = addTodo({ task: newTask });

    component.task = newTask;
    expect(component.task).toEqual(newTask);
    component.onAddTodo();

    expect(storeSpy).toHaveBeenCalledWith(addTodoAction)
    expect(component.task).toEqual('');
    expect(component.enableQuickClear).toBe(true);
    setTimeout(() => {
      expect(component.enableQuickClear).toBe(false);
      done()
    }, component.timeToQuicklyDelete);
  });


  it('Should do nothing when Enter is pressed and task is not set', () => {
    const task = 'Test me';
    const event = {
      code: 'Escape'
    };

    const addTodoCall = addTodo({ task: component.task });

    component.task = task;
    expect(component.task).toEqual(task);
    console.log('Calling onEnter', component.task);

    component.onEnter(event);
    expect(storeSpy).not.toHaveBeenCalledWith(addTodoCall);
  });

  it('Should dispatch DeleteEvent', () => {
    //const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const deleteTodoAction = removeTodo({ id: 1 })
    const todoForDelete: Todo = {
      id: 1,
      task: 'test',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    component.onDeleteTodo(todoForDelete);
    expect(storeSpy).toHaveBeenCalledWith(deleteTodoAction);

  });

});
