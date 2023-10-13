import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
let components = [

]
@NgModule({
  declarations: [

  ],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]

})
export class AppMaterialModule { }
