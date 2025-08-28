import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Restaurant } from '../models/restaurants.model';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-resto-list',
  standalone: false,
  templateUrl: './resto-list.component.html',
  styleUrls: ['./resto-list.component.css'],
  providers: [RestaurantsService] 
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
      next: (restaurants) => {
        this.restaurants = restaurants;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading restaurants:', error);
        this.loading = false;
      }
    });
  }

  onRestaurantSelect(restaurant: Restaurant): void {
    console.log('Selected restaurant:', restaurant);

    
    this.router.navigate(['/booking'], { queryParams: { id: restaurant.id } });
  }
}
