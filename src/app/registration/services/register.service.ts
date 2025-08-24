import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRegistration } from '../user-registration.model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  //Curruntly not connected to backend so written static data
  //We will Remove this static data when connecting to backend
  private staticUsers: UserRegistration[] = [
    { name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { name: 'Niraj Pandit', email: 'niraj@gmail.com', password: 'user123', role: 'customer' },
    { name: 'Vikram Gavade', email: 'vikram@gmail.com', password: 'user123', role: 'customer' }
  ];

  constructor() { }

  registerUser(user: UserRegistration): Observable<UserRegistration> {

    const existingUser = this.staticUsers.find(u => u.email === user.email);
if (existingUser) {
  return throwError(() => new Error('User with this email already exists'));
}
    
    this.staticUsers.push(user);
    return of(user);
  }

  getAllUsers(): Observable<UserRegistration[]> {
  
    return of(this.staticUsers);
  }

  getUserByEmail(email: string): Observable<UserRegistration | undefined> {

    const user = this.staticUsers.find(u => u.email === email);
    return of(user);
  }

  validateLogin(email: string, password: string): Observable<UserRegistration | null> {
  
    const user = this.staticUsers.find(u => u.email === email && u.password === password);
    return of(user || null);
  }
}