import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private staticBookings: Booking[] = [
    new Booking({ customerName: 'Vikram Gavade', date: '2025-01-21', time: '20:00', guests: 4 }),
    new Booking({ customerName: 'Niraj Pandit', date: '2025-01-22', time: '18:30', guests: 3 })
  ];

  constructor() { }

  getAllBookings(): Observable<Booking[]> {
    return of(this.staticBookings.map(b => new Booking(b)));
  }

  createBooking(booking: Booking): Observable<Booking> {
    const newBooking = new Booking(booking);
    this.staticBookings.push(newBooking);
    return of(newBooking);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    const index = this.staticBookings.findIndex(b => 
      b.customerName === booking.customerName && b.date === booking.date
    );
    if (index !== -1) {
      this.staticBookings[index] = new Booking(booking);
    }
    return of(new Booking(booking));
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
