import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookTableComponent } from './book-table/book-table.component';


@NgModule({
  declarations: [
    BookTableComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule
  ],
  exports : [
    BookTableComponent
  ]
})
export class BookingModule { }
