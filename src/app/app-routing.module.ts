import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestoListComponent } from './restaurants/resto-list/resto-list.component';
import { UserRegisterComponent } from './registration/user-register/user-register.component';
import { BookTableComponent } from './booking/book-table/book-table.component';
export const routes: Routes = [
  { path: '', redirectTo: '/restaurents', pathMatch: 'full' },
  { path: 'registration', component: UserRegisterComponent }, // ✅ standalone
  { path: 'restaurents', component: RestoListComponent },     // ✅ standalone
  { path: 'booking', component: BookTableComponent },           // ✅ standalone
  { path: '**', redirectTo: '/restaurents' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
