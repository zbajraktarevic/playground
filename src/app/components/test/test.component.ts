import { Component } from '@angular/core';
import { GlobalEventDriverService } from 'src/app/core/services/global-event-driver/global-event-driver.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {


  constructor() {
    const neki = (a: number, b: number) => { return a * b}

    GlobalEventDriverService.getInstance().listen('[TODO] add todo', (actionData:any) => {
      console.log('Responding in TestComponent:', actionData);
    });
  }
}
