import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurants.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  
  private staticRestaurants: Restaurant[] = [
{ id: 1, name: 'Shabree', cuisine: 'Authentic Maharashtrian Thali', rating: 4.6 },
{ id: 2, name: 'Durvankur Dining Hall', cuisine: 'Maharashtrian Thali', rating: 4.5 },
{ id: 3, name: 'Asha Dining Hall', cuisine: 'Traditional Maharashtrian', rating: 4.4 },
{ id: 4, name: 'Hotel Shreyas', cuisine: 'Veg Maharashtrian', rating: 4.7 },
{ id: 5, name: 'Mathura Pure Veg', cuisine: 'Maharashtrian & Satvik', rating: 4.3 }
  ];

  constructor() { }

  getAllRestaurants(): Observable<Restaurant[]> {
   
    return of(this.staticRestaurants);
  }

  getRestaurantById(id: number): Observable<Restaurant | undefined> {
  
    const restaurant = this.staticRestaurants.find(r => r.id === id);
    return of(restaurant);
  }
}