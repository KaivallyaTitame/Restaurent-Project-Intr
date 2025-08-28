import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Registration } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private staticUsers: Registration[] = [
    new Registration({ name: 'Alice', email: 'alice@mail.com', password: 'secret', confirmPassword: 'secret' }),
    new Registration({ name: 'Bob', email: 'bob@mail.com', password: 'mypassword', confirmPassword: 'mypassword' })
  ];

  getAllUsers(): Observable<Registration[]> {
    return of(this.staticUsers.map(u => new Registration(u)));
  }

  createUser(user: Registration): Observable<Registration> {
    const newUser = new Registration(user);
    this.staticUsers.push(newUser);
    return of(newUser);
  }

  deleteUser(email: string): Observable<boolean> {
    const index = this.staticUsers.findIndex(u => u.email === email);
    if (index !== -1) {
      this.staticUsers.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
