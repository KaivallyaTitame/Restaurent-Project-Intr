import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private staticBookings: Booking[] = [
    { customerName: 'Vikram Gavade', date: '2025-01-21', time: '20:00', guests: 4 },
    { customerName: 'Niraj Pandit', date: '2025-01-22', time: '18:30', guests: 3 }
  ];

  constructor() { }

  getAllBookings(): Observable<Booking[]> {

    return of(this.staticBookings);
  }

  createBooking(booking: Booking): Observable<Booking> {

    this.staticBookings.push(booking);
    return of(booking);
  }

  updateBooking(booking: Booking): Observable<Booking> {

    const index = this.staticBookings.findIndex(b => 
      b.customerName === booking.customerName && b.date === booking.date
    );
    if (index !== -1) {
      this.staticBookings[index] = booking;
    }
    return of(booking);
  }

  deleteBooking(customerName: string, date: string): Observable<boolean> {

    const index = this.staticBookings.findIndex(b => 
      b.customerName === customerName && b.date === date
    );
    if (index !== -1) {
      this.staticBookings.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}