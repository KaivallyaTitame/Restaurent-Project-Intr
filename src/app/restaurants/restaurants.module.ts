import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RestoListComponent } from './resto-list/resto-list.component';

const routes: Routes = [
  { path: '', component: RestoListComponent }
];

@NgModule({
  declarations: [RestoListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RestaurantsModule {}
