import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from 'src/app/core/services/todo.service';
import { MockStore, provideMockStore  } from '@ngrx/store/testing';
import { AppState } from 'src/app/store/app.state';
import { AppMaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { addTodo } from 'src/app/store/todo/todo.actons';

let store: MockStore;

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
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
       provideMockStore({})
      ]
    });
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on Add TODO when no task is entered', () => {
    component.onAddTodo();

    expect(component.enableQuickClear).toBe(false);
  });

  it('on Add TODO when no task is entered', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const newTask = 'Test task';
    const addTodoAction = addTodo({ task: newTask });

    component.task = newTask;
    expect(component.task).toEqual(newTask);
    component.onAddTodo();

    expect(dispatchSpy).toHaveBeenCalledWith(addTodoAction)
    expect(component.task).toEqual('');
    expect(component.enableQuickClear).toBe(true);
  });

});
