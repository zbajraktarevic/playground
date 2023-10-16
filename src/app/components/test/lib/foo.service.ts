import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class FooService {

  constructor() {
    console.log('Foo Service Instantiated!')
  }

  say(say: string) {
    alert(say);
  }
}
