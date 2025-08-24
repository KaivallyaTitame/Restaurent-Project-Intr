import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../booking.model';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-book-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit {
  bookings: Booking[] = [];
  newBooking: Booking = {
    customerName: '',
    date: '',
    time: '',
    guests: 1
  };
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
        this.bookings = bookings;
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
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.loading = true;
      this.bookingService.createBooking(this.newBooking).subscribe({
        next: (booking) => {
          this.bookings.push(booking);
          this.resetForm();
          this.showForm = false;
          this.loading = false;
          console.log('Booking created successfully:', booking);
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
            console.log('Booking deleted successfully');
          }
        },
        error: (error) => {
          console.error('Error deleting booking:', error);
        }
      });
    }
  }

  private isFormValid(): boolean {
    return !!(this.newBooking.customerName && 
              this.newBooking.date && 
              this.newBooking.time && 
              this.newBooking.guests > 0);
  }

  private resetForm(): void {
    this.newBooking = {
      customerName: '',
      date: '',
      time: '',
      guests: 1
    };
  }
}