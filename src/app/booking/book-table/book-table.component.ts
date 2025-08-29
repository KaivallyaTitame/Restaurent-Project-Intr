import { Component } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent {
  bookings: Booking[] = [];
  newBooking: Booking = new Booking();
  loading = false;
  showForm = false;

  constructor(private bookingService: BookingService) {}

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
          if (booking) this.bookings.push(new Booking(booking));
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
    if (!booking.id) {
      console.error('Booking ID missing, cannot delete');
      return;
    }
    if (confirm(`Are you sure you want to delete the booking for ${booking.customerName}?`)) {
      this.bookingService.deleteBooking(booking.id).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(b => b.id !== booking.id);
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
        }
      });
    }
  }
}
