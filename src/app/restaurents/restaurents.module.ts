import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurentsRoutingModule } from './restaurents-routing.module';
import { RestoListComponent } from './resto-list/resto-list.component';


@NgModule({
  declarations: [
    RestoListComponent
  ],
  imports: [
    CommonModule,
    RestaurentsRoutingModule
  ],
  exports: [
     RestoListComponent
  ]
})
export class RestaurentsModule { }
