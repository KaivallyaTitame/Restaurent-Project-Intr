import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistration } from '../user-registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  //url for backend
  private apiUrl = 'https://your-backend.com/api/users/register';

  constructor(private http: HttpClient) { }

  register(user: UserRegistration): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
