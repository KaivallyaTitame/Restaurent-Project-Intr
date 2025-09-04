import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(b: Booking): Observable<Booking> {
    const payload = {
      customerName: b.customerName,
      restaurantId: b.restaurantId,
      date: b.date,
      time: b.time,
      guests: b.guests
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<Booking>(`${this.baseUrl}/booking`, payload, { headers });
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/booking/delete/${id}`,{
      headers:{
         'ngrok-skip-browser-warning': 'true'
      }
    });
  }


}
