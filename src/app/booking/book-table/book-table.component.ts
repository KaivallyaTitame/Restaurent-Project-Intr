import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit {
  bookings: Booking[] = [];
  newBooking: Booking = new Booking();  
  loading = false;
  showForm = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getAllBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings.map(b => new Booking(b)); 
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.loading = false;
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.newBooking.reset(); 
    }
  }

  onSubmit(): void {
    if (this.newBooking.isValid()) {
      this.loading = true;
      this.bookingService.createBooking(this.newBooking).subscribe({
        next: (booking) => {
          this.bookings.push(new Booking(booking));
          this.newBooking.reset();
          this.showForm = false;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          this.loading = false;
        }
      });
    }
  }

  deleteBooking(booking: Booking): void {
    if (confirm(`Are you sure you want to delete the booking for ${booking.customerName}?`)) {
      this.bookingService.deleteBooking(booking.customerName, booking.date).subscribe({
        next: (success) => {
          if (success) {
            this.bookings = this.bookings.filter(b =>
              !(b.customerName === booking.customerName && b.date === booking.date)
            );
          }
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
        }
      });
    }
  }
}
