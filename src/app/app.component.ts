import { Component } from '@angular/core';
import { GlobalEventDriverService, GlobalListener } from './core/services/global-event-driver/global-event-driver.service';
import { Todo } from './components/todo-list/interface/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';


  constructor() {

    let sub = GlobalEventDriverService.getInstance().listen('[TODO] add todo', (actionData: Todo) => {
      console.log('Responding in AppComponent:', actionData);
      actionData.task = 'JEBA'
      sub.unsubscribe();
    });
  }
}

