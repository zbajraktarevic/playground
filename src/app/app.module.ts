import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { StoreModule } from '@ngrx/store';
import { TodoReducer } from './store/todo/todo.reducer';
import { AppMaterialModule } from './material.module';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/todo/todo.effects';
import { TestComponent } from './components/test/test.component';
import { GlobalEventDriverService, GlobalListener } from './core/services/global-event-driver/global-event-driver.service';

//
GlobalEventDriverService.getInstance();
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TestComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    StoreModule.forRoot({ todos: TodoReducer}, {}),
    EffectsModule.forRoot([TodoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
