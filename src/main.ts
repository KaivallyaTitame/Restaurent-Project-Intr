import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { RestoListComponent } from './app/restaurants/resto-list/resto-list.component';
import { BookTableComponent } from './app/booking/book-table/book-table.component';
import { UserRegisterComponent } from './app/registration/user-register/user-register.component';
import { provideHttpClient } from '@angular/common/http';
const routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' as const },
  { path: 'restaurants', loadComponent: () => Promise.resolve(RestoListComponent) },
  { path: 'booking', loadComponent: () => Promise.resolve(BookTableComponent) },
  { path: 'registration', loadComponent: () => Promise.resolve(UserRegisterComponent) },
  { path: '**', redirectTo: '/restaurants' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()  // <-- add this
  ]
}).catch(err => console.error(err));