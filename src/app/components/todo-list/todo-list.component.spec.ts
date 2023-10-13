import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from 'src/app/core/services/todo.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AppMaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const mockStore = jasmine.createSpyObj('Store', [
    'dispatch',
    'select'
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        CommonModule,
        AppMaterialModule
      ]
    });
    TestBed.overrideProvider(Store, { useValue: mockStore });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should get Todo List', () => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    fixture.whenStable().then(() => {
      let button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();
    })



  });

});
