import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../models/restaurants.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/restaurants`,{
      headers:{
         'ngrok-skip-browser-warning': 'true'
      }
    }).pipe(
      map(data => data.map(item => new Restaurant(item)))
    );
  }
}
