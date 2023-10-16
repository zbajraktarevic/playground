import { Component } from '@angular/core';
import { Observable, max, of } from 'rxjs';
import { GlobalEventDriverService } from 'src/app/core/services/global-event-driver/global-event-driver.service';
import { AppAndSpecification, AppSpecification } from 'src/app/core/specification/specification.interface';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  public filteredList$ = new Observable<Array<Delivery>>();

  constructor() {
    const neki = (a: number, b: number) => { return a * b }

    GlobalEventDriverService.getInstance().listen('[TODO] add todo', (actionData: any) => {
      console.log('Responding in TestComponent to ngrx action with data: ', actionData);
    });

    this.playWithSpecification();
  }


  public playWithSpecification() {


    const deliveryList: Array<Delivery> = [];

    deliveryList.push(new Delivery('Postal', this.getRandomBool(), Math.random() * 10))
    deliveryList.push(new Delivery('By Email', this.getRandomBool(), Math.random() * 10))
    deliveryList.push(new Delivery('By Airplaine', this.getRandomBool(), Math.random() * 10))

    let isActiveAndAvailable =  new AppAndSpecification(new AppIsActiveProduct(), new AppIsMaxPrice(5))

    // could use with combination of multiple
    // let multiAvailable = new AppAndSpecification(isActiveAndAvailable, new AppIsNamedAs('Postal'))

    let listFiltered = deliveryList.filter((delivery: Delivery) => {
      return isActiveAndAvailable.isSatisfiedBy(delivery);
    });


    console.log(deliveryList);
    this.filteredList$ = of(listFiltered);
  }

  private getRandomBool():boolean {
    let val = Math.random() * 1000;
    return (val > 500);
  }
}



class Delivery {
  active: boolean = false;
  name: string = '';
  price: number = 0;

  constructor(name: string, active: boolean, price:number) {
    this.name = name;
    this.active = active;
    this.price = price;
  }

}
export class AppIsActiveProduct implements AppSpecification<Delivery> {

  isSatisfiedBy(item: Delivery): boolean {
    return item.active
  }
}

export class AppIsMaxPrice implements AppSpecification<Delivery> {

  protected maxPrice: number = 0;

  constructor(maxPrice: number) {
    this.maxPrice = maxPrice;
  }

  isSatisfiedBy(item: Delivery): boolean {
    return item.price <= this.maxPrice
  }
}

export class AppIsNamedAs implements AppSpecification<Delivery> {

  protected isLike: string = '';

  constructor(isLike: string) {
    this.isLike = isLike;
  }

  isSatisfiedBy(item: Delivery): boolean {
    return item.name === this.isLike;
  }
}
