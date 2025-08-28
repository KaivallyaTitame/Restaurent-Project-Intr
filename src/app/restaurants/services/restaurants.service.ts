import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurants.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  private staticRestaurants: Restaurant[] = [
new Restaurant({ id: 1, name: 'Spice Villa', location: 'Mumbai', cuisine: 'Indian', rating: 4.5 }),
new Restaurant({ id: 2, name: 'Pasta Paradise', location: 'Pune', cuisine: 'Italian', rating: 4.2 }),
new Restaurant({ id: 3, name: 'Burger Hub', location: 'Pune', cuisine: 'Fast Food', rating: 4.0 }),
new Restaurant({ id: 4, name: 'Curry Culture', location: 'Pune', cuisine: 'North Indian', rating: 4.3 }),
new Restaurant({ id: 5, name: 'Sushi World', location: 'Pune', cuisine: 'Japanese', rating: 4.4 }),
new Restaurant({ id: 6, name: 'Tandoori Tales', location: 'Pune', cuisine: 'Mughlai', rating: 4.1 }),
new Restaurant({ id: 7, name: 'Green Garden', location: 'Pune', cuisine: 'Vegan', rating: 4.6 }),

  ];

  constructor() { }

  getAllRestaurants(): Observable<Restaurant[]> {
    return of(this.staticRestaurants);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    restaurant.id = this.staticRestaurants.length + 1;
    this.staticRestaurants.push(restaurant);
    return of(restaurant);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    const index = this.staticRestaurants.findIndex(r => r.id === restaurant.id);
    if (index !== -1) {
      this.staticRestaurants[index] = restaurant;
    }
    return of(restaurant);
  }

  deleteRestaurant(id: number): Observable<boolean> {
    const index = this.staticRestaurants.findIndex(r => r.id === id);
    if (index !== -1) {
      this.staticRestaurants.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
