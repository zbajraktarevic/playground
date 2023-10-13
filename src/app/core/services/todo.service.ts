import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Todo } from 'src/app/components/todo-list/interface/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = 'https://651842cc582f58d62d35890e.mockapi.io/api/v1/';

  constructor(protected httpClient: HttpClient) { }

  public getTodoList(): Observable<any> {
    return this.httpClient.get<TodoListResponse>(this.apiUrl + '/todos', { responseType: 'json' })
      .pipe(
        map((response: TodoListResponse) => {
          console.log('Doing mapping', response)
          return response.items;
        })
      )

  }

  public deleteTodo(id: number|null) {
    return this.httpClient.delete(this.apiUrl + '/todos/' + id)
  }

  public addTodo(todo: Todo) {
    return this.httpClient.post<Todo>(this.apiUrl + '/todos', todo).pipe(
      map((todo: Todo) => {
        console.log('Creating todo', todo);
        return todo;
      })
    )
  }
}

interface TodoListResponse {
  items: Todo[];
  count: number;
}
