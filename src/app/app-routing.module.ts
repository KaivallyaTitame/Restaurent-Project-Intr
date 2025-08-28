import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  {
    path: 'restaurants',
    loadChildren: () =>
      import('./restaurants/restaurants.module').then(m => m.RestaurantsModule)
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then(m => m.BookingModule)
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  { path: '**', redirectTo: '/restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
