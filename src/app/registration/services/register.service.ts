import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from '../models/registration.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.baseUrl}/user`,{
      headers:{
         'ngrok-skip-browser-warning': 'true'
      }
    });
  }

  createUser(user: Registration): Observable<Registration> {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role
    };
    return this.http.post<Registration>(`${this.baseUrl}/user/register`, payload);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/user/delete/${id}`);
  }
}
