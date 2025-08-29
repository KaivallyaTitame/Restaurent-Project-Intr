import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurants.model';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-resto-list',
  templateUrl: './resto-list.component.html',
  styleUrls: ['./resto-list.component.css']
})
export class RestoListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  loading = true;

  constructor(
    private restaurantsService: RestaurantsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantsService.getAllRestaurants().subscribe({
      next: (restaurants: Restaurant[]) => {
        console.log("✅ Restaurants from backend:", restaurants);
        this.restaurants = restaurants;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('❌ Error loading restaurants:', error);
        this.loading = false;
      }
    });
  }

  onRestaurantSelect(restaurant: Restaurant): void {
    this.router.navigate(['/booking'], { queryParams: { id: restaurant.id } });
  }
}
